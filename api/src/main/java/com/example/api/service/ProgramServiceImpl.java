package com.example.api.service;

import com.example.api.entity.Course;
import com.example.api.entity.Program;
import com.example.api.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.Objects;

@Service
public class ProgramServiceImpl implements ProgramService {

    private ProgramRepository programRepository;

    @Autowired
    public ProgramServiceImpl(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    @Override
    public Program save(String name, Long courseId, Long lesson) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(courseId, "courseId不能为null");
        Assert.notNull(lesson, "lesson不能为null");
        Program program = new Program();
        program.setName(name);
        program.getCourse().setId(courseId);
        program.setLesson(lesson);
        return this.programRepository.save(program);
    }

    @Override
    public Program getById(Long id) {
        return this.programRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("相关program未找到"));
    }

    @Override
    public Program update(Long id, Program program) {
        Assert.notNull(id, "id不能为null");
        Assert.notNull(program.getName(), "name不能为null");
        Assert.notNull(program.getLesson(), "lesson不能为null");
        Program oldProgram = this.getById(id);
        oldProgram.setName(program.getName());
        oldProgram.setLesson(program.getLesson());
        return this.programRepository.save(oldProgram);
    }

    @Override
    public void deleteById(Long id) {
        Assert.notNull(id, "id不能为null");
        this.programRepository.deleteById(id);
    }

    @Override
    public String programNameUnique(Long programId, String name) {
        Assert.notNull(name, "name不能为null");
        Program program = this.programRepository.findByName(name);
        if (program != null && !Objects.equals(program.getId(), programId)) {
            return "项目名已存在";
        }
        return null;
    }
}
