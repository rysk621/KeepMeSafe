package com.project.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.domain.WorkerCur;

@Repository
public interface WorkerCurRepository extends JpaRepository<WorkerCur, Integer> {

}
