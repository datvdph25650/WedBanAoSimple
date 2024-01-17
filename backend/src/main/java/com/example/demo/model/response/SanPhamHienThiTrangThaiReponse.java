package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SanPhamHienThiTrangThaiReponse {
    @Value("#{target.id_san_pham}")
    String getIdSanPham();

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIdSanPhamChiTiet();

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

    @Value("#{target.trang_thai}")
    String getTrangThai();

    @Value("#{target.da_xoa}")
    Boolean getDaXoa();
}
