package com.example.api.service;

import com.example.api.entity.Room;
import com.example.api.repository.RoomRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

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

    @Override
    public Page findAll(String searchName, String searchCapacity, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        return this.roomRepository.findAll(searchName, searchCapacity, pageable);
    }
}
