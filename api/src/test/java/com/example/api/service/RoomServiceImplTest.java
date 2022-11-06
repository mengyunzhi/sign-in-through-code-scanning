package com.example.api.service;

import com.example.api.entity.Room;
import com.example.api.repository.RoomRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;


class RoomServiceImplTest {

    private RoomService roomService;
    private RoomRepository roomRepository;

    public RoomServiceImplTest() {
        this.roomRepository = Mockito.mock(RoomRepository.class);
        this.roomService = new RoomServiceImpl(this.roomRepository);
    }

    @Test
    void save() {
        // 准备参数
        String name = RandomString.make(6);
        Long capacity = new Random().nextLong();
        // 调用方法
        this.roomService.save(name, capacity);
        // 断言
        ArgumentCaptor<Room> roomArgumentCaptor = ArgumentCaptor.forClass(Room.class);
        Mockito.verify(this.roomRepository).save(roomArgumentCaptor.capture());
        Assertions.assertEquals(name, roomArgumentCaptor.getValue().getName());
        Assertions.assertEquals(capacity, roomArgumentCaptor.getValue().getCapacity());
    }
}