package com.example.api.service;

import com.example.api.entity.Student;

public interface StudentService {
    Student save(String name, Short sex, Long clazzId, String sno);
}
