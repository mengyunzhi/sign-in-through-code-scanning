package com.example.api.repository;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
class TermRepositoryTest {
    @Autowired
    TermRepository termRepository;

    @Test
    void conn() {
        this.termRepository.count();
    }
}