package com.example.api.repository;

import com.example.api.entity.Schedule;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends PagingAndSortingRepository<Schedule, Long>, JpaSpecificationExecutor {
    List<Schedule> findSchedulesByCourse_IdAndTermId(Long courseId, Long termId);

    List<Schedule> findSchedulesByTeacherIdAndTermId(Long TeacherId, Long termId);

    List<Schedule> findSchedulesByTerm_Id(Long termId);
}
