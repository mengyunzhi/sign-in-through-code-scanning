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
    public Term save(@NotNull String name, @NotNull Long start_time, @NotNull Long end_time, @NotNull Long state) {
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

    @Override
    public void deleteById(@NotNull Long id) {
        Assert.notNull(id, "id不能为null");
        this.termRepository.deleteById(id);
    }

    @Override
    public Term findById(@NotNull Long id) {
        Assert.notNull(id, "id不能为null");
        return this.termRepository.findById(id).get();
    }

    @Override
    public Term update(Long id, Term term) {
        Term oldTerm = this.termRepository.findById(id).get();
        return this.updateFields(term, oldTerm);
    }

    @Override
    public void activate(Long id) {
        Term term = this.termRepository.findById(id).get();
        if (term.getState() == 1) {
            term.setState(0L);
        } else {
            term.setState(1L);
        }
        this.termRepository.save(term);
    }

    private Term updateFields(Term newTerm, Term oldTerm) {
        oldTerm.setName(newTerm.getName());
        oldTerm.setStartTime(newTerm.getStartTime());
        oldTerm.setEndTime(newTerm.getEndTime());
        oldTerm.setState(newTerm.getState());
        return this.termRepository.save(oldTerm);
    }
}
