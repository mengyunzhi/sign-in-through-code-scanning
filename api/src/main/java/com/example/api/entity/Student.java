package com.example.api.entity;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("学生ID")
    private Long id;

    @ApiModelProperty("对应用户")
    @OneToOne
    private User user;

    @ApiModelProperty("对应班级")
    @ManyToOne
    private Klass klass;

    @ApiModelProperty("学号")
    private String sno;

    @ApiModelProperty("注册状态")
    @Column(nullable = false)
    private Boolean state = false;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Klass getKlass() {
        return klass;
    }

    public void setKlass(Klass klass) {
        this.klass = klass;
    }

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }
}
