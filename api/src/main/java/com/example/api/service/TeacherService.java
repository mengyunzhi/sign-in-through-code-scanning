package com.example.api.service;

import com.example.api.entity.Teacher;
import com.example.api.entity.User;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TeacherService {
    Teacher save(@NotNull User user);

    Page findAll(String name, String number, @NotNull Pageable pageable);

    void deleteByUserId(@NotNull Long id);

    User getByUserId(Long userId);
}
