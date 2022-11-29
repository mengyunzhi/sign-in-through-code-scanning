package com.example.api.service;

import com.example.api.entity.Dispatch;
import com.example.api.repository.DispatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DispatchServiceImpl implements DispatchService {

    DispatchRepository dispatchRepository;

    @Autowired
    DispatchServiceImpl(DispatchRepository dispatchRepository) {
        this.dispatchRepository = dispatchRepository;
    }

    @Override
    public List<Dispatch> getAll() {
        return (List<Dispatch>) this.dispatchRepository.findAll();
    }
}
