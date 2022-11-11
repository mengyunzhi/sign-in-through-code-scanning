package com.example.api.service;

import com.example.api.entity.Term;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TermService {
    Term save(@NotNull String name, @NotNull Long startTime, @NotNull Long endTime, @NotNull Long state);

    Page findAll(String searchName, @NotNull Pageable pageable);

    void deleteById(@NotNull Long id);

    Term findById(@NotNull Long id);

    Term update(@NotNull Long id, Term term);

    void activate(@NotNull Long id);
}
