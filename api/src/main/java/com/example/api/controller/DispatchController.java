package com.example.api.controller;


import com.example.api.entity.Dispatch;
import com.example.api.service.DispatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("dispatch")
public class DispatchController {
    DispatchService dispatchService;

    @Autowired
    public DispatchController(DispatchService dispatchService) {
        this.dispatchService = dispatchService;
    }

    @GetMapping("getAll")
    public List<Dispatch> getAll() {
        return this.dispatchService.getAll();
    }

    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.dispatchService.deleteById(id);
    }

}
