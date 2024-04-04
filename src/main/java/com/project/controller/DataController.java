package com.project.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import com.project.domain.dto.ReportDTO;
import com.project.service.DataService;
import com.project.util.WorkerEmul;

import lombok.RequiredArgsConstructor;

@RestController
@EnableAsync
@RequiredArgsConstructor
public class DataController {
	private final WorkerEmul wEmul;
	private final DataService dataServ;

	// 에뮬레이터에서 생성되는 정보 받아옴 (5초 주기)
	@Async
//	@Scheduled(initialDelay = 0, fixedRate = 5000)
	public void scheduledDataProcess() throws IOException {
		List<ReportDTO> wList = wEmul.get();
		if (wList == null)
			return;

		dataServ.receiveData(wList);
	}

	// restTemplate 이용해 DA에 data post/get 하는 method (초기 5초 지연, 10초 주기)
	@Async
//	@Scheduled(initialDelay=5000, fixedRate = 10000)
	public void dataPostProcess() {
		// preEx log 전송
//		dataServ.postData();
		// emulated log 전송
		dataServ.postEmulData();
	}

	// WS 이용, data push to FE (10초 주기)
	@Async
	@Scheduled(initialDelay = 1000, fixedRate = 10000)
	public void dataPushProcess() {
		dataServ.pushData();
	}
}
