package com.example.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"students"})
    @ManyToOne
    private Clazz clazz;

    @ApiModelProperty("学号")
    private String sno;

    @ApiModelProperty("注册状态")
    @Column(nullable = false)
    private Long state = 0L;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    public Long getState() {
        return state;
    }

    public void setState(Long state) {
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Clazz getClazz() {
        return clazz;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }
}
