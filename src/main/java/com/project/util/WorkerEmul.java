package com.project.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Component;

import com.project.domain.Worker;
import com.project.domain.dto.ReportDTO;
import com.project.domain.dto.WorkerDTO;
import com.project.persistence.WorkerRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class WorkerEmul {

	static int idx = 0;
	static int MAXIDX = 100;
	static List<WorkerDTO> data = new ArrayList<>();
	private final Random rd = new Random();
	private final WorkerRepository workerRepo;

	private double[][] latArray = {
			{ 35.235556, 35.2354032, 35.2352504, 35.2350976, 35.2349448, 35.234792, 35.2346392, 35.2344864, 35.2343336,
					35.2341808, 35.234028, 35.2338752, 35.2337224, 35.2335696, 35.2334168, 35.233264, 35.2331112,
					35.2329584, 35.2328056, 35.2325 },
			{ 35.233889, 35.23393065, 35.2339723, 35.23401395, 35.2340556, 35.23409725, 35.2341389, 35.23418055,
					35.2342222, 35.23426385, 35.2343055, 35.23434715, 35.2343888, 35.23443045, 35.2344721, 35.23451375,
					35.2345554, 35.23459705, 35.2346387, 35.233056 } };
	private double[][] lonArray = {
			{ 129.076667, 129.0766393, 129.0766115, 129.0765838, 129.076556, 129.0765283, 129.0765005, 129.0764728,
					129.076445, 129.0764173, 129.0763895, 129.0763618, 129.076334, 129.0763063, 129.0762785,
					129.0762508, 129.076223, 129.0761953, 129.0761675, 129.076112 },
			{ 129.077778, 129.0775697, 129.0773613, 129.077153, 129.0769446, 129.0767363, 129.0765279, 129.0763196,
					129.0761112, 129.0759029, 129.0756945, 129.0754862, 129.0752778, 129.0750695, 129.0748611,
					129.0746528, 129.0744444, 129.0742361, 129.0740277, 129.081945 } };

	private double[] latArr1 = { 35.23555555555556, 35.235, 35.234722222222224, 35.23527777777778, 35.235 };
	private double[] lonArr1 = { 129.07638888888889, 129.07694444444445, 129.07666666666665, 129.07694444444445,
			129.07666666666665 };

	// worker_log에 insert 하는 메서드,
	// worker_log에서 트리거 --> worker_cur 테이블에 바이탈 업데이트(status 정보는 DA에서 받아서 저장해야함)
//	public WorkerEmul() {
//		for (int ind = 1; ind <= 100; ind++) {
//			double temp = 30.0;
//			int hr = rd.nextInt(82, 85);
//			List<Worker> list = workerRepo.findAll();
//			for(int i = 0; i < 10 ; i++) {
//				int id = list.get(i).getId();
//				data.add(WorkerDTO.builder().usercode(id).latitude(latArray[i]).longitude(lonArray[i]).heartbeat(hr).temperature(temp)
//					.outTemp(28.0).build());
//			}
//		}
//	}

	@PostConstruct
	public void preWorkerEmul() {
		List<Worker> list = workerRepo.findAll();
		for (int i = 0; i < 20; i++) {
			Worker w = list.get(i);
			int id = w.getId();
			double temp = 30.0;
			int idx = rd.nextInt(0, 10);
			boolean asc = rd.nextBoolean();
			WorkerDTO dto = WorkerDTO.builder().usercode(id).build();
			for (int j = 0; j < MAXIDX; j++) {
				int hr = rd.nextInt(82, 85);
				ReportDTO t = null;
				if (i < 10) {
					if ((id == 7 || id == 37) && (j % 10 == 0))
						hr = rd.nextInt(140, 160);
					t = ReportDTO.builder().usercode(id).latitude(latArray[0][idx]).longitude(lonArray[0][idx]).heartbeat(hr)
							.temperature(temp).outTemp(28.0).build();
				} else if (i < 15) {
					t = ReportDTO.builder().usercode(id).latitude(latArray[1][idx]).longitude(lonArray[1][idx]).heartbeat(hr)
							.temperature(temp).outTemp(28.0).build();
				} else {
					double lat1 = rd.nextDouble(0, 0.4) - 0.2;
					double lon1 = rd.nextDouble(0, 0.4) - 0.2;
					t = ReportDTO.builder().usercode(id).latitude(latArr1[i - 15] + lat1)
							.longitude(lonArr1[i - 15] + lon1).heartbeat(hr).temperature(temp).outTemp(28.0).build();
				}
				dto.getList().add(t);
				if (asc == true) {
					idx++;
					if (idx >= 19) {
						idx = 19;
						asc = false;
					}
				} else {
					idx--;
					if (idx <= 0) {
						idx = 0;
						asc = true;
					}
				}
			}
			data.add(dto);
		}
	}

	public List<ReportDTO> get() {
		List<ReportDTO> list = new ArrayList<>();
		for (int i = 0; i < data.size(); i++) {
			WorkerDTO d = data.get(i);
			ReportDTO r = d.getList().get(idx);
			r.setRegidate(new Date());
			list.add(r);
		}
		if (++idx >= MAXIDX) {
			idx = 0;
		}
//		for(ReportDTO dto : list) {
//			System.out.println(dto);
//		}
		return list;
	}
}
