package com.example.api.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TeacherRepositoryTest {

    @Autowired
    public TeacherRepository teacherRepository;

    @Test
    void conn() {
        this.teacherRepository.count();
    }

}