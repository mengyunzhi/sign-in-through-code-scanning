package com.example.api.repository;

import com.example.api.entity.Room;
import com.example.api.entity.Term;
import com.example.api.repository.specs.TermSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TermRepository  extends PagingAndSortingRepository<Term, Long>, JpaSpecificationExecutor {
    default Page findAll(String searchName,Pageable pageable) {
        Specification<Term> specification = TermSpecs.containName(searchName);
        return this.findAll(specification, pageable);
    };
}
