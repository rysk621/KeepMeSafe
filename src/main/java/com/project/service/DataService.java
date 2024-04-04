package com.project.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.config.MyWebSocketConfig;
import com.project.domain.PreexLog;
import com.project.domain.Worker;
import com.project.domain.WorkerCur;
import com.project.domain.WorkerLog;
import com.project.domain.dto.ReportDTO;
import com.project.persistence.PreexLogRepository;
import com.project.persistence.WorkerCurRepository;
import com.project.persistence.WorkerLogRepository;
import com.project.persistence.WorkerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataService {
	// offset number
	private int num = 10;

	private final WorkerRepository workerRepo;
	private final WorkerLogRepository workerLogRepo;
	private final WorkerCurRepository workerCurRepo;
	private final PreexLogRepository preRepo;
	private final RestTemplate restTemp;
	private final ObjectMapper om = new ObjectMapper();

	private final String postLog = "http://10.125.121.170:5000/postLog/";
	@SuppressWarnings("unused")
	private final String postLogUser = "http://10.125.121.155:5000/postLog/"; // 주소 변경

	// 에뮬레이터에서 생성된 정보 전달받아 WorkerLog table에 저장
	public void receiveData(List<ReportDTO> dtoList) {
		List<WorkerLog> logList = new ArrayList<>();
		for (ReportDTO dto : dtoList) {
			logList.add(WorkerLog.builder().usercode(dto.getUsercode()).latitude(dto.getLatitude())
					.longitude(dto.getLongitude()).heartbeat(dto.getHeartbeat()).temperature(dto.getTemperature())
					.outTemp(dto.getOutTemp()).build());
		}
		workerLogRepo.saveAllAndFlush(logList);
		System.out.println("> data received");
	}

	// restTemp --> DA에 로그(pre-existing log) 보냄 --> 분석된 status 반환 받음
	public void postData() {
		List<Worker> list = workerRepo.findAll();
		for(Worker w : list) {
			int userCode = w.getId();
			try {
				System.out.println("> usercode " + userCode + " posted, data");
				List<PreexLog> pList = preRepo.findData(userCode, num);
				WorkerCur wC = workerCurRepo.findById(userCode).get();

				// header 정보에 MediaType = JSON 설정 후 전달
				final HttpHeaders header = new HttpHeaders();
				header.setContentType(MediaType.APPLICATION_JSON);
				final HttpEntity<?> entity = new HttpEntity<>(pList, header);

				// exchange method 이용, method 설정(get/post/put/delete/etc) --> WorkerCur에 return
				// 정보 저장
				WorkerCur posted = restTemp.exchange(postLog + userCode, HttpMethod.POST, entity, WorkerCur.class)
						.getBody();

				// wC 객체에 posted 객체에서 받아온 status 저장
				wC.setStatus(posted.getStatus());

				// repository에 저장, 종료
				workerCurRepo.saveAndFlush(wC);
				System.out.println(
						">>> usercode " + userCode + " state: " + posted.getStatus().toString() + ", DA success");
				if(userCode == 96) num += 10;
			} catch (Exception e) {
				System.out.println("!!! " + userCode + " postData Exception : " + e.getMessage() + "\n");
			}
		}
	}

	// restTemp --> DA에 로그(emulated log) 보냄 --> 분석된 status 반환 받음
	public void postEmulData() {
		List<Worker> list = workerRepo.findAll();
		for(Worker w : list) {
			int userCode = w.getId();
			try {
				System.out.println("> usercode " + userCode + " posted, data");
				List<WorkerLog> pList = workerLogRepo.findByUserCode(userCode, num);
				WorkerCur wC = workerCurRepo.findById(userCode).get();

				// header 정보에 MediaType = JSON 설정 후 전달
				final HttpHeaders header = new HttpHeaders();
				header.setContentType(MediaType.APPLICATION_JSON);
				final HttpEntity<?> entity = new HttpEntity<>(pList, header);

				// exchange method 이용, method 설정(get/post/put/delete/etc) --> WorkerCur에 return
				// 정보 저장
				WorkerCur posted = restTemp.exchange(postLog + userCode, HttpMethod.POST, entity, WorkerCur.class)
						.getBody();

				// wC 객체에 posted 객체에서 받아온 status 저장
				wC.setStatus(posted.getStatus());
				wC.setRegisterDate(new Date());

				// repository에 저장, 종료
				workerCurRepo.saveAndFlush(wC);
				System.out.println(
						">>> usercode " + userCode + " state: " + posted.getStatus().toString() + ", DA success");
				if(userCode == 96) num += 10;
			} catch (Exception e) {
				System.out.println("!!! " + userCode + " postData Exception : " + e.getMessage() + "\n");
			}
		}
	}

	// WS 이용, push data to FE
	public void pushData() {
		List<WorkerCur> wList = workerCurRepo.findAll();
		System.out.println("===push to FE"); // 콘솔에서 메서드 실행 확인용
		if (MyWebSocketConfig.clients.size() == 0) { // 연결된 클라이언트가 없으면 그냥 리턴
			System.out.println("=====no clients(접속 없음)"); // 콘솔 확인
			return;
		}

		try {
			String msg = om.writeValueAsString(wList);
			System.out.println("=w(pushed to front)"); // 콘솔 확인
			TextMessage message = new TextMessage(msg.getBytes());

			for (WebSocketSession sess : MyWebSocketConfig.clients) {
				sess.sendMessage(message);
			}
		} catch (IOException e) {
			System.out.println("!!! pushData 메서드: IOException");
		} catch (Exception e) {
			System.out.println("!!! pushData 메서드 Exception : " + e.getMessage() + "\n");
		}
	}
}
