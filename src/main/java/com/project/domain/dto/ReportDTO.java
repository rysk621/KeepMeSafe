package com.project.domain.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class ReportDTO{
	private Integer usercode;
	private Double latitude;
	private Double longitude;
	private Integer heartbeat;
	private Double temperature;
	private Double outTemp;
	@Builder.Default
	private Date regidate = new Date();
}