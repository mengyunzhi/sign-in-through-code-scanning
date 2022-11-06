package com.example.api.controller;

import com.example.api.entity.Room;
import com.example.api.service.RoomService;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

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
}