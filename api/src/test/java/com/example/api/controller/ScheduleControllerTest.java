package com.example.api.controller;

import com.example.api.repository.ScheduleRepository;
import com.example.api.service.ScheduleService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class ScheduleControllerTest {

    @Autowired
    public ScheduleService scheduleService;

    @Autowired
    MockMvc mockMvc;

    @Test
    void scheduleController() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get("/schedule/page")
                .param("userNumber", "teacher"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}