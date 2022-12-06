package com.example.api.service;

import com.example.api.config.StaticVariable;
import com.example.api.entity.Student;
import com.example.api.entity.Term;
import com.example.api.entity.User;
import com.example.api.repository.StudentRepository;
import com.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    
    private StudentRepository studentRepository;


    public UserServiceImpl(UserRepository userRepository,
                           StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public User save(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User getById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("未找到相关用户"));
    }

    @Override
    public User login(String number, String password) {
        User user = this.userRepository.findByNumber(number).get();

        if (Objects.equals(user.getRole(), StaticVariable.ROLE_STUDENT)) {
            Student student = this.studentRepository.findByUserId(user.getId());
            if (Objects.equals(student.getState(), StaticVariable.STATE_FALSE)) {
                 user.setName("error");
                 user.setNumber("学生尚未注册");
                 return user;
            }
        }

        if (this.validatePassword(user, password)) {
            return user;
        } else {
            User errorUser = new User();
            errorUser.setName("error");
            return errorUser;
        }
    }

    @Override
    public boolean validatePassword(User user, String password) {
        if (user == null || user.getPassword() == null || password == null) {
            return false;
        }

        return user.getPassword().equals(password);
    }

    @Override
    public void deleteById(Long id) {
        Assert.notNull(id, "id不能为null");
        this.userRepository.deleteById(id);
    }

    @Override
    public void updatePassword(Long userId, String password) {
        Assert.notNull(userId, "userId不能为null");
        Assert.notNull(password, "password不能为null");
        User user = this.getById(userId);
        user.setPassword(password);
        this.userRepository.save(user);
    }
    
    public User getCurrentLoginUser(String userNumber) {
        return this.userRepository.findByNumber(userNumber).get();
    }

    @Override
    public User userUpdate(User user) {
        User oldUser = this.userRepository.findById(user.getId()).get();
        return this.updateFields(user, oldUser);
    }

    @Override
    public String numberUnique(Long id, String number) {
        List<User> users = new ArrayList<>();
        users = (List<User>) this.userRepository.findAll();
        for (User user : users) {
            if (Objects.equals(user.number, number) && !Objects.equals(user.id, id)) {
                return "手机号已存在";
            }
        }
        return null;
    }

    @Override
    public Student studentRegister(String sno, String password, String number) {
        Student student = this.studentRepository.findBySno(sno);
        if (!Objects.equals(password, student.getUser().getPassword())) {
            return new Student();
        }
        student.setState(StaticVariable.STATE_TRUE);
        student.getUser().setNumber(number);
        return this.studentRepository.save(student);
    }

    @Override
    public Boolean isPasswordRight(String number, String password) {
        User user = this.getCurrentLoginUser(number);
        return Objects.equals(user.getPassword(), password);
    }

    private User updateFields(User user, User oldUser) {
        oldUser.setName(user.getName());
        oldUser.setNumber(user.getNumber());
        oldUser.setSex(user.getSex());
        if (!Objects.equals(user.getPassword(), "")) {
            oldUser.setPassword(user.getPassword());
        }
        return this.userRepository.save(oldUser);
    }

}
