package com.example.api.repository.specs;

import com.example.api.entity.Room;
import com.example.api.repository.RoomRepository;
import org.junit.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class RoomSpecsTest {

    @Autowired
    private RoomRepository roomRepository;

    private int nameNumsize;
    private int capacityNumsize;

    @BeforeEach
    public void setNumsize() {
        // 获得 符合条件的 room数量
        this.nameNumsize = this.roomRepository.findAll(RoomSpecs.containName("testname")).size();
        this.capacityNumsize = this.roomRepository.findAll(RoomSpecs.containCapacity("testname")).size();
        // 添加room
        Room room = new Room();
        room.setName("testName");
        room.setCapacity(456L);
        this.roomRepository.save(room);
    }

    @Test
    void containName() {
        List rooms = this.roomRepository.findAll(RoomSpecs.containName("testNam"));
        Assertions.assertEquals(this.nameNumsize + 1, rooms.size());

        List rooms1 = this.roomRepository.findAll(RoomSpecs.containName("estNam"));
        Assertions.assertEquals(this.nameNumsize + 1, rooms1.size());

        List rooms2 = this.roomRepository.findAll(RoomSpecs.containName("estName"));
        Assertions.assertEquals(this.nameNumsize + 1, rooms2.size());

        List rooms3 = this.roomRepository.findAll(RoomSpecs.containName("testNamee"));
        Assertions.assertEquals(0, rooms3.size());
    }

    @Test
    void containCapacity() {
        List rooms = this.roomRepository.findAll(RoomSpecs.containCapacity("5"));
        Assertions.assertEquals(this.capacityNumsize + 1, rooms.size());

        List rooms1 = this.roomRepository.findAll(RoomSpecs.containCapacity("56"));
        Assertions.assertEquals(this.capacityNumsize + 1, rooms1.size());

        List rooms2 = this.roomRepository.findAll(RoomSpecs.containCapacity("45"));
        Assertions.assertEquals(this.capacityNumsize + 1, rooms2.size());

        List rooms3 = this.roomRepository.findAll(RoomSpecs.containCapacity("4567"));
        Assertions.assertEquals(0, rooms3.size());
    }
}