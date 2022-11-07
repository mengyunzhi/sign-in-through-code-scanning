package com.example.api.service;

import com.example.api.entity.Term;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

public interface TermService {
    Term save(@NotNull String name, @NotNull Date startTime, @NotNull Date endTime, @NotNull Long state);

    Page findAll(String searchName, @NotNull Pageable pageable);
}
