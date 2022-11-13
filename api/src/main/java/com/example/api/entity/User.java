package com.example.api.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class User {
    static Short ROLE_ADMIN = 0;
    static Short ROLE_TEACHER = 1;
    static Short ROLE_STUDENT = 2;

    static Short MALE = 0;
    static Short FEMALE = 1;


    @Id
    @ApiModelProperty("用户ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(IdJsonView.class)
    public Long id;

    @ApiModelProperty("手机号")
    @Column(nullable = false)
    @JsonView(NumberJsonView.class)
    public String number = "";

    @ApiModelProperty("密码")
    @Column(nullable = false)
    public String password = "";

    @ApiModelProperty("用户姓名")
    @Column(nullable = false)
    @JsonView(NameJsonView.class)
    public String name = "";

    @ApiModelProperty("角色")
    @Column(nullable = false)
    @JsonView(RoleJsonView.class)
    public Short role = User.ROLE_STUDENT;

    @ApiModelProperty("性别")
    @Column(nullable = false)
    @JsonView(SexJsonView.class)
    public Short sex = User.MALE;

    @OneToOne(mappedBy = "user")
    @JsonView(TeacherJsonView.class)
    public Teacher teacher;


    public String getNumber() {
        return number;
    }
    public Teacher getTeacher() {
        return this.teacher;
    }

    public void setNumber(String number) {
        this.number = number;
    }
    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Short getRole() {
        return role;
    }

    public void setRole(Short role) {
        this.role = role;
    }

    public Short getSex() {
        return sex;
    }

    public void setSex(Short sex) {
        this.sex = sex;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public interface NumberJsonView { }
    public interface TeacherJsonView { }
    public interface SexJsonView { }
    public interface NameJsonView { }
    public interface RoleJsonView { }
    public interface IdJsonView {
    }
}
