package com.example.api.controller;

import com.example.api.entity.*;
import com.example.api.entity.forType.forScheduleEdit.ForScheduleEdit;
import com.example.api.entity.forType.ForRelateClazzToShedule;
import com.example.api.entity.forType.forScheduleAdd.ForScheduleAdd;
import com.example.api.entity.forType.forScheduleAdd.SaveForScheduleAdd;
import com.example.api.entity.forType.forScheduleEdit.EditIndex;
import com.example.api.entity.forType.forTaskStudentAdd.ForTaskStudentAdd;
import com.example.api.service.*;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("schedule")
public class ScheduleController {

    ScheduleService scheduleService;
    ClazzService clazzService;
    RoomService roomService;
    TermService termService;
    DispatchService dispatchService;
    @Autowired
    ScheduleController(ScheduleService scheduleService,
                       ClazzService clazzService,
                       RoomService roomService,
                       TermService termService,
                       DispatchService dispatchService) {
        this.scheduleService = scheduleService;
        this.clazzService = clazzService;
        this.roomService = roomService;
        this.termService = termService;
        this.dispatchService = dispatchService;
    }

    @GetMapping("getDataForScheduleAdd")
    public ForScheduleAdd ScheduleController(@RequestParam String userNumber) {
        return this.scheduleService.getForScheduleAdd(userNumber);
    }

    @PostMapping("scheduleSave")
    public void scheduleSave(@RequestBody SaveForScheduleAdd data) {
        this.scheduleService.scheduleSave(data);
    }

    @GetMapping("page")
    public Page page(@RequestParam(required = false) String courseName,
                     @RequestParam(required = false) String termName,
                     @RequestParam String userNumber,
                     @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.scheduleService.findAll(courseName, termName, userNumber, pageable);
    }

    /*
    * 教师端 =》 课程任务 =》 查看学生 =》 移除
    * */
    @GetMapping("deleteByStudentId")
    public Schedule deleteByStudentId(@RequestParam String studentId, @RequestParam String scheduleId) {
        return this.scheduleService.deleteByStudentId(studentId, scheduleId);
    }

    @GetMapping("getForAddByScheduleId/{scheduleId}")
    public ForTaskStudentAdd getForAddByScheduleId(@PathVariable Long scheduleId) {
        return this.scheduleService.getForAddByScheduleId(scheduleId);
    }

    @PostMapping("addStudentInCourse")
    public Schedule addStudentInCourse(@RequestParam Long studentId, @RequestParam Long scheduleId) {
        return this.scheduleService.addStudentInCourse(studentId, scheduleId);
    }

    @GetMapping("editIndex")
    public EditIndex getEditIndexByScheduleId(@RequestParam Long id) {
        return this.scheduleService.getEditIndexByScheduleId(id);
    }

    /**
     * 排课添加班级时跟当前排课时间有冲突的dispatch对应的scheduleId
     */
    @PostMapping("getClazzesByScheduleIds")
    @JsonView(getClazzesByScheduleIds.class)
    public List<Clazz> getClazzesByScheduleIds(@RequestBody List<Long> sheduleIds) {
        return this.scheduleService.getClazzesByScheduleIds(sheduleIds);
    }

    /**
     * 为排课添加班级关联
     */
    @PostMapping("relateClazzToSchedule")
    public void relateClazzToSchedule(@RequestBody ForRelateClazzToShedule scheduleIdAndClazzIds) {
        this.scheduleService
                .relateClazzToSchedule(scheduleIdAndClazzIds.scheduleId, scheduleIdAndClazzIds.clazzIds);
    }

    @PostMapping("removeClazzFromSchedule")
    public void removeClazzFromSchedule(@RequestBody List<Long> scheduleIdAndClazzId) {
        this.scheduleService
                .removeClazzFromSchedule(scheduleIdAndClazzId.get(0), scheduleIdAndClazzId.get(1));
    }

    /**
     * 获取schedule：
     * 1.项目添加调用
     * 2.
     */
    @GetMapping("getById/{id}")
    @JsonView(getByIdJsonView.class)
    public Schedule getById(@PathVariable Long id) {
        return this.scheduleService.getById(id);
    }

    @GetMapping("getDataForScheduleEdit/{scheduleId}")
    public ForScheduleEdit getDataForScheduleEdits(@PathVariable Long scheduleId) {
        Schedule schedule = this.scheduleService.getById(scheduleId);
        List<Dispatch> dispatches = this.dispatchService.getDispatchesInTerm(schedule.getTerm().getId());
        List<Room> rooms = this.roomService.getAll();

        return new ForScheduleEdit(schedule, dispatches, rooms);
    }

    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable Long id) {
        this.scheduleService.deleteById(id);
    }

    public interface getByIdJsonView extends
            Schedule.IdJsonView,
            Schedule.CourseJsonView,
            Course.IdJsonView {}

    public interface getClazzesByScheduleIds extends
            Clazz.IdJsonView,
            Clazz.NameJsonView {}

}
