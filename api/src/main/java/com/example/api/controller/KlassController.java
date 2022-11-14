package com.example.api.controller;

import com.example.api.entity.Klass;
import com.example.api.entity.Term;
import com.example.api.service.KlassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("clazz")
public class KlassController {
    private final KlassService klassService;

    @Autowired
    public KlassController(KlassService klassService) {
        this.klassService = klassService;
    }

    @GetMapping("page")
    private Page page(@RequestParam(required = false) String searchName,
                      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return  this.klassService.findAll(searchName, pageable);
    }

    /**
     * 添加班级
     */
    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Klass save(@RequestBody Klass klass) {
        return this.klassService.save(klass.getName(),
                klass.getEntrance_date(),
                klass.getLength());
    }

    /**
     * 删除班级
     */
    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.klassService.deleteById(id);
    }


    /**
     * 名称唯一验证班级
     */
    @GetMapping("clazzNameUnique")
    public String clazzNameUnique(@RequestParam Long clazz_id, @RequestParam String name) {
        return this.klassService.clazzNameUnique(clazz_id, name);

    }

    /**
     * 通过id获取班级
     */
    @GetMapping("getById/{id}")
    public Klass getById(@PathVariable Long id) {
        return this.klassService.findById(id);
    }

    /**
     * 更新班级
     */
    @PostMapping("update/{id}")
    public Klass update(@PathVariable Long id, @RequestBody Klass klass) {
        return this.klassService.update(id, klass);
    }
}
