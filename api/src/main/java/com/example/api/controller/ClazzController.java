package com.example.api.controller;

import com.example.api.entity.Clazz;
import com.example.api.service.ClazzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("clazz")
public class ClazzController {
    private final ClazzService clazzService;

    @Autowired
    public ClazzController(ClazzService clazzService) {
        this.clazzService = clazzService;
    }

    @GetMapping("page")
    private Page page(@RequestParam(required = false) String searchName,
                      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.clazzService.findAll(searchName, pageable);
    }

    /**
     * 添加班级
     */
    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Clazz save(@RequestBody Clazz clazz) {
        return this.clazzService.save(clazz.getName(),
                clazz.getEntrance_date(),
                clazz.getLength());
    }

    /**
     * 删除班级
     */
    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.clazzService.deleteById(id);
    }


    /**
     * 名称唯一验证班级
     */
    @GetMapping("clazzNameUnique")
    public String clazzNameUnique(@RequestParam Long clazz_id, @RequestParam String name) {
        return this.clazzService.clazzNameUnique(clazz_id, name);

    }

    /**
     * 通过id获取班级
     */
    @GetMapping("getById/{id}")
    public Clazz getById(@PathVariable Long id) {
        return this.clazzService.findById(id);
    }

    /**
     * 更新班级
     */
    @PostMapping("update/{id}")
    public Clazz update(@PathVariable Long id, @RequestBody Clazz clazz) {
        return this.clazzService.update(id, clazz);
    }

    /**
     * 班级选择组件请求数据
     */
    @GetMapping("getAll")
    public List<Clazz> getAll() {
        return this.clazzService.getAll();
    }
}
