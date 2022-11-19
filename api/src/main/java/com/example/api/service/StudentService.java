package com.example.api.service;

import com.example.api.entity.Clazz;
import com.example.api.entity.Student;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    Student save(@NotNull String name, @NotNull Short sex, Long clazzId, @NotNull String sno);

    Page findAll(String clazzName, String studentName, String sno, @NotNull Pageable pageable);

    void deleteByUserId(@NotNull Long userId);

    void updatePassword(@NotNull Long userId, @NotNull String password);

    Student getByUserId(@NotNull Long userId);

    Student updateByUserId(@NotNull Long userId, @NotNull String name, @NotNull Short sex, @NotNull Long clazzId, @NotNull String sno);

    String snoUniqueByUserId(@NotNull Long userId, @NotNull String sno);

    Page<Student> findAllBelongToClazz(@NotNull Long clazzId, String searchName, String searchSno, @NotNull Pageable pageable);
}
