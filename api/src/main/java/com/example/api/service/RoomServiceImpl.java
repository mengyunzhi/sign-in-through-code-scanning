package com.example.api.service;

import com.example.api.entity.Room;
import com.example.api.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements RoomService {

    private RoomRepository roomRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room save(String name, Long capacity) {
        Room room = new Room();
        room.setName(name);
        room.setCapacity(capacity);
        return this.roomRepository.save(room);
    }
}
