package com.example.api.repository;

import com.example.api.entity.Student;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long>, JpaSpecificationExecutor {

    @Transactional
    void deleteByUserId(Long userId);

    Student findByUserId(Long userId);

    Student findBySno(String sno);

    List<Student> findStudentsBySno(String sno);

    List<Student> findByClazzId(Long clazzId);
    List<Student> findAll();
}
