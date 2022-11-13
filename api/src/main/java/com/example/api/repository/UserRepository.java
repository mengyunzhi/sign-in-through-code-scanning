package com.example.api.repository;

import com.example.api.entity.User;
import com.example.api.repository.specs.UserSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor {
    Optional<User> findByNumber(String number);

    default Page findAllTeacher(String name, String number, Pageable pageable) {
        // todo: 修改为静态变量
        Specification specification = UserSpecs.limitRole((short) 1)
                .and(UserSpecs.containName(name))
                .and(UserSpecs.containNumber(number));
        return this.findAll(specification, pageable);
    }
}
