package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface GioHangChiTietReponse {

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIdSanPhamChiTiet();


    @Value("#{target.don_gia_sp}")
    String getDonGiaSp();

    @Value("#{target.id_gio_hang}")
    String getIdGioHang();

    @Value("#{target.id_gio_hang_chi_tiet}")
    String getIdGioHangChiTiet();

    @Value("#{target.id_khach_hang}")
    String getIdKhachHang();


    @Value("#{target.hinh_anh}")
    String getDuongDan();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.ten_kich_thuoc}")
    String getTenKichThuoc();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.ten_chat_lieu}")
    String getTenChatLieu();

    @Value("#{target.ten_phong_cach}")
    String getTenPhongCach();

    @Value("#{target.ten_hoa_tiet}")
    String getTenHoaTiet();

    @Value("#{target.ten_tay_ao}")
    String getTenTayAo();

    @Value("#{target.ten_co_ao}")
    String getTenCoAo();
    @Value("#{target.so_luong_sp}")
    String getSoLuongSp();



}
