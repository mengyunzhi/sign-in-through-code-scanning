package com.example.api.repository;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class KlassRepositoryTest {
    @Autowired
    KlassRepository klassRepository;

    @Test
    public void Test() {
        this.klassRepository.findAll("name", PageRequest.of(0, 2));
    }
}