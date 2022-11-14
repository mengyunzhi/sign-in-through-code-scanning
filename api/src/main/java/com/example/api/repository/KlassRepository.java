package com.example.api.repository;

import com.example.api.entity.Klass;
import com.example.api.entity.Term;
import com.example.api.repository.specs.KlassSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface KlassRepository extends PagingAndSortingRepository<Klass, Long>, JpaSpecificationExecutor {
    default Page findAll(String searchName,Pageable pageable) {
        Specification<Klass> specification = KlassSpecs.containName(searchName);
        return this.findAll(specification, pageable);
    };

    Klass findByName(String name);
}
