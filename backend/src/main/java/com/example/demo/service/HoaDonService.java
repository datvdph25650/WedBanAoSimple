package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.model.request.HoaDonOnlineRequest;
import com.example.demo.model.request.HoaDonRequest;
import com.example.demo.model.response.DonHangKhachHangReponse;
import com.example.demo.model.response.GioHangChiTietReponse;
import com.example.demo.model.response.HienThiHoaDonReponse;
import com.example.demo.model.response.HoaDonResponse;
import org.springframework.data.domain.Page;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface HoaDonService {

    Page<HoaDonResponse> getPage(Integer pageNo);

    List<HoaDon> getHoaDonCho();

    List<DonHangKhachHangReponse> getAll(UUID id);

    List<HienThiHoaDonReponse> getHienThi(UUID idKhachHang,UUID idHoaDon);

    List<DonHangKhachHangReponse> getSearch(String id,String trangThai);

    HoaDon add(HoaDon hoaDon);

    HoaDon addOnline(HoaDonOnlineRequest hoaDon);

    HoaDon update(HoaDonRequest hoaDonRequest, UUID id);

    HoaDon updateTongTien(Double tongTien, UUID id);

    HoaDon detail(UUID id);

    void updateTrangThaiDonHang(UUID khachHangId, UUID donHangId, Integer newTrangThai,String noiDung,String nguoiTao);

    Page<HoaDonResponse> search(Integer pageNo, String search);

    Page<HoaDonResponse> loc(Integer pageNo, String trangThai);

    void khongNhanHang(UUID id);

    List<HoaDon> getThongBao();

}
