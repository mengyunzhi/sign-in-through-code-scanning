package com.example.api.controller;

import com.example.api.entity.Program;
import com.example.api.entity.forType.forProgram.ProgramAdd;
import com.example.api.service.ProgramService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("program")
public class ProgramController {
    private ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @PostMapping("add")
    public Program save(@RequestBody ProgramAdd programAdd) {
        return this.programService.save(programAdd.name, programAdd.courseId, programAdd.lesson);
    }

    @GetMapping("getById/{id}")
    @JsonView(getByIdJsonView.class)
    public Program getById(@PathVariable Long id) {
        return this.programService.getById(id);
    }

    @PostMapping("update/{id}")
    @JsonView(updateJsonView.class)
    public Program update(@PathVariable Long id,
                          @RequestBody Program program) {
        return this.programService.update(id, program);
    }

    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable Long id) {
        this.programService.deleteById(id);
    }

    @GetMapping("programNameUnique")
    public String programNameUnique(@RequestParam String name,
                                   @RequestParam(required = false) Long programId) {
        String msg = this.programService.programNameUnique(programId, name);
        if (msg != null) {
            return msg;
        } else {
            return null;
        }
    }
    public interface getByIdJsonView extends Program.NameJsonView, Program.LessonJsonView {}
    public interface updateJsonView extends Program.NameJsonView, Program.LessonJsonView {}

}
