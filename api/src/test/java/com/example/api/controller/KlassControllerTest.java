package com.example.api.controller;

import com.example.api.entity.Klass;
import com.example.api.entity.Term;
import com.example.api.service.KlassService;
import com.example.api.service.TermService;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.json.JSONException;
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

import static org.junit.Assert.*;

@SpringBootTest
@AutoConfigureMockMvc
public class KlassControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    KlassService klassService;

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
        Klass returnKlass = new Klass();
        returnKlass.setId(0L);
        returnKlass.setName("returnRoom");
        returnKlass.setEntrance_date(123456L);
        returnKlass.setLength((short) 123456);
        // 规定调用方法返回
        Mockito.doReturn(returnKlass).when(this.klassService).save(Mockito.any(), Mockito.any(), Mockito.any());
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
        Mockito.verify(this.klassService).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    @Test
    public void findAll() throws Exception {
        // 初始化返回数据
        List<Klass> klasses = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            Klass klass = new Klass();
            klass.setId((long) (- i - 1));
            klass.setName(RandomString.make(6));
            klass.setEntrance_date(new Random().nextLong());
            klass.setLength((short) new Random().nextLong());
            klasses.add(klass);
        }
        Page<Klass> mockOutPage = new PageImpl<Klass>(
                klasses,
                PageRequest.of(0, 2),
                4
        );
        String url = "/clazz/page";
        String searchName = RandomString.make(6);
        // 规定方法
        Mockito.doReturn(mockOutPage).when(this.klassService).findAll(Mockito.any(), Mockito.any());

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

        Klass klass = new Klass();
        klass.setId(id);
        klass.setName(RandomString.make(4));
        klass.setEntrance_date(new Random().nextLong());
        klass.setLength((short) new Random().nextLong());

        Mockito.doReturn(klass).when(this.klassService).findById(Mockito.anyLong());

        String url = "/clazz/getById/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("name").value(klass.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("entrance_date").value(klass.getEntrance_date()))
                .andExpect(MockMvcResultMatchers.jsonPath("length").value(klass.getLength().toString()))
                .andReturn();

        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.klassService).findById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    @Test
    public void update() throws Exception {
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Klass mockResult = new Klass();
        mockResult.setId(id);
        mockResult.setName(new RandomString(4).nextString());
        mockResult.setEntrance_date(new Random().nextLong());
        mockResult.setLength((short) new Random().nextLong());

        Mockito.when(this.klassService.update(Mockito.anyLong(), Mockito.any(Klass.class))).thenReturn(mockResult);

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
        ArgumentCaptor<Klass> klassArgumentCaptor = ArgumentCaptor.forClass(Klass.class);

        Mockito.verify(this.klassService).update(longArgumentCaptor.capture(), klassArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
        Klass resultKlass = klassArgumentCaptor.getValue();
        Assertions.assertEquals(resultKlass.getName(), jsonObject.get("name"));
        Assertions.assertEquals(resultKlass.getEntrance_date(), jsonObject.get("entrance_date"));
        Assertions.assertEquals(resultKlass.getLength().toString(), jsonObject.get("length").toString());

    }
}