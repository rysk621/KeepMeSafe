package com.project.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "worker_log")
public class WorkerLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "seq")
	private Integer id;
	@Column(name="UserCode")
	private Integer usercode;
	@Column(name = "Heartbeat")
	private Integer heartbeat;
	@Column(name = "Temperature")
	private Double temperature;
	@Column(name = "OutsideTemperature")
	private Double outTemp;
	private Double latitude;
	private Double longitude;
	@Column(name="RegisterDate")
	@Builder.Default
	private Date registerDate = new Date();
}
