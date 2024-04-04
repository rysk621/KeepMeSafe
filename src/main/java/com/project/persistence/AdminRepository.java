package com.project.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.domain.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

}
