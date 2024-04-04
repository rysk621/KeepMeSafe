package com.project.domain.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class WorkerDTO {
	private Integer usercode;
	@Builder.Default
	private List<ReportDTO> list = new ArrayList<>();
}
