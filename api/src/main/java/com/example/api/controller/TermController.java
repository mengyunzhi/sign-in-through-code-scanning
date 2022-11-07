package com.example.api.controller;

import com.example.api.entity.Room;
import com.example.api.entity.Term;
import com.example.api.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
