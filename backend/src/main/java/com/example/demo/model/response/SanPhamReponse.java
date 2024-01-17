package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;


public interface SanPhamReponse {

    @Value("#{target.id}")
    String getIdSanPham();

    @Value("#{target.ma}")
    String getMaSanPham();

    @Value("#{target.ten}")
    String getTenSanPham();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.mo_ta}")
    String getMoTa();

    @Value("#{target.da_xoa}")
    Boolean getDaXoa();
}
