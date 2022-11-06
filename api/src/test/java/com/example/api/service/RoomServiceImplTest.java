package com.example.api.service;

import com.example.api.entity.Room;
import com.example.api.repository.RoomRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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

    @Test
    void findAll() {
        // 准备参数
        String searchName = RandomString.make(6);
        String searchCapacity = RandomString.make(6);
        Pageable pageable = PageRequest.of(0, 2);
        this.roomService.findAll(searchName, searchCapacity, pageable);
        // 断言
        ArgumentCaptor<String> stringArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> stringArgumentCaptor1 = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.roomRepository).findAll(stringArgumentCaptor.capture(), stringArgumentCaptor1.capture(), pageableArgumentCaptor.capture());
        Assertions.assertEquals(searchName, stringArgumentCaptor.getValue());
        Assertions.assertEquals(searchCapacity, stringArgumentCaptor1.getValue());
        Assertions.assertEquals(pageable, pageableArgumentCaptor.getValue());
    }

    @Test
    void deleteById() throws Exception {
        Long id = new Random().nextLong();
        this.roomService.deleteById(id);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.roomRepository).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }
}