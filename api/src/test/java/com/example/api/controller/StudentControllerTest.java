package com.example.api.controller;

import com.example.api.entity.Clazz;
import com.example.api.entity.Room;
import com.example.api.entity.Student;
import com.example.api.entity.User;
import com.example.api.service.StudentService;
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
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Random;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class StudentControllerTest {

    @MockBean
    private StudentService studentService;

    @Autowired
    MockMvc mockMvc;

    @Test
    void save() throws Exception {
        // 准备地址以及请求值
        String url = "/student/add";
        JSONObject jsonObject = new JSONObject();
        String name = RandomString.make(6);
        Short sex = (short) (new Random().nextLong() % 2);
        Long clazzId = new Random().nextLong();
        String sno = RandomString.make(6);

        JSONObject userObject = new JSONObject();
        userObject.put("name", name);
        userObject.put("sex", sex);
        JSONObject clazzObject = new JSONObject();
        clazzObject.put("id", clazzId);

        // 构建json对象
        jsonObject.put("sno", sno);
        jsonObject.put("user", userObject);
        jsonObject.put("clazz", clazzObject);
        // 准备返回值
        Student returnStudent = new Student();
        returnStudent.setId(123L);
        // 规定调用方法返回
        Mockito.doReturn(returnStudent).when(this.studentService).save(
                Mockito.any(),
                Mockito.any(),
                Mockito.any(),
                Mockito.any()
        );
        // 发起请求以及断言
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                        .content(jsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("id").exists());

        ArgumentCaptor<String> stringArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Short> shortArgumentCaptor = ArgumentCaptor.forClass(Short.class);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<String> stringArgumentCaptor2 = ArgumentCaptor.forClass(String.class);
        Mockito.verify(this.studentService).save(
                stringArgumentCaptor.capture(),
                shortArgumentCaptor.capture(),
                longArgumentCaptor.capture(),
                stringArgumentCaptor2.capture()
        );
        Assertions.assertEquals(name, stringArgumentCaptor.getValue());
        Assertions.assertEquals(sex, shortArgumentCaptor.getValue());
        Assertions.assertEquals(clazzId, longArgumentCaptor.getValue());
        Assertions.assertEquals(sno, stringArgumentCaptor2.getValue());
    }
}