package com.example.api.controller;

import com.example.api.entity.Room;
import com.example.api.service.RoomService;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;


@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class RoomControllerTest {

    @Autowired
    MockMvc mockMvc;
    @MockBean
    RoomService roomService;

    @Test
    void add() throws Exception {
        // 准备地址以及请求值
        String url = "/room/add";
        JSONObject jsonObject = new JSONObject();
        String name = RandomString.make(6);
        Long capacity = new Random().nextLong();
        // 构建json对象
        jsonObject.put("name", name);
        jsonObject.put("capacity", capacity);
        // 准备返回值
        Room returnRoom = new Room();
        returnRoom.setId(0L);
        returnRoom.setName("returnRoom");
        returnRoom.setCapacity(123456L);
        // 规定调用方法返回
        Mockito.doReturn(returnRoom).when(this.roomService).save(Mockito.any(), Mockito.any());
        // 发起请求以及断言
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                .content(jsonObject.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("capacity").exists());
    }

    @Test
    void findAll() throws Exception {
        // 初始化返回数据
        List<Room> rooms = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            Room room = new Room();
            room.setId((long) (- i - 1));
            room.setName(RandomString.make(6));
            room.setCapacity(new Random().nextLong());
            rooms.add(room);
        }
        Page<Room> mockOutPage = new PageImpl<Room>(
                rooms,
                PageRequest.of(0, 2),
                4
        );
        String url = "/room/page";
        String searchName = RandomString.make(6);
        Long searchCapacity = new Random().nextLong();
        // 规定方法
        Mockito.doReturn(mockOutPage).when(this.roomService).findAll(Mockito.any(), Mockito.any(), Mockito.any());

        //发起请求以及断言
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        LinkedHashMap returnJson = JsonPath.parse(mvcResult.getResponse().getContentAsString()).json();
        Assertions.assertEquals(2, returnJson.get("totalPages"));
        Assertions.assertEquals(4, returnJson.get("totalElements"));
        Assertions.assertEquals(2, returnJson.get("numberOfElements"));

        JSONArray content = (JSONArray) returnJson.get("content");
        Assertions.assertEquals(2, content.size());

        for (int i = 0; i < 2; i++) {
            LinkedHashMap roomHashMap = (LinkedHashMap) content.get(i);
            Assertions.assertEquals(- i - 1, roomHashMap.get("id"));
            Assertions.assertNotNull(roomHashMap.get("name"));
            Assertions.assertNotNull(roomHashMap.get("capacity"));
        }
    }

    @Test
    void deleteById() throws Exception {
        Long id = new Random().nextLong();
        String url = "/room/delete/" + id.toString();

        this.mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.roomService).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }
}