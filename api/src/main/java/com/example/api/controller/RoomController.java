package com.example.api.controller;

import com.example.api.entity.Room;
import com.example.api.repository.RoomRepository;
import com.example.api.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.roomService.deleteById(id);
    }

    @GetMapping("page")
    public Page page(@RequestParam(required = false) String searchName,
                      @RequestParam(required = false) String searchCapacity,
                      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.roomService.findAll(searchName, searchCapacity, pageable);
    }

    @PostMapping("update/{id}")
    public Room update(@PathVariable Long id, @RequestBody Room newRoom) {
        Room oldRoom = this.roomService.getById(id);
        return this.roomService.updateFields(newRoom, oldRoom);
    }

    @GetMapping("getById/{id}")
    public Room getById(@PathVariable Long id) {
        return this.roomService.getById(id);
    }
}
