package com.example.api.controller;

import com.example.api.entity.Term;
import com.example.api.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("term")
public class TermController {
    private final TermService termService;

    @Autowired
    public TermController(TermService termService) {
        this.termService = termService;
    }
    @GetMapping("page")
    private Page page(@RequestParam(required = false) String searchName,
                      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.termService.findAll(searchName, pageable);
    }


    /**
     * 添加学期
     */
    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Term save(@RequestBody Term term) {
        return this.termService.save(term.getName(),
                                     term.getStartTime(),
                                     term.getEndTime(),
                                     term.getState());
    }

    /**
     * 删除学期
     */
    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.termService.deleteById(id);
    }


    /**
     * 通过id获取学期
     */
    @GetMapping("getById/{id}")
    public Term getById(@PathVariable Long id) {
        return this.termService.findById(id);
    }

    /**
     * 更新学期
     */
    @PostMapping("update/{id}")
    public Term update(@PathVariable Long id, @RequestBody Term term) {
        return this.termService.update(id, term);
    }

    /**
     * 激活学期
     */
    @PostMapping("activate")
    public void activate(@RequestBody Long id) {
        this.termService.activate(id);
    }

    /**
     * 名称唯一验证学期
     */
    @GetMapping("termNameUnique")
    public String termNameUnique(@RequestParam Long id, @RequestParam String name) {
        return this.termService.termNameUnique(id, name);
    }
}
