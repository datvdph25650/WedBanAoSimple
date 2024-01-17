package com.example.demo.service;

import com.example.demo.entity.DiaChi;

import java.util.List;
import java.util.UUID;

public interface DiaChiService {

    List<DiaChi> detailDiaChi(UUID id);

    DiaChi add(DiaChi diaChi, UUID id);

    DiaChi update(DiaChi diaChi, UUID id);

    DiaChi updateMacDinh(DiaChi diaChi, UUID id);


}
