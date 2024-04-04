package com.project.domain.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.project.domain.Department;
import com.project.domain.Role;
import com.project.domain.WorkerStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class WorkerInitDTO {
	private Integer id;
	private String workerName;
	private Department department;
	private Integer year;
	private Date regidate;
	@Builder.Default
	private List<WorkerLogDTO> list = new ArrayList<>();
	private WorkerStatus status;
	@Builder.Default
	private Role role = Role.WORKER;

	@Builder
	@Getter
	@Setter
	@ToString
	public static class WorkerLogDTO{
		private Double latitude;
		private Double longitude;
		private Integer heartbeat;
		private Double temperature;
		private Double outTemp;
		private Date regidate;
	}
}