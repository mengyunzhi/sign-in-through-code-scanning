package com.example.api.controller;

import com.example.api.entity.Term;
import com.example.api.service.TermService;
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

import java.util.*;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class TermControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    TermService termService;

    @Test
    public void add() throws Exception {
        // 准备地址以及请求值
        String url = "/term/add";
        JSONObject jsonObject = new JSONObject();
        String name = RandomString.make(6);
        Long startTime = new Random().nextLong();
        Long endTime = new Random().nextLong();
        Long state = new Random().nextLong();
        // 构建json对象
        jsonObject.put("name", name);
        jsonObject.put("start_time", startTime);
        jsonObject.put("end_time", endTime);
        jsonObject.put("state", state);
        // 准备返回值
        Term returnTerm = new Term();
        returnTerm.setId(0L);
        returnTerm.setName("returnRoom");
        returnTerm.setStartTime(123456L);
        returnTerm.setEndTime(123456L);
        returnTerm.setState(123456L);
        // 规定调用方法返回
        Mockito.doReturn(returnTerm).when(this.termService).save(Mockito.any(), Mockito.any(), Mockito.any(), Mockito.any());
        // 发起请求以及断言
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                        .content(jsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists());
    }

    @Test
    public void findAll() throws Exception {
        // 初始化返回数据
        List<Term> terms = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            Term term = new Term();
            term.setId((long) (- i - 1));
            term.setName(RandomString.make(6));
            term.setStartTime(new Random().nextLong());
            term.setEndTime(new Random().nextLong());
            term.setState(new Random().nextLong());
            terms.add(term);
        }
        Page<Term> mockOutPage = new PageImpl<Term>(
                terms,
                PageRequest.of(0, 2),
                4
        );
        String url = "/term/page";
        String searchName = RandomString.make(6);
        // 规定方法
        Mockito.doReturn(mockOutPage).when(this.termService).findAll(Mockito.any(), Mockito.any());

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
            Assertions.assertNotNull(roomHashMap.get("start_time"));
            Assertions.assertNotNull(roomHashMap.get("end_time"));
            Assertions.assertNotNull(roomHashMap.get("state"));
        }
    }

    @Test
    public void deleteById() throws Exception {
        Long id = new Random().nextLong();
        String url = "/term/delete/" + id.toString();

        this.mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.termService).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    /**
     * 通过学期ID查询学期测试
     */
    @Test
    public void getById() throws Exception {
        Long id = new Random().nextLong();

        Term term = new Term();
        term.setId(id);
        term.setName(new RandomString(4).nextString());
        term.setStartTime(new Random().nextLong());
        term.setEndTime(new Random().nextLong());
        term.setState(new Random().nextLong());

        Mockito.when(this.termService.findById(Mockito.anyLong())).thenReturn(term);

        String url = "/term/getById/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("name").value(term.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("start_time").value(term.getStartTime()))
                .andExpect(MockMvcResultMatchers.jsonPath("end_time").value(term.getEndTime()))
                .andExpect(MockMvcResultMatchers.jsonPath("state").value(term.getState()))
                .andReturn();

        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.termService).findById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    @Test
    public void update() throws Exception {
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Term mockResult = new Term();
        mockResult.setId(id);
        mockResult.setName(new RandomString(4).nextString());
        mockResult.setStartTime(new Random().nextLong());
        mockResult.setEndTime(new Random().nextLong());
        mockResult.setState(new Random().nextLong());

        Mockito.when(this.termService.update(Mockito.anyLong(), Mockito.any(Term.class))).thenReturn(mockResult);

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("name", RandomString.make(4));
        jsonObject.put("start_time", new Random().nextLong());
        jsonObject.put("end_time", new Random().nextLong());
        jsonObject.put("state", (short) 2);

        // 按接口规范发起请求，断言状态码正常，接受的数据符合预期
        String url = "/term/update/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                        .content(jsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("start_time").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("end_time").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("state").exists());

        // 断言C层进行了数据转发（替身接收的参数值符合预期）
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<Term> termArgumentCaptor = ArgumentCaptor.forClass(Term.class);

        Mockito.verify(this.termService).update(longArgumentCaptor.capture(), termArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
        Term resultTerm = termArgumentCaptor.getValue();
        Assertions.assertEquals(resultTerm.getName(), jsonObject.get("name"));
        Assertions.assertEquals(resultTerm.getStartTime(), jsonObject.get("start_time"));
        Assertions.assertEquals(resultTerm.getEndTime(), jsonObject.get("end_time"));
        Assertions.assertEquals(resultTerm.getState().toString(), jsonObject.get("state").toString());

    }
}