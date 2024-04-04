package com.project;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.domain.Admin;
import com.project.domain.Worker;
import com.project.persistence.AdminRepository;
import com.project.persistence.WorkerRepository;

@SpringBootTest
public class DataSetup {

	@Autowired
	AdminRepository adminRepo;

	@Autowired
	WorkerRepository workerRepo;

	PasswordEncoder encoder = new BCryptPasswordEncoder();

	@Test
	public void adm() {
		adminRepo.save(Admin.builder().id("admin").password(encoder.encode("1234")).build());
		adminRepo.save(Admin.builder().id("admin1").password(encoder.encode("1234")).build());
		adminRepo.save(Admin.builder().id("admin2").password(encoder.encode("1234")).build());
	}

//	@Test
	public void test() {
		Worker worker = workerRepo.findById(1).get();
		System.out.println(worker);
	}
}
