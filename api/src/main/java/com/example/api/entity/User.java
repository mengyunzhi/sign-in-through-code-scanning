package com.example.api.entity;

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
    private Long id;

    @ApiModelProperty("手机号")
    @Column(nullable = false)
    private String number = "";

    @ApiModelProperty("密码")
    @Column(nullable = false)
    private String password = "";

    @ApiModelProperty("用户姓名")
    @Column(nullable = false)
    private String name = "";

    @ApiModelProperty("角色")
    @Column(nullable = false)
    private Short role = User.ROLE_STUDENT;

    @ApiModelProperty("性别")
    @Column(nullable = false)
    private Short sex = User.MALE;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
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
}
