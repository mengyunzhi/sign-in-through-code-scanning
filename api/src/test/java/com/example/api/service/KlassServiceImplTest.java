package com.example.api.service;

import com.example.api.entity.Klass;
import com.example.api.entity.Term;
import com.example.api.repository.KlassRepository;
import com.example.api.repository.TermRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

import static org.junit.Assert.*;

public class KlassServiceImplTest {
    private KlassService klassService;
    private KlassRepository klassRepository;

    public KlassServiceImplTest() {
        this.klassRepository = Mockito.mock(KlassRepository.class);
        this.klassService = new KlassServiceImpl(this.klassRepository);
    }

    @Test
    public void save() {
        Klass klass = new Klass();
        this.klassRepository.save(klass);
    }

    @Test
    public void findAll() {
        // 准备传入数据
        Pageable mockInPageable = PageRequest.of(1, 20);
        String name = RandomString.make(4);
        // 准备返回数据
        List<Klass> mockStudents = Arrays.asList(new Klass());
        Page<Klass> mockOutUserPage = new PageImpl<Klass>(
                mockStudents,
                PageRequest.of(1, 20),
                21);
        // mock 方法
        Mockito.doReturn(mockOutUserPage).when(this.klassRepository).findAll(Mockito.eq(name), Mockito.any(Pageable.class));
        // 调用测试方法
        Page<Term> userPage = this.klassService.findAll(name, mockInPageable);
        // 断言返回数据
        Assertions.assertEquals(userPage, mockOutUserPage);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.klassRepository).findAll(Mockito.eq(name), pageableArgumentCaptor.capture());
        Assertions.assertEquals(mockInPageable, pageableArgumentCaptor.getValue());
    }

    @Test
    public void deleteById() {
        Long id = new Random().nextLong();
        this.klassService.deleteById(id);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.klassRepository).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }
}