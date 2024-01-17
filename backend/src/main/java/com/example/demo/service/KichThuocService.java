package com.example.demo.service;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.SanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface KichThuocService {

    List<KichThuoc> getAll();

    Page<KichThuoc> getPage(Integer pageNo);

    List<KichThuoc> getAllByStatus();

    KichThuoc add(KichThuoc kichThuoc);

    KichThuoc update(KichThuoc kichThuoc, UUID id);

    KichThuoc detail(UUID id);

    void delete(UUID id);
}
