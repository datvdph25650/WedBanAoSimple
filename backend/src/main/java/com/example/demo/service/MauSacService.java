package com.example.demo.service;

import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface MauSacService {

    List<MauSac> getAll();

    Page<MauSac> getPage(Integer pageNo);

    List<MauSac> getAllByStatus();

    MauSac getOne(UUID id);

    MauSac add(MauSac mauSac);

    MauSac update(MauSac mauSac, UUID id);

    void delete(UUID id);
}
