package com.project.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.domain.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer> {
}
