package com.example.api.controller;

import com.example.api.entity.Room;
import com.example.api.entity.Teacher;
import com.example.api.service.RoomService;
import com.example.api.service.TeacherService;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runner.Runner;
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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class TeacherControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    TeacherService teacherService;

    @Test
    void page() throws Exception {
        // 初始化返回数据
        List<Teacher> teachers = new ArrayList<Teacher>();
        for (int i = 0; i < 2; i++) {
            Teacher teacher = new Teacher();
            teacher.setId((long) -i);
            teachers.add(teacher);
        }
        Page<Teacher> mockOutPage = new PageImpl<>(
                teachers,
                PageRequest.of(0, 2),
                4
        );
        String url = "/teacher/page";
        // 规定返回值
        Mockito.doReturn(mockOutPage).when(this.teacherService).findAll(Mockito.any(), Mockito.any(), Mockito.any());
        // 发起请求以及断言
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
            LinkedHashMap linkedHashMap = (LinkedHashMap) content.get(i);
            Assertions.assertEquals(-i, linkedHashMap.get("id"));
        }
        return;
    }

    @Test
    void deleteByUserId() throws Exception {
        // 定义参数
        Long id = new Random().nextLong();
        String url = "/teacher/delete/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void save() throws Exception {
        // 定义参数
        String name = RandomString.make(5);
        Short sex = (short) (new Random().nextLong() % 2);
        String number = RandomString.make(11);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name", name);
        jsonObject.put("sex", sex);
        jsonObject.put("number", number);
        String url = "/teacher/add";

        Teacher returnTeacher = new Teacher();
        returnTeacher.setId(-1L);
        // 规定方法返回
        Mockito.doReturn(returnTeacher).when(this.teacherService).save(Mockito.any());
        // 发起请求以及断言
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonObject.toString()))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(-1L));
    }
}