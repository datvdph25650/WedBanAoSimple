package com.example.demo.service;

import com.example.demo.entity.HoaTiet;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface HoaTietService {

    List<HoaTiet> getAll();

    Page<HoaTiet> getPage(Integer pageNo);

    List<HoaTiet> getAllByStatus();

    HoaTiet add(HoaTiet hoaTiet);

    HoaTiet update(HoaTiet hoaTiet, UUID id);

    HoaTiet detail(UUID id);

    void delete(UUID id);
}
