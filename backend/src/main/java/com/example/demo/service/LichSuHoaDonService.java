package com.example.demo.service;

import com.example.demo.entity.LichSuHoaDon;

import java.util.List;
import java.util.UUID;

public interface LichSuHoaDonService {
    List<LichSuHoaDon> getAll();

    List<LichSuHoaDon> getAllid(UUID id);

    LichSuHoaDon add(LichSuHoaDon lichSuHoaDon);

    LichSuHoaDon update(LichSuHoaDon lichSuHoaDon, UUID id);

    LichSuHoaDon dettail(UUID id);
}
