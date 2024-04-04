package com.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AiProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiProjectApplication.class, args);
	}

}
