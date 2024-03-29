package com.example.api.repository;

import com.example.api.entity.Clazz;
import com.example.api.repository.specs.ClazzSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ClazzRepository extends PagingAndSortingRepository<Clazz, Long>, JpaSpecificationExecutor {
    default Page findAll(String searchName,Pageable pageable) {
        Specification<Clazz> specification = ClazzSpecs.containName(searchName);
        return this.findAll(specification, pageable);
    };

    Clazz findByName(String name);

    List<Clazz> findAll();
}
