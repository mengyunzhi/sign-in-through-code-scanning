package com.example.api.entity.forType.forTaskStudentAdd;

import com.example.api.entity.Clazz;
import com.example.api.entity.Student;

import java.util.ArrayList;
import java.util.List;

public class ForTaskStudentAdd {

    private List<Clazz> clazzes = new ArrayList<>();

    private List<Student> students = new ArrayList<>();

    private List<Long> studentIds = new ArrayList<>();

    public List<Long> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(List<Long> studentIds) {
        this.studentIds = studentIds;
    }

    public List<Clazz> getClazzes() {
        return clazzes;
    }

    public void setClazzes(List<Clazz> clazzes) {
        this.clazzes = clazzes;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
