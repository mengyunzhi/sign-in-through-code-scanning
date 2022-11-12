package com.example.api.service;

import com.example.api.entity.Term;
import com.example.api.repository.TermRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
        this.termRepository.save(term);
        Term thisTerm = this.termRepository.findByName(name);
        if (thisTerm.getState() == 1) {
            this.activate(thisTerm.getId());
        }
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
        if (term.getState() == 1) {
            this.activate(id);
        }
        return this.updateFields(term, oldTerm);
    }

    @Override
    public void activate(Long id) {
        Term term = this.termRepository.findById(id).get();
        if (term.getState() != 1) {
            term.setState(1L);
        }
        List<Term> terms = (List<Term>) this.termRepository.findAll();
        for (int i = 0; i < terms.size(); i++) {
            if (terms.get(i).getId() != id) {
                terms.get(i).setState(0L);
                this.termRepository.save(terms.get(i));
            }
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

    public String termNameUnique(Long term_id, String name) {
        Term term = this.termRepository.findByName(name);
        if (term != null && !Objects.equals(term.getId(), term_id)) {
            return "名称已存在";
        }
        return "名称合理";
    }
}
