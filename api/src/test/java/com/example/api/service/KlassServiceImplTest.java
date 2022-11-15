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
import java.util.Optional;
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

    @Test
    public void findById() {
        // 准备调用时的参数及返回值
        Long id = new Random().nextLong();
        Klass mockReturnUser = new Klass();
        Mockito.when(this.klassRepository.findById(id)).thenReturn(Optional.of(mockReturnUser));

        // 发起调用
        Klass klass = this.klassService.findById(id);

        // 断言返回值与预期相同
        Assertions.assertEquals(klass, mockReturnUser);

        // 断言接收到的参数与预期相同
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.klassRepository).findById(longArgumentCaptor.capture());
        Assertions.assertEquals(longArgumentCaptor.getValue(), id);
    }

    @Test
    public void update() {
        // 参数
        Long id = new Random().nextLong();
        Klass newKlass = new Klass();
        Klass oldKlass = new Klass();
        newKlass.setId(id);
        oldKlass.setId(id);
        oldKlass.setName("oldName");
        oldKlass.setLength((short)123);

        newKlass.setName("newRoom");
        newKlass.setLength((short)456);

        Klass mockKlass = new Klass();
        // 规定返回值
        KlassServiceImpl klassServiceImplSpy = (KlassServiceImpl) Mockito.spy(this.klassService);
        Mockito.doReturn(oldKlass).when(klassServiceImplSpy).findById(Mockito.anyLong());

        Mockito.doReturn(mockKlass).when(this.klassRepository).save(Mockito.any());
        Klass returnKlass = klassServiceImplSpy.updateFields(newKlass, oldKlass);
        // 断言
        Assertions.assertEquals(oldKlass.getName(), newKlass.getName());
        Assertions.assertEquals(oldKlass.getLength(), newKlass.getLength());
        // 断言参数
        // service的updateFields方法的参数
        // repository save方法的参数
        ArgumentCaptor<Klass> klassArgumentCaptor1 = ArgumentCaptor.forClass(Klass.class);
        ArgumentCaptor<Klass> klassArgumentCaptor2 = ArgumentCaptor.forClass(Klass.class);
        ArgumentCaptor<Klass> klassArgumentCaptor3 = ArgumentCaptor.forClass(Klass.class);
        Mockito.verify(klassServiceImplSpy).updateFields(klassArgumentCaptor1.capture(), klassArgumentCaptor2.capture());
        Mockito.verify(this.klassRepository).save(klassArgumentCaptor3.capture());
        Assertions.assertEquals(newKlass.getId(), klassArgumentCaptor1.getValue().getId());
        Assertions.assertEquals(oldKlass.getId(), klassArgumentCaptor2.getValue().getId());
        Assertions.assertEquals(oldKlass.getId(), klassArgumentCaptor3.getValue().getId());
        // repository save方法的返回值
        Assertions.assertEquals(returnKlass, mockKlass);
    }
}