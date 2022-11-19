package com.example.api.service;

import com.example.api.entity.Clazz;
import com.example.api.entity.Term;
import com.example.api.repository.ClazzRepository;
import com.example.api.repository.StudentRepository;
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

public class KlassServiceImplTest {
    private ClazzService clazzService;
    private ClazzRepository clazzRepository;
    private StudentRepository studentRepository;

    public KlassServiceImplTest() {
        this.clazzRepository = Mockito.mock(ClazzRepository.class);
        this.studentRepository = Mockito.mock(StudentRepository.class);
        this.clazzService = new ClazzServiceImpl(this.clazzRepository, studentRepository);
    }

    @Test
    public void save() {
        Clazz clazz = new Clazz();
        this.clazzRepository.save(clazz);
    }

    @Test
    public void findAll() {
        // 准备传入数据
        Pageable mockInPageable = PageRequest.of(1, 20);
        String name = RandomString.make(4);
        // 准备返回数据
        List<Clazz> mockStudents = Arrays.asList(new Clazz());
        Page<Clazz> mockOutUserPage = new PageImpl<Clazz>(
                mockStudents,
                PageRequest.of(1, 20),
                21);
        // mock 方法
        Mockito.doReturn(mockOutUserPage).when(this.clazzRepository).findAll(Mockito.eq(name), Mockito.any(Pageable.class));
        // 调用测试方法
        Page<Term> userPage = this.clazzService.findAll(name, mockInPageable);
        // 断言返回数据
        Assertions.assertEquals(userPage, mockOutUserPage);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.clazzRepository).findAll(Mockito.eq(name), pageableArgumentCaptor.capture());
        Assertions.assertEquals(mockInPageable, pageableArgumentCaptor.getValue());
    }

    @Test
    public void deleteById() {
        Long id = new Random().nextLong();
        this.clazzService.deleteById(id);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clazzRepository).deleteById(longArgumentCaptor.capture());
        Assertions.assertEquals(id, longArgumentCaptor.getValue());
    }

    @Test
    public void findById() {
        // 准备调用时的参数及返回值
        Long id = new Random().nextLong();
        Clazz mockReturnUser = new Clazz();
        Mockito.when(this.clazzRepository.findById(id)).thenReturn(Optional.of(mockReturnUser));

        // 发起调用
        Clazz clazz = this.clazzService.findById(id);

        // 断言返回值与预期相同
        Assertions.assertEquals(clazz, mockReturnUser);

        // 断言接收到的参数与预期相同
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clazzRepository).findById(longArgumentCaptor.capture());
        Assertions.assertEquals(longArgumentCaptor.getValue(), id);
    }

    @Test
    public void update() {
        // 参数
        Long id = new Random().nextLong();
        Clazz newClazz = new Clazz();
        Clazz oldClazz = new Clazz();
        newClazz.setId(id);
        oldClazz.setId(id);
        oldClazz.setName("oldName");
        oldClazz.setLength((short)123);

        newClazz.setName("newRoom");
        newClazz.setLength((short)456);

        Clazz mockClazz = new Clazz();
        // 规定返回值
        ClazzServiceImpl klassServiceImplSpy = (ClazzServiceImpl) Mockito.spy(this.clazzService);
        Mockito.doReturn(oldClazz).when(klassServiceImplSpy).findById(Mockito.anyLong());

        Mockito.doReturn(mockClazz).when(this.clazzRepository).save(Mockito.any());
        Clazz returnClazz = klassServiceImplSpy.updateFields(newClazz, oldClazz);
        // 断言
        Assertions.assertEquals(oldClazz.getName(), newClazz.getName());
        Assertions.assertEquals(oldClazz.getLength(), newClazz.getLength());
        // 断言参数
        // service的updateFields方法的参数
        // repository save方法的参数
        ArgumentCaptor<Clazz> klassArgumentCaptor1 = ArgumentCaptor.forClass(Clazz.class);
        ArgumentCaptor<Clazz> klassArgumentCaptor2 = ArgumentCaptor.forClass(Clazz.class);
        ArgumentCaptor<Clazz> klassArgumentCaptor3 = ArgumentCaptor.forClass(Clazz.class);
        Mockito.verify(klassServiceImplSpy).updateFields(klassArgumentCaptor1.capture(), klassArgumentCaptor2.capture());
        Mockito.verify(this.clazzRepository).save(klassArgumentCaptor3.capture());
        Assertions.assertEquals(newClazz.getId(), klassArgumentCaptor1.getValue().getId());
        Assertions.assertEquals(oldClazz.getId(), klassArgumentCaptor2.getValue().getId());
        Assertions.assertEquals(oldClazz.getId(), klassArgumentCaptor3.getValue().getId());
        // repository save方法的返回值
        Assertions.assertEquals(returnClazz, mockClazz);
    }
}