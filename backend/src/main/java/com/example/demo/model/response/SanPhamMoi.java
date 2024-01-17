package com.example.demo.model.response;


import org.springframework.beans.factory.annotation.Value;


public interface SanPhamMoi {

    @Value("#{target.id_san_pham}")
    String getIdSanPham();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

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

    @Value("#{target.hinh_anh}")
    String getHinhAnh();

    @Value("#{target.gia_min}")
    Double getGiaMin();

    @Value("#{target.gia_max}")
    Double getGiaMax();
}
