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

    String termNameUnique(Long term_id, String name);

    /**
     * 获取当前学期，即已激活学期
     */
    Term getCurrentTerm();
}
