package com.example.api.repository;

import com.example.api.entity.Schedule;
import com.example.api.entity.Term;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ScheduleRepository extends PagingAndSortingRepository<Schedule, Long>, JpaSpecificationExecutor {
    List<Schedule> findSchedulesByTerm_Id(Long id);

    List<Schedule> findSchedulesByCourse_IdAndTermId(Long courseId, Long termId);

    List<Schedule> findSchedulesByTeacherIdAndTermId(Long TeacherId, Long termId);

}
