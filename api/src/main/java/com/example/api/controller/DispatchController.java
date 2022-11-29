package com.example.api.controller;


import com.example.api.entity.Dispatch;
import com.example.api.service.DispatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
