package com.example.api.service;

import com.example.api.entity.Course;
import com.example.api.entity.Program;
import com.sun.istack.NotNull;

public interface ProgramService {

    Program save(@NotNull String name, @NotNull Long courseId, @NotNull Long lesson);

    Program getById(Long id);

    Program update(@NotNull Long id, Program program);

    void deleteById(@NotNull Long id);
}
