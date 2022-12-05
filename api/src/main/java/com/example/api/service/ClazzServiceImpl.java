package com.example.api.service;

import com.example.api.entity.Clazz;
import com.example.api.entity.Schedule;
import com.example.api.repository.ClazzRepository;
import com.example.api.repository.StudentRepository;
import com.example.api.repository.specs.StudentSpecs;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ClazzServiceImpl implements ClazzService {

    private final ClazzRepository clazzRepository;
    private final StudentRepository studentRepository;
    private final ScheduleService scheduleService;

    @Autowired
    public ClazzServiceImpl(ClazzRepository clazzRepository,
                            StudentRepository studentRepository,
                            @Lazy ScheduleService scheduleService) {
        this.clazzRepository = clazzRepository;
        this.studentRepository = studentRepository;
        this.scheduleService = scheduleService;
    }

    @Override
    public Clazz save(String name, Long entrance_date, Short length) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(entrance_date, "entrance_date不能为null");
        Assert.notNull(length, "length不能为null");
        Clazz clazz = new Clazz();
        clazz.setName(name);
        clazz.setEntrance_date(entrance_date);
        clazz.setLength(length);
        return this.clazzRepository.save(clazz);
    }

    @Override
    public Page findAll(String searchName, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        Page<Clazz> page = this.clazzRepository.findAll(searchName, pageable);
//        for (Clazz clazz:
//                page.getContent()) {
//            Long number_of_students = (long) this.studentRepository.findAll(StudentSpecs.belongToClazz(clazz.getId())).size();
//            clazz.setNumber_of_students(number_of_students);
//        }
        return page;
    }

    @Override
    public void deleteById(@NotNull Long id) {
        Assert.notNull(id, "id不能为null");
        this.clazzRepository.deleteById(id);
    }

    @Override
    public String clazzNameUnique(Long id, String name) {
        Clazz clazz = this.clazzRepository.findByName(name);
        if (clazz != null && !Objects.equals(clazz.getId(), id)) {
            return "名称已存在";
        }
        return "名称合理";
    }

    @Override
    public Clazz findById(Long id) {
        Assert.notNull(id, "id不能为null");
        return this.clazzRepository.findById(id).get();
    }

    @Override
    public Clazz update(Long id, Clazz clazz) {
        Clazz oldClazz = this.clazzRepository.findById(id).get();
        return this.updateFields(clazz, oldClazz);
    }

    /**
     * 班级选择组件请求数据
     */
    @Override
    public List<Clazz> getAll() {
        return (List<Clazz>) this.clazzRepository.findAll();
    }

    @Override
    public List<Long> clazzIdsHaveSelectCourse(Long courseId) {
        Assert.notNull(courseId, "courseId不能为null");
        List<Schedule> schedules = this.scheduleService.clazzesHaveSelectCourse(courseId);
        List<Long> clazzIds = this.getClazzIdsBySchedules(schedules);
        return clazzIds;
    }

    @Override
    public List<Clazz> getClazzesByCourseId(Long courseId) {
        Assert.notNull(courseId, "courseId不能为null");
        List<Schedule> schedules = this.scheduleService.clazzesHaveSelectCourse(courseId);
        List<Clazz> clazzes = this.getClazzesBySchedules(schedules);
        return clazzes;
    }

    private List<Clazz> getClazzesBySchedules(List<Schedule> schedules) {
        List<Clazz> clazzes = new ArrayList<>();
        schedules.forEach(schedule -> {
            schedule.getClazzes().forEach(clazz -> {
                if (!clazzes.contains(clazz)) {
                    clazzes.add(clazz);
                }
            });
        });
        return clazzes;
    }

    private List<Long> getClazzIdsBySchedules(List<Schedule> schedules) {
        List<Long> results = new ArrayList<>();
        for (Schedule schedule:
             schedules) {
            schedule.getClazzes().forEach(clazz -> {
                if (!results.contains(clazz.getId())) {
                    results.add(clazz.getId());
                }
            });
        }
        return results;
    }


    Clazz updateFields(Clazz newClazz, Clazz oldClazz) {
        oldClazz.setName(newClazz.getName());
        oldClazz.setEntrance_date(newClazz.getEntrance_date());
        oldClazz.setLength(newClazz.getLength());
        oldClazz.setNumber_of_students(newClazz.getNumber_of_students());
        return this.clazzRepository.save(oldClazz);
    }
}
