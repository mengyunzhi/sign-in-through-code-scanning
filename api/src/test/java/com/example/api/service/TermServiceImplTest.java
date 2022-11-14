package com.example.api.service;


import com.example.api.entity.Room;
import com.example.api.entity.Term;
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
import java.util.Optional;
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
        // 准备传入数据
        Pageable mockInPageable = PageRequest.of(1, 20);
        String name = RandomString.make(4);
        // 准备返回数据
        List<Term> mockStudents = Arrays.asList(new Term());
        Page<Term> mockOutUserPage = new PageImpl<Term>(
                mockStudents,
                PageRequest.of(1, 20),
                21);
        // mock 方法
        Mockito.doReturn(mockOutUserPage).when(this.termRepository).findAll(Mockito.eq(name), Mockito.any(Pageable.class));
        // 调用测试方法
        Page<Term> userPage = this.termService.findAll(name, mockInPageable);
        // 断言返回数据
        Assertions.assertEquals(userPage, mockOutUserPage);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.termRepository).findAll(Mockito.eq(name), pageableArgumentCaptor.capture());
        Assertions.assertEquals(mockInPageable, pageableArgumentCaptor.getValue());
    }

    @Test
    public void save() {
        Term term = new Term();
        this.termRepository.save(term);
    }

    @Test
    public void deleteById() {
        Long id = new Random().nextLong();
        this.termService.deleteById(id);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.termRepository).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    @Test
    public void findById() {
        // 准备调用时的参数及返回值
        Long id = new Random().nextLong();
        Term mockReturnUser = new Term();
        Mockito.when(this.termRepository.findById(id)).thenReturn(Optional.of(mockReturnUser));

        // 发起调用
        Term term = this.termService.findById(id);

        // 断言返回值与预期相同
        Assertions.assertEquals(term, mockReturnUser);

        // 断言接收到的参数与预期相同
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.termRepository).findById(longArgumentCaptor.capture());
        Assertions.assertEquals(longArgumentCaptor.getValue(), id);
    }

    @Test
    public void update() {
        // 参数
        Long id = new Random().nextLong();
        Term newTerm = new Term();
        Term oldTerm = new Term();
        newTerm.setId(id);
        oldTerm.setId(id);
        oldTerm.setName("oldName");
        oldTerm.setState(123L);

        newTerm.setName("newRoom");
        newTerm.setState(456L);

        Term mockTerm = new Term();
        // 规定返回值
        TermServiceImpl termServiceImplSpy = (TermServiceImpl) Mockito.spy(this.termService);
        Mockito.doReturn(oldTerm).when(termServiceImplSpy).findById(Mockito.anyLong());

        Mockito.doReturn(mockTerm).when(this.termRepository).save(Mockito.any());
        Term returnTerm = termServiceImplSpy.updateFields(newTerm, oldTerm);
        // 断言
        Assertions.assertEquals(oldTerm.getName(), newTerm.getName());
        Assertions.assertEquals(oldTerm.getState(), newTerm.getState());
        // 断言参数
        // service的updateFields方法的参数
        // repository save方法的参数
        ArgumentCaptor<Term> termArgumentCaptor1 = ArgumentCaptor.forClass(Term.class);
        ArgumentCaptor<Term> termArgumentCaptor2 = ArgumentCaptor.forClass(Term.class);
        ArgumentCaptor<Term> termArgumentCaptor3 = ArgumentCaptor.forClass(Term.class);
        Mockito.verify(termServiceImplSpy).updateFields(termArgumentCaptor1.capture(), termArgumentCaptor2.capture());
        Mockito.verify(this.termRepository).save(termArgumentCaptor3.capture());
        Assertions.assertEquals(newTerm.getId(), termArgumentCaptor1.getValue().getId());
        Assertions.assertEquals(oldTerm.getId(), termArgumentCaptor2.getValue().getId());
        Assertions.assertEquals(oldTerm.getId(), termArgumentCaptor3.getValue().getId());
        // repository save方法的返回值
        Assertions.assertEquals(returnTerm, mockTerm);
    }
}