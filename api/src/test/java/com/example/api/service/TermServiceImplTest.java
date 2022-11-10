package com.example.api.service;

import com.example.api.entity.Room;
import com.example.api.entity.Term;
import com.example.api.repository.TermRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import java.util.Random;

import static org.junit.Assert.*;

public class TermServiceImplTest {

    private TermService termService;
    private TermRepository termRepository;

    public TermServiceImplTest() {
        this.termRepository = Mockito.mock(TermRepository.class);
        this.termService = new TermServiceImpl(this.termRepository);
    }

    @Test
    public void findAll() {
    }

    @Test
    public void save() {
//        // 准备参数
//        String name = RandomString.make(6);
//        Long startTime = new Random().nextLong();
//        Long endTime = new Random().nextLong();
//        Long state = new Random().nextLong();
//        // 调用方法
//        this.termService.save(name, startTime, endTime, state);
//        // 断言
//        ArgumentCaptor<Term> termArgumentCaptor = ArgumentCaptor.forClass(Term.class);
//        Mockito.verify(this.termService).save(termArgumentCaptor.capture());
//        Assertions.assertEquals(name, termArgumentCaptor.getValue().getName());
//        Assertions.assertEquals(startTime, termArgumentCaptor.getValue().getStartTime());
//        Assertions.assertEquals(endTime, termArgumentCaptor.getValue().getEndTime());
//        Assertions.assertEquals(state, termArgumentCaptor.getValue().getState());
    }

    @Test
    public void deleteById() {
    }
}