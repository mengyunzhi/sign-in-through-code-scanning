package com.example.api.service;

import com.example.api.entity.User;
import com.sun.istack.NotNull;

public interface UserService {
    User save(@NotNull User user);

    User getById(@NotNull Long id);

    User login(String number, String password);

    boolean validatePassword(User user, String password);

    void deleteById(@NotNull Long id);

    void updatePassword(@NotNull Long userId, @NotNull String password);
    
    User getCurrentLoginUser(String userNumber);

    User userUpdate(User user);

    String numberUnique(@NotNull Long id, String number);
}
