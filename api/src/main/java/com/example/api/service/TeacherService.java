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

    Teacher getByUserId(@NotNull Long userId);

    void updatePassword(@NotNull Long userId, @NotNull String password);

    Teacher update(@NotNull Long userId, @NotNull String name, @NotNull Short sex, @NotNull String number);
}
