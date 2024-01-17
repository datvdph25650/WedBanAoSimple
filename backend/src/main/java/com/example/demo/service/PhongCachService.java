package com.example.demo.service;

import com.example.demo.entity.PhongCach;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface PhongCachService {

    List<PhongCach> getAll();

    Page<PhongCach> getPage(Integer pageNo);

    List<PhongCach> getAllByStatus();

    PhongCach getOne(UUID id);

    PhongCach add(PhongCach phongCach);

    PhongCach update(PhongCach phongCach, UUID id);

    void delete(UUID id);
}
