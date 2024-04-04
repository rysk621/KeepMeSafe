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
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Worker")
public class Worker {
	@Id
	@Column(name="worker_id")
	private Integer id;
	@Column(name="worker_name")
	private String workerName;
	@Enumerated(EnumType.STRING)
	private Department department;
	private Integer year;
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private Role role = Role.WORKER;
	@Column(name="RegisterDate")
	private Date regidate;
}
