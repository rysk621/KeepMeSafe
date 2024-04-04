package com.project.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name="preexdata")
public class PreexLog {

	@Id
	@Column(name="No")
	private Integer no;
	@Column(name="UserCode")
	private Integer usercode;
	@Column(name="WorkDate")
	private Date workdate;
	@Column(name="RegisterDate")
	private Date regidate;
	@Column(name="Heartbeat")
	private Integer heartbeat;
	@Column(name="Temperature")
	private Double temp;
	@Column(name="OutsideTemperature")
	private Double outTemp;
	@Column(name="Latitude")
	private Double lat;
	@Column(name="Longitude")
	private Double lon;
}
