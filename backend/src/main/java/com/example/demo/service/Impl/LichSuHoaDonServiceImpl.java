package com.example.demo.service.Impl;

import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.repository.LichSuHoaDonRepository;
import com.example.demo.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LichSuHoaDonServiceImpl implements LichSuHoaDonService {

    @Autowired
    private LichSuHoaDonRepository lichSuHoaDonRepository;

    @Override
    public List<LichSuHoaDon> getAll() {
        return lichSuHoaDonRepository.findAll();
    }

    @Override
    public List<LichSuHoaDon> getAllid(UUID id) {
        return lichSuHoaDonRepository.getListLichSuHoaDon(id);
    }

    @Override
    public LichSuHoaDon add(LichSuHoaDon lichSuHoaDon) {
        return lichSuHoaDonRepository.save(lichSuHoaDon);
    }

    @Override
    public LichSuHoaDon update(LichSuHoaDon lichSuHoaDon, UUID id) {
        return lichSuHoaDonRepository.save(lichSuHoaDon);
    }

    @Override
    public LichSuHoaDon dettail(UUID id) {
        return lichSuHoaDonRepository.findById(id).orElse(null);
    }
}
