package com.example.api.service;

import com.example.api.entity.Room;
import org.springframework.stereotype.Service;

public interface RoomService {
    Room save(String name, Long capacity);
}
