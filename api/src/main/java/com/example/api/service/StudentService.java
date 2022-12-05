package com.example.api.service;

import com.example.api.entity.Clazz;
import com.example.api.entity.Schedule;
import com.example.api.entity.Student;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    Student save(@NotNull String name, @NotNull Short sex, @NotNull String password, @NotNull Long clazzId, @NotNull String sno);

    Page findAll(String clazzName, String studentName, String sno, @NotNull Pageable pageable);

    void deleteByUserId(@NotNull Long userId);

    void updatePassword(@NotNull Long userId, @NotNull String password);

    Student getByUserId(@NotNull Long userId);

    Student updateByUserId(@NotNull Long userId, @NotNull String name, @NotNull Short sex, @NotNull Long clazzId, @NotNull String sno);

    String snoUniqueByUserId(@NotNull Long userId, @NotNull String sno);

    Page<Student> findAllBelongToClazz(@NotNull Long clazzId, String searchName, String searchSno, @NotNull Pageable pageable);

    List<Student> pageByScheduleId(@NotNull String scheduleId, String searchName, String searchSno, String searchClazz, String page, String size);

    List<Student> getAllStudentByClazzId(Long clazzId);

    List<Student> getAll();

    Long snoExist(Long userId, String sno);

    Student getByStudentId(Long studentId);
}
