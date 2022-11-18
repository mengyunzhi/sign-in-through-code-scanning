package com.example.api.service;

import com.example.api.entity.Room;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface RoomService {
    Room save(@NotNull String name, @NotNull Long capacity);

    Page findAll(String searchName, String searchCapacity, @NotNull Pageable pageable);

    void deleteById(@NotNull Long id);

    Room getById(@NotNull Long id);

    Room updateFields(@NotNull Room newRoom, @NotNull Room oldRoom);

    String roomNameUnique(Long roomId, String name);
}
