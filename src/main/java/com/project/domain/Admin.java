package com.project.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
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
public class Admin {

	@Id
	@Column(name="admin_id")
	private String id;
	private String password;
	@Builder.Default
	@Column(name="register_date")
	private Date registerDate = new Date();
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private Role role = Role.ADMIN;
}
