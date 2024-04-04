package com.project.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "worker_cur")
public class WorkerCur {

	@Id
	@Column(name = "UserCode")
	private Integer usercode;
	private Double latitude;
	private Double longitude;
	@Column(name = "Heartbeat")
	private Integer heartbeat;
	@Column(name = "Temperature")
	private Double temperature;
	@Column(name = "OutsideTemperature")
	private Double outTemp;
	@Column(name="RegisterDate")
	@Builder.Default
	private Date registerDate = new Date();
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private WorkerStatus status = WorkerStatus.SAFE;
}
