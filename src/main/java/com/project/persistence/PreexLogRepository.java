package com.project.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.domain.PreexLog;

@Repository
public interface PreexLogRepository extends JpaRepository<PreexLog, Integer> {
	List<PreexLog> findByUsercode(int usercode);

	// userCode 전달받아서 각 userCode 최신순 10개 로그 조회
	@Query(value="select * from preexdata as p"
			+ " where p.usercode = ?1"
			+ " order by p.registerdate desc limit 10 offset ?2 ;", nativeQuery=true)
	List<PreexLog> findData(int usercode, int idx);

	// userCode 전달받아서 각 userCode 최신순 10개 로그 조회, 날짜 예시) date('2023-11-14')
//	@Query(value="select * from preexdata as p"
//			+ " where p.usercode = :usercode"
//			+ " and date(p.registerdate)=date(':date')"
//			+ " order by p.registerdate desc limit 10;", nativeQuery=true)
//	List<PreexLog> findDataByDate(@Param("usercode") int usercode, @Param("date") Date date);
}
