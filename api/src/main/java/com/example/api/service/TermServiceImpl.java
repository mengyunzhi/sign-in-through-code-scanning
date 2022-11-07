package com.example.api.service;

import com.example.api.entity.Term;
import com.example.api.repository.TermRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Date;

@Service
public class TermServiceImpl implements TermService{
    private final TermRepository termRepository;

    @Autowired
    public TermServiceImpl(TermRepository termRepository) {
        this.termRepository = termRepository;
    }

    @Override
    public Page findAll(String searchName, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        return this.termRepository.findAll(searchName, pageable);
    }

    @Override
    public Term save(@NotNull String name, @NotNull Date start_time, @NotNull Date end_time, @NotNull Long state) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(start_time, "startTime不能为null");
        Assert.notNull(end_time, "endTime不能为null");
        Assert.notNull(state, "state不能为null");
        Term term = new Term();
        term.setName(name);
        term.setStartTime(start_time);
        term.setEndTime(end_time);
        term.setState(state);
        return this.termRepository.save(term);
    }
}
