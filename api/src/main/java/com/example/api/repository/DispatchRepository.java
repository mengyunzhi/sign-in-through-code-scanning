package com.example.api.repository;

import com.example.api.entity.Dispatch;
import com.example.api.entity.Schedule;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DispatchRepository extends PagingAndSortingRepository<Dispatch, Long>, JpaSpecificationExecutor {

    List<Dispatch> findDispatchesByScheduleId(Long scheduleId);

    @Transactional
    void deleteDispatchesByScheduleId(Long scheduleId);
}
