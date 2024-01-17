package com.example.demo.service.Impl;

import com.example.demo.entity.DiaChi;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DiaChiServiceImpl implements DiaChiService {

    @Autowired
    private DiaChiRepository diaChiRepository;
    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public List<DiaChi> detailDiaChi(UUID id) {
        return diaChiRepository.detail(id);
    }

    @Override
    public DiaChi add(DiaChi diaChi, UUID id) {
        DiaChi diaChiSave = DiaChi.builder()
                .khachHang(khachHangRepository.findById(id).orElse(null))
                .diaChiMacDinh(diaChi.getDiaChiMacDinh())
                .diaChiCuThe(diaChi.getDiaChiCuThe())
                .tinhThanhPho(diaChi.getTinhThanhPho())
                .tenKhachHang(diaChi.getTenKhachHang())
                .soDienThoai(diaChi.getSoDienThoai())
                .quanHuyen(diaChi.getQuanHuyen())
                .phuongXa(diaChi.getPhuongXa())
                .ngayTao(diaChi.getNgayTao())
                .nguoiTao("Hưng")
                .daXoa(diaChi.getDaXoa())
                .build();
        return diaChiRepository.save(diaChiSave);
    }

    @Override
    public DiaChi update(DiaChi diaChi, UUID id) {
        Optional<DiaChi> optionalDiaChi = diaChiRepository.findById(id);
        if (optionalDiaChi.isPresent()) {
            optionalDiaChi.map(diaChiUpdate -> {
                diaChiUpdate.setDiaChiMacDinh(diaChi.getDiaChiMacDinh());
                diaChiUpdate.setDiaChiCuThe(diaChi.getDiaChiCuThe());
                diaChiUpdate.setTenKhachHang(diaChi.getTenKhachHang());
                diaChiUpdate.setSoDienThoai(diaChi.getSoDienThoai());
                diaChiUpdate.setTinhThanhPho(diaChi.getTinhThanhPho());
                diaChiUpdate.setQuanHuyen(diaChi.getQuanHuyen());
                diaChiUpdate.setPhuongXa(diaChi.getPhuongXa());
                return diaChiRepository.save(diaChiUpdate);
            }).orElse(null);
        }
        return null;
    }

    @Override
    public DiaChi updateMacDinh(DiaChi diaChi, UUID id) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        if (optional.isPresent()) {
            optional.map(diaChiUpdate -> {
                diaChiUpdate.setDiaChiMacDinh(false);

                return diaChiRepository.save(diaChiUpdate);
            }).orElse(null);
        }
        return null;
    }
}
