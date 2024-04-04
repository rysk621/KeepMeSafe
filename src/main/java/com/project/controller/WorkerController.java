package com.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.service.WorkerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WorkerController {
	private final WorkerService workerService;

	// 전체 작업자 정보 리스트 반환
	@GetMapping("/worker")
	public ResponseEntity<?> findWorker() {
		return ResponseEntity.ok(workerService.findWorker());
	}

	// 해당 id 작업자의 정보 반환
	@GetMapping("/worker/{id}")
	public ResponseEntity<?> findWorkerById(@PathVariable int id) {
		return ResponseEntity.ok(workerService.findWorkerById(id)).getBody();
	}
}
