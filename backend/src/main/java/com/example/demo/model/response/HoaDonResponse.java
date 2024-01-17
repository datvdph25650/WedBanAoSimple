package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface HoaDonResponse {

    @Value("#{target.id}")
    String getID();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten_khach_hang}")
    String getTenKhachHang();

    @Value("#{target.so_dien_thoai_khach_hang}")
    String getSoDienThoai();

    @Value("#{target.loai_hoa_don}")
    String getLoaiHoaDon();

    @Value("#{target.tong_tien}")
    String getTongTien();

    @Value("#{target.ngay_tao}")
    Date getNgayTao();
//    @Value("#{target.phi_ship}")
//    String getPhiShip();

    @Value("#{target.trang_thai}")
    Integer getTrangThai();
}
