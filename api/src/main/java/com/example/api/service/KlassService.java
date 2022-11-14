package com.example.api.service;

import com.example.api.entity.Klass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface KlassService {
    Klass save(String name, Long entrance_date, Short length);

    Page findAll(String searchName, Pageable pageable);

    void deleteById(Long id);

    String clazzNameUnique(Long id, String name);
}
