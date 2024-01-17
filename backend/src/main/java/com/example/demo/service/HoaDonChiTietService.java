package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.model.request.HoaDonChiTietRequest;
import com.example.demo.model.response.HoaDonChiTietReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface HoaDonChiTietService {

    List<HoaDonChiTiet> getByMa( UUID hoaDonId);

    Page<HoaDonChiTietReponse> getGioHang(Integer pageNo, String ma);

    HoaDonChiTiet add(HoaDonChiTietRequest hoaDonChiTietRequest);

    HoaDonChiTiet update(HoaDonChiTietRequest hoaDonChiTietRequest, UUID id);

    Page<HoaDonChiTietReponse> detail(Integer pageNo, UUID id);

    HoaDonChiTiet delete(UUID id);

}
