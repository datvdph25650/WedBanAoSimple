package com.example.demo.service;

import com.example.demo.entity.MaGiamGia;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface MaGiamGiaService {

    Page<MaGiamGia> getAll(Integer pageNo);

    Page<MaGiamGia> getAllByStatus(Integer pageNo);

    MaGiamGia add(MaGiamGia maGiamGia) throws Exception;

    MaGiamGia update(MaGiamGia maGiamGia, UUID id);

    MaGiamGia updateSoLuong(MaGiamGia maGiamGia, UUID id);

    MaGiamGia detail(UUID id);

    void delete(UUID id);

    Page<MaGiamGia> locMaGiamGia(Integer pageNo, Integer trangThai, Integer hinhThuc);

    Page<MaGiamGia> searchMaGiamGia(Integer pageNo, String keyWord);

}
