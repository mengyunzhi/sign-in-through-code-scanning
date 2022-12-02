package com.example.api.service;

import com.example.api.entity.Dispatch;
import com.sun.istack.NotNull;

import java.util.List;

public interface DispatchService {

    List<Dispatch> getAll();

    void deleteById(@NotNull Long id);

    List<Dispatch> getDispatchesInTerm(Long termId);
}
