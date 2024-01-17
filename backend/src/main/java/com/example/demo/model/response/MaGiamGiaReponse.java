package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface MaGiamGiaReponse {
    @Value("#{target.hoa_don}")
    String getHoaDon();

    @Value("#{target.gia_tri}")
    String getGiaTri();

    @Value("#{target.hinh_thuc}")
    String getHinhThuc();

}
