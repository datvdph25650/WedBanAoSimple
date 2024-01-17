package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface BieuDoTrangThaiReponse {

    @Value("#{target.trang_thai}")
    Integer getTrangThai();

    @Value("#{target.tong_so_hoa_don}")
    Integer getTongSoHoaDon();
}
