package com.example.api.respositoty;

import com.example.api.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

/**
 * 用户仓库
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor {
    Optional<User> findByNumber(String number);
}
