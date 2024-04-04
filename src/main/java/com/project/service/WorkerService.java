package com.project.service;

import java.time.Year;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.domain.Worker;
import com.project.domain.WorkerLog;
import com.project.domain.dto.WorkerInitDTO;
import com.project.domain.dto.WorkerInitDTO.WorkerLogDTO;
import com.project.persistence.WorkerCurRepository;
import com.project.persistence.WorkerLogRepository;
import com.project.persistence.WorkerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkerService {
	private final WorkerRepository workerRepo;
	private final WorkerLogRepository workerLogRepo;
	private final WorkerCurRepository workerCurRepo;

	public ResponseEntity<?> findWorker() {
		try {
			System.out.println("> findWorker success");
			Iterator<Worker> it = workerRepo.findAll().iterator();
			List<WorkerInitDTO> initList = new ArrayList<>();
			while (it.hasNext()) {
				Worker w = it.next();
				int id = w.getId();
				List<WorkerLog> wList = workerLogRepo.findInitData(id);
				if (wList.isEmpty())
					return ResponseEntity.noContent().build();

				// 로그 register date 순서로 sorting
				Comparator<WorkerLog> compareByRegidate = new Comparator<WorkerLog>() {
					@Override
					public int compare(WorkerLog o1, WorkerLog o2) {
						return o1.getRegisterDate().compareTo(o2.getRegisterDate());
					}
				};
				Collections.sort(wList, compareByRegidate);

				Iterator<WorkerLog> list = wList.iterator();
				List<WorkerLogDTO> dtoList = new ArrayList<>();
				while (list.hasNext()) {
					WorkerLog wl = list.next();
					dtoList.add(WorkerLogDTO.builder()
							.latitude(wl.getLatitude()).longitude(wl.getLongitude())
							.heartbeat(wl.getHeartbeat()).temperature(wl.getTemperature())
							.outTemp(wl.getOutTemp()).regidate(wl.getRegisterDate())
							.build());
				}
				w.setYear(Year.now().getValue() - w.getYear()); // 생년 --> 나이
				initList.add(WorkerInitDTO.builder()
						.id(w.getId())
						.workerName(w.getWorkerName())
						.department(w.getDepartment())
						.year(w.getYear())
						.list(dtoList)
						.status(workerCurRepo.findById(id).get().getStatus())
						.role(w.getRole())
						.build());
			}
			return ResponseEntity.ok().body(initList);
		} catch (Exception e) {
			System.out.println("Exception at WorkerService.findWorker: " + e.getMessage());
			return ResponseEntity.badRequest().body("!!! findWorker Exception: " + e.getMessage());
		}
	}

	public ResponseEntity<?> findWorkerById(int id) {
		try {
			System.out.println("> findWorkerById success");
			return ResponseEntity.ok().body(workerRepo.findById(id).get());
		} catch (Exception e) {
			System.out.println("Exception at WorkerService.findWorkerById: " + e.getMessage());
			return ResponseEntity.badRequest().body("!!! findWorkerById Exception: " + e.getMessage());
		}
	}
}
