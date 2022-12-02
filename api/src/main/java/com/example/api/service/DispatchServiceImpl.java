package com.example.api.service;

import com.example.api.entity.Dispatch;
import com.example.api.entity.Schedule;
import com.example.api.repository.DispatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Service
public class DispatchServiceImpl implements DispatchService {

    DispatchRepository dispatchRepository;
    ScheduleService scheduleService;

    @Autowired
    DispatchServiceImpl(DispatchRepository dispatchRepository,
                        @Lazy ScheduleService scheduleService) {
        this.dispatchRepository = dispatchRepository;
        this.scheduleService = scheduleService;
    }

    @Override
    public List<Dispatch> getAll() {
        return (List<Dispatch>) this.dispatchRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        Assert.notNull(id, "id不能为null");
        this.dispatchRepository.deleteById(id);
    }

    @Override
    public List<Dispatch> getDispatchesInTerm(Long termId) {
        List<Schedule> schedules = this.scheduleService.getAllByTermId(termId);
        List<Dispatch> dispatches = new ArrayList<>();
        schedules.forEach(schedule -> {
            schedule.getDispatches().forEach(dispatch -> {
                dispatches.add(dispatch);
            });
        });
        return dispatches;
    }
}
