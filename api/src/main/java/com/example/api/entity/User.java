package com.example.api.entity;

import com.example.api.config.StaticVariable;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class User {

    @Id
    @ApiModelProperty("用户ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ApiModelProperty("手机号")
    @Column(nullable = false)
    public String number = "";

    @ApiModelProperty("密码")
    @Column(nullable = false)
    public String password = "";

    @ApiModelProperty("用户姓名")
    @Column(nullable = false)
    public String name = "";

    @ApiModelProperty("角色")
    @Column(nullable = false)
    public Short role = StaticVariable.ROLE_STUDENT;

    @ApiModelProperty("性别")
    @Column(nullable = false)
    public Short sex = StaticVariable.MALE;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
