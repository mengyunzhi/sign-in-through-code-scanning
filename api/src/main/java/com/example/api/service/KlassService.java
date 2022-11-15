package com.example.api.service;

import com.example.api.entity.Klass;
import com.example.api.entity.Term;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface KlassService {
    Klass save(String name, Long entrance_date, Short length);

    Page findAll(String searchName, Pageable pageable);

    void deleteById(@NotNull Long id);

    String clazzNameUnique(@NotNull Long id, String name);

    Klass findById(@NotNull Long id);

    Klass update(@NotNull Long id, Klass klass);
}
