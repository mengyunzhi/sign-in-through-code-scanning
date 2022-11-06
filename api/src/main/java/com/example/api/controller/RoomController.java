package com.example.api.controller;

import com.example.api.entity.Room;
import com.example.api.repository.RoomRepository;
import com.example.api.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("room")
public class RoomController {
    private RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    /**
     * 添加教室
     */
    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Room save(@RequestBody Room room) {
        return this.roomService.save(room.getName(), room.getCapacity());
    }

}
