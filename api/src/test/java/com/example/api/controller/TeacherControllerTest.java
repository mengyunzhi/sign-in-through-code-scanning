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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.*;

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

    @Test
    void update() throws Exception {
        // 准备参数
        Long userId = new Random().nextLong();
        String url = "/teacher/update/" + userId;
        String name = RandomString.make(6);
        Short sex = (short) (new Random().nextLong() % 2);
        String number = RandomString.make(6);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name", name);
        jsonObject.put("sex", sex);
        jsonObject.put("number", number);
        Teacher teacher = new Teacher();
        teacher.setId(123L);
        // mock 方法
        Mockito.doReturn(teacher).when(this.teacherService).update(Mockito.any(), Mockito.any(), Mockito.any(), Mockito.any());
        // 发起请求及断言
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonObject.toString()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(123L));

        ArgumentCaptor<Long> userIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<String> nameArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Short> sexArgumentCaptor = ArgumentCaptor.forClass(Short.class);
        ArgumentCaptor<String> numberArgumentCaptor = ArgumentCaptor.forClass(String.class);
        Mockito.verify(this.teacherService).update(
                userIdArgumentCaptor.capture(),
                nameArgumentCaptor.capture(),
                sexArgumentCaptor.capture(),
                numberArgumentCaptor.capture()
        );
        Assertions.assertEquals(userId, userIdArgumentCaptor.getValue());
        Assertions.assertEquals(name, nameArgumentCaptor.getValue());
        Assertions.assertEquals(sex, sexArgumentCaptor.getValue());
        Assertions.assertEquals(number, numberArgumentCaptor.getValue());
    }

    @Test
    void updatePassword() throws Exception {
        // 准备参数
        Long userId = new Random().nextLong();
        String url = "/teacher/updatePasswordByAdmin/" + userId.toString();
        String password = RandomString.make(6);
        // 方法返回值为void， 无需mock，直接发起请求
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(password))
                .andExpect(MockMvcResultMatchers.status().isOk());
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<String> stringArgumentCaptor = ArgumentCaptor.forClass(String.class);
        Mockito.verify(this.teacherService).updatePassword(longArgumentCaptor.capture(), stringArgumentCaptor.capture());
        Assertions.assertEquals(userId, longArgumentCaptor.getValue());
        Assertions.assertEquals(password, stringArgumentCaptor.getValue());
    }
}