package com.example.demo.service;

import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.model.request.MaGiamGiaChiTietRequest;
import com.example.demo.model.response.MaGiamGiaReponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface MaGiamGiaChiTietService {

    Page<MaGiamGiaChiTiet> getPage(Integer pageNo, UUID id);

    MaGiamGiaChiTiet add(MaGiamGiaChiTietRequest maGiamGiaChiTietRequest);

    MaGiamGiaChiTiet update(MaGiamGiaChiTiet maGiamGiaChiTiet, UUID id);

    MaGiamGiaChiTiet detail(UUID hoaDonId);

    List<MaGiamGiaReponse> getidHd(UUID id);




}
