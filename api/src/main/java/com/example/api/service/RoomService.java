package com.example.api.service;

import com.example.api.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface RoomService {
    Room save(String name, Long capacity);

    Page findAll(String searchName, String searchCapacity, Pageable pageable);
}
