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

import java.util.Optional;
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

    @Test
    void getById() {
        // 参数
        Long id = new Random().nextLong();
        Room room = new Room();
        room.setId(id);
        room.setName("123456");
        room.setCapacity(123456L);
        // 规定返回值
        Mockito.doReturn(Optional.of(room)).when(this.roomRepository).findById(Mockito.any());
        // 调用
        Room returnRoom = this.roomService.getById(id);
        // 断言
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.roomRepository).findById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
        Assertions.assertEquals(room.getId(), returnRoom.getId());
        Assertions.assertEquals(room.getCapacity(), returnRoom.getCapacity());
        Assertions.assertEquals(room.getName(), returnRoom.getName());
    }

    @Test
    void update() {
        // 参数
        Long id = new Random().nextLong();
        Room newRoom = new Room();
        Room oldRoom = new Room();
        newRoom.setId(id); oldRoom.setId(id);
        oldRoom.setName("oldName");
        oldRoom.setCapacity(123L);

        newRoom.setName("newRoom");
        newRoom.setCapacity(456L);

        Room mockRoom = new Room();
        // 规定返回值
        RoomServiceImpl roomServiceImplSpy = (RoomServiceImpl) Mockito.spy(this.roomService);
        Mockito.doReturn(oldRoom).when(roomServiceImplSpy).getById(Mockito.anyLong());

        Mockito.doReturn(mockRoom).when(this.roomRepository).save(Mockito.any());
        Room returnRoom = roomServiceImplSpy.updateFields(newRoom, oldRoom);
        // 断言
        Assertions.assertEquals(oldRoom.getName(), newRoom.getName());
        Assertions.assertEquals(oldRoom.getCapacity(), newRoom.getCapacity());
        // 断言参数
        // service的updateFields方法的参数
        // repository save方法的参数
        ArgumentCaptor<Room> roomArgumentCaptor1 = ArgumentCaptor.forClass(Room.class);
        ArgumentCaptor<Room> roomArgumentCaptor2 = ArgumentCaptor.forClass(Room.class);
        ArgumentCaptor<Room> roomArgumentCaptor3 = ArgumentCaptor.forClass(Room.class);
        Mockito.verify(roomServiceImplSpy).updateFields(roomArgumentCaptor1.capture(), roomArgumentCaptor2.capture());
        Mockito.verify(this.roomRepository).save(roomArgumentCaptor3.capture());
        Assertions.assertEquals(newRoom.getId(), roomArgumentCaptor1.getValue().getId());
        Assertions.assertEquals(oldRoom.getId(), roomArgumentCaptor2.getValue().getId());
        Assertions.assertEquals(oldRoom.getId(), roomArgumentCaptor3.getValue().getId());
        // repository save方法的返回值
        Assertions.assertEquals(returnRoom, mockRoom);
    }
}