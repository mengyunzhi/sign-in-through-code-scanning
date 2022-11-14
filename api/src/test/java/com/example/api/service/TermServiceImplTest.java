package com.example.api.service;


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

//        Long id = new Random().nextLong();
//        Term mockResultsTerm = new Term();
//        Mockito.when(this.termRepository.findById(id)).thenReturn(Optional.of(mockResultsTerm));
//
//        TermService termServiceSpy = Mockito.spy(this.termService);
//
//        TermServiceImpl termServiceImplSpy = (TermServiceImpl) termServiceSpy;
//        Term mockResultTerm1 = new Term();
//        Mockito.doReturn(mockResultTerm1).when(termServiceImplSpy).update(Mockito.anyLong(), Mockito.any(Term.class));
//
//        Term term = new Term();
//        Term resultTerm = termServiceImplSpy.update(id, term);
//
//        // 断言传入第一个替身参数符合预期
//        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
//        Mockito.verify(this.termRepository).findById(longArgumentCaptor.capture());
//        Assertions.assertEquals(longArgumentCaptor.getValue(), id);
//
//        // 断言第二个替身参数符合预期：参数1为传入update方法的用户，参数2为替身1的返回值
//        ArgumentCaptor<Term> termArgumentCaptor = ArgumentCaptor.forClass(Term.class);
//        ArgumentCaptor<Long> termArgumentCaptor1 = ArgumentCaptor.forClass(Long.class);
//        Mockito.verify(termServiceImplSpy).update(termArgumentCaptor1.capture(), termArgumentCaptor.capture());
//        Assertions.assertEquals(termArgumentCaptor.getValue(), mockResultsTerm);
//
//        // 断言返回值就是第二个替身的返回值
//        org.assertj.core.api.Assertions.assertThat(resultTerm).isEqualTo(mockResultsTerm);
    }
}