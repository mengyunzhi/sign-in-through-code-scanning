package com.example.api.repository;

import com.example.api.entity.Teacher;
import com.example.api.entity.User;
import com.example.api.repository.specs.TeacherSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TeacherRepository extends PagingAndSortingRepository<Teacher, Long>, JpaSpecificationExecutor {
    default Page findAll(String name, String number, Pageable pageable) {
        Specification specification = TeacherSpecs.relateUserByName(name)
                .and(TeacherSpecs.relateUserByNumber(number));
        return this.findAll(specification, pageable);
    }

    Teacher findByUserId(Long user_id);

    @Transactional
    void deleteByUserId(Long userId);

    @Transactional
    Teacher findTeacherByUserNumber(String userNumber);
}
