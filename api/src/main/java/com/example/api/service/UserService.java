package com.example.api.service;

import com.example.api.entity.User;
import com.sun.istack.NotNull;

public interface UserService {
    User save(@NotNull User user);

}
