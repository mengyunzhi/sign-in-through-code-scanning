package com.example.api.entity.forType.forScheduleAdd;

import java.util.ArrayList;
import java.util.List;

public class SaveForScheduleAdd {
    private List<Long> clazzIds = new ArrayList<>();
    private Long courseId;
    private Long teacherId;
    private List<List<CourseTime>> courseTimes = new ArrayList<>();

    public List<Long> getClazzIds() {
        return clazzIds;
    }

    public void setClazzIds(List<Long> clazzIds) {
        this.clazzIds = clazzIds;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public List<List<CourseTime>> getCourseTimes() {
        return courseTimes;
    }

    public void setCourseTimes(List<List<CourseTime>> courseTimes) {
        this.courseTimes = courseTimes;
    }
}

