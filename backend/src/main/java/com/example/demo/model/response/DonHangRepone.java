package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface DonHangRepone {
    @Value("#{target.id}")
    String getID();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ngay_dat_hang}")
    String getNgayDatHang();

    @Value("#{target.ten_khach_hang}")
    String getTenKhachHang();

    @Value("#{target.loai_hoa_don}")
    String getLoaiHoaDon();

    @Value("#{target.tong_tien}")
    String getTongTien();

    @Value("#{target.trang_thai}")
    String getTrangThai();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();

    @Value("#{target.dia_chi}")
    String getDiaChi();
}