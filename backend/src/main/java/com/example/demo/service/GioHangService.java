package com.example.demo.service;

import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.GioHangThemNhieuRequset;
import com.example.demo.model.request.GioHangRequset;
import com.example.demo.model.response.GioHangChiTietReponse;
import com.example.demo.model.response.GioHangReponse;

import java.util.List;
import java.util.UUID;

public interface GioHangService {
    void GioHang(UUID sanPhamChiTietId, UUID khachHangId,Integer soLuong);
    void GioHangThemNhieu(List<UUID> sanPhamChiTietId, UUID khachHangId,Integer soLuong);
    void GioHangK(UUID sanPhamChiTietId,Integer soLuong);
    void Xoa(UUID gioHangId);
    void deleteByKH(UUID id);
    KhachHang getKhachHangById(UUID id);
    List<GioHangChiTietReponse> getAll(UUID id);
    List<GioHangReponse> getAllK();
    void delete(UUID id);
    void update(GioHangRequset gioHangRequset);
//    void updateNoLogin(GioHangThemNhieuRequset gioHangThemNhieuRequset);
}
