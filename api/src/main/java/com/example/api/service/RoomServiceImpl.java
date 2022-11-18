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

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    private RoomRepository roomRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room save(@NotNull String name, @NotNull Long capacity) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(capacity, "capacity不能为null");
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

    @Override
    public void deleteById(@NotNull Long id) {
        Assert.notNull(id, "id不能为null");
        this.roomRepository.deleteById(id);
    }

    @Override
    public Room getById(Long id) {
        Assert.notNull(id, "id不能为null");
        return this.roomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("找不到相关教室"));
    }

    @Override
    public Room updateFields(Room newRoom, Room oldRoom) {
        Assert.notNull(newRoom, "新教室不能null");
        Assert.notNull(oldRoom, "旧教室不能null");
        oldRoom.setCapacity(newRoom.getCapacity());
        oldRoom.setName(newRoom.getName());
        return this.roomRepository.save(oldRoom);
    }

    @Override
    public String roomNameUnique(Long roomId, String name) {
        List<Room> rooms = this.roomRepository.findRoomsByName(name);
        for (Room room:
             rooms) {
            // 如果name已存在并且与roomId不相等
            if (room.getName().equals(name) && !room.getId().equals(roomId)) {
                return "教室名称已存在";
            }
        }
        return null;
    }


}
