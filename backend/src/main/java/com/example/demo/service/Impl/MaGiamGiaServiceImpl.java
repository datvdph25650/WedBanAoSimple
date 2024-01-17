package com.example.demo.service.Impl;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.repository.MaGiamGiaRepository;
import com.example.demo.service.MaGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaGiamGiaServiceImpl implements MaGiamGiaService {

    @Autowired
    private MaGiamGiaRepository maGiamGiaRepository;


    @Override
    public Page<MaGiamGia> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        Page<MaGiamGia> p = maGiamGiaRepository.getAll(pageable);
        return getMaGiamGias(p);
    }

    @Override
    public Page<MaGiamGia> getAllByStatus(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return maGiamGiaRepository.getAllByStatus(pageable);
    }

    @Override
    public MaGiamGia add(MaGiamGia maGiamGia) {
        return maGiamGiaRepository.save(maGiamGia);

    }

    @Override
    public MaGiamGia update(MaGiamGia maGiamGia, UUID id) {
        Optional<MaGiamGia> optional = maGiamGiaRepository.findById(id);
        optional.map(maGiamGiaUpdate -> {
            maGiamGiaUpdate.setTenKM(maGiamGia.getTenKM());
            maGiamGiaUpdate.setHinhThucGiam(maGiamGia.getHinhThucGiam());
            maGiamGiaUpdate.setSoLuong(maGiamGia.getSoLuong());
            maGiamGiaUpdate.setGiaTriDonToiThieu(maGiamGia.getGiaTriDonToiThieu());
            maGiamGiaUpdate.setGiaTriGiam(maGiamGia.getGiaTriGiam());
            maGiamGiaUpdate.setNgayBatDau(maGiamGia.getNgayBatDau());
            maGiamGiaUpdate.setNgayKetThuc(maGiamGia.getNgayKetThuc());
            maGiamGiaUpdate.setNgaySua(maGiamGia.getNgaySua());
            maGiamGiaUpdate.setNguoiSua(maGiamGia.getNguoiSua());
            return maGiamGiaRepository.save(maGiamGiaUpdate);
        }).orElse(null);
        return null;
    }

    @Override
    public MaGiamGia updateSoLuong(MaGiamGia maGiamGia, UUID id) {
        Optional<MaGiamGia> optional = maGiamGiaRepository.findById(id);
        optional.map(maGiamGiaUpdate -> {
            Integer soLuongNew = optional.get().getSoLuong() - maGiamGia.getSoLuong();
            maGiamGiaUpdate.setSoLuong(soLuongNew);
            if (soLuongNew == 0) {
                maGiamGiaUpdate.setTrangThai(3);
            }
            return maGiamGiaRepository.save(maGiamGiaUpdate);
        }).orElse(null);

        return null;
    }

    @Override
    public MaGiamGia detail(UUID id) {
        MaGiamGia m = maGiamGiaRepository.findById(id).orElse(null);
        return m;
    }

    @Override
    public void delete(UUID id) {
        maGiamGiaRepository.deleteById(id);
    }

    private Page<MaGiamGia> getMaGiamGias(Page<MaGiamGia> maGiamGias) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        maGiamGias.forEach(maGiamGia -> {
            if (maGiamGia.getNgayBatDau().compareTo(timestamp) < 0) {
                if (maGiamGia.getNgayKetThuc().compareTo(timestamp) < 0) {
                    if (maGiamGia.getTrangThai() != 3) {
                        maGiamGia.setTrangThai(3);
                        maGiamGiaRepository.save(maGiamGia);
                    }
                } else {
                    if (maGiamGia.getTrangThai() != 2) {
                        maGiamGia.setTrangThai(2);
                        maGiamGiaRepository.save(maGiamGia);
                    }
                }
            }
        });
        return maGiamGias;
    }

    @Override
    public Page<MaGiamGia> locMaGiamGia(Integer pageNo, Integer trangThai, Integer hinhThuc) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        Page<MaGiamGia> p = maGiamGiaRepository.locMaGiamGia(pageable, trangThai, hinhThuc);
        return getMaGiamGias(p);
    }


    @Override
    public Page<MaGiamGia> searchMaGiamGia(Integer pageNo, String keyWord) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        Page<MaGiamGia> p = maGiamGiaRepository.searchMaGiamGia(pageable, keyWord);
        return getMaGiamGias(p);
    }


}
