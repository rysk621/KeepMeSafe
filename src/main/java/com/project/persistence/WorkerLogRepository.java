package com.project.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.domain.WorkerLog;

@Repository
public interface WorkerLogRepository extends JpaRepository<WorkerLog, Integer> {

	// userCode 전달받기, 오늘자 로그 최신순으로 10개 불러오기
	@Query(value="select * from worker_log as w"
			+ " where w.usercode=?"
			+ " and date(w.registerdate)=curdate()"
			+ " order by w.RegisterDate desc limit 0, 10", nativeQuery=true)
	List<WorkerLog> findLoguser(int usercode);

	// userCode별 log 5개씩 조회하기
	@Query(value="select * from worker_log as w"
			+ " where w.usercode = ?"
//			+ " and date(w.registerdate)=curdate() - interval 1 day"
			+ " group by w.usercode, w.heartbeat, w.seq"
			+ " order by w.registerdate desc limit 5", nativeQuery=true)
	List<WorkerLog> findInitData(Integer userCode);

	// userCode별 log 10개씩 조회하기
	@Query(value="select * from worker_log as w"
			+ " where w.usercode = ?1"
//			+ " and date(w.registerdate)=curdate() - interval 1 day"
			+ " group by w.usercode, w.heartbeat, w.seq"
			+ " order by w.registerdate desc limit 10 offset ?2 ", nativeQuery=true)
	List<WorkerLog> findByUserCode(int userCode, int num);
}
