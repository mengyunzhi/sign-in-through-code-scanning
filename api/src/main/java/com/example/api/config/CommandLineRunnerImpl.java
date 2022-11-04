package com.example.api.config;

import com.example.api.entity.User;
import com.example.api.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserRepository userRepository;
    @Autowired
    public CommandLineRunnerImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if(!userRepository.findByNumber("yunzhi").isPresent()) {
            logger.info("进行初始化用户");
            User user = new User();
            //角色为系统管理员
            Short role = (short) 2;
            String password = "yunzhi";
            user.setNumber("admin");
            user.setPassword(password);
            user.setName("系统管理员");
            user.setRole(role);
            this.userRepository.save(user);
        } else {
            logger.info("已添加初始化用户");
        }
    }

}
