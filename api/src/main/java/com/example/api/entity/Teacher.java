package com.example.api.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
public class Teacher {
    @Id
    @ApiModelProperty("教师ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(IdJsonView.class)
    private Long id;

    @ApiModelProperty("用户")
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonView(UserJsonView.class)
    private User user = new User();

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public interface UserJsonView {}

    public interface IdJsonView {}
}
