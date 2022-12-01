package com.example.api.service;

import com.example.api.entity.Clazz;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ClazzService {
    Clazz save(String name, Long entrance_date, Short length);

    Page findAll(String searchName, Pageable pageable);

    void deleteById(@NotNull Long id);

    String clazzNameUnique(@NotNull Long id, String name);

    Clazz findById(@NotNull Long id);

    Clazz update(@NotNull Long id, Clazz clazz);

    /**
     * 班级选择组件请求数据
     */
    List<Clazz> getAll();

    List<Long> clazzIdsHaveSelectCourse(@NotNull Long courseId);

    List<Clazz> getClazzesByCourseId(Long courseId);
}
