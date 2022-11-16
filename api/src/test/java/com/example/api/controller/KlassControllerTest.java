package com.example.api.controller;

import com.example.api.entity.Clazz;
import com.example.api.service.ClazzService;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
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
public class KlassControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    ClazzService clazzService;

    @Test
    public void save() throws Exception {
        // 准备地址以及请求值
        String url = "/clazz/add";
        JSONObject jsonObject = new JSONObject();
        String name = RandomString.make(6);
        Long entrance_date = new Random().nextLong();
        Short length = (short) 123456;
        // 构建json对象
        jsonObject.put("name", name);
        jsonObject.put("entrance_date", entrance_date);
        jsonObject.put("length", length);
        // 准备返回值
        Clazz returnClazz = new Clazz();
        returnClazz.setId(0L);
        returnClazz.setName("returnRoom");
        returnClazz.setEntrance_date(123456L);
        returnClazz.setLength((short) 123456);
        // 规定调用方法返回
        Mockito.doReturn(returnClazz).when(this.clazzService).save(Mockito.any(), Mockito.any(), Mockito.any());
        // 发起请求以及断言
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                        .content(jsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("entrance_date").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("length").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists());
    }

    @Test
    public void deleteById() throws Exception {
        Long id = new Random().nextLong();
        String url = "/clazz/delete/" + id.toString();

        this.mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clazzService).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    @Test
    public void findAll() throws Exception {
        // 初始化返回数据
        List<Clazz> clazzes = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            Clazz clazz = new Clazz();
            clazz.setId((long) (- i - 1));
            clazz.setName(RandomString.make(6));
            clazz.setEntrance_date(new Random().nextLong());
            clazz.setLength((short) new Random().nextLong());
            clazzes.add(clazz);
        }
        Page<Clazz> mockOutPage = new PageImpl<Clazz>(
                clazzes,
                PageRequest.of(0, 2),
                4
        );
        String url = "/clazz/page";
        String searchName = RandomString.make(6);
        // 规定方法
        Mockito.doReturn(mockOutPage).when(this.clazzService).findAll(Mockito.any(), Mockito.any());

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
            Assertions.assertNotNull(roomHashMap.get("entrance_date"));
            Assertions.assertNotNull(roomHashMap.get("length"));
        }
    }

    @Test
    public void getById() throws Exception {
        Long id = new Random().nextLong();

        Clazz clazz = new Clazz();
        clazz.setId(id);
        clazz.setName(RandomString.make(4));
        clazz.setEntrance_date(new Random().nextLong());
        clazz.setLength((short) new Random().nextLong());

        Mockito.doReturn(clazz).when(this.clazzService).findById(Mockito.anyLong());

        String url = "/clazz/getById/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("name").value(clazz.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("entrance_date").value(clazz.getEntrance_date()))
                .andExpect(MockMvcResultMatchers.jsonPath("length").value(clazz.getLength().toString()))
                .andReturn();

        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clazzService).findById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    @Test
    public void update() throws Exception {
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Clazz mockResult = new Clazz();
        mockResult.setId(id);
        mockResult.setName(new RandomString(4).nextString());
        mockResult.setEntrance_date(new Random().nextLong());
        mockResult.setLength((short) new Random().nextLong());

        Mockito.when(this.clazzService.update(Mockito.anyLong(), Mockito.any(Clazz.class))).thenReturn(mockResult);

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("name", RandomString.make(4));
        jsonObject.put("entrance_date", new Random().nextLong());
        jsonObject.put("length", (short) new Random().nextLong());

        // 按接口规范发起请求，断言状态码正常，接受的数据符合预期
        String url = "/clazz/update/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                        .content(jsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("entrance_date").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("length").exists());

        // 断言C层进行了数据转发（替身接收的参数值符合预期）
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<Clazz> klassArgumentCaptor = ArgumentCaptor.forClass(Clazz.class);

        Mockito.verify(this.clazzService).update(longArgumentCaptor.capture(), klassArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
        Clazz resultClazz = klassArgumentCaptor.getValue();
        Assertions.assertEquals(resultClazz.getName(), jsonObject.get("name"));
        Assertions.assertEquals(resultClazz.getEntrance_date(), jsonObject.get("entrance_date"));
        Assertions.assertEquals(resultClazz.getLength().toString(), jsonObject.get("length").toString());

    }
}