package com.example.api.repository;

import com.example.api.entity.Program;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProgramRepository extends PagingAndSortingRepository<Program, Long>, JpaSpecificationExecutor {

}
