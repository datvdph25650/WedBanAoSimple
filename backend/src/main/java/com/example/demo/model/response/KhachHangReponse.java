package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface KhachHangReponse {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.anh_dai_dien}")
    String getHinhAnh();

    @Value("#{target.ho_ten}")
    String getHoTen();

    @Value("#{target.gioi_tinh}")
    String getGioiTinh();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();

    @Value("#{target.ngay_sinh}")
    Date getNgaySinh();

    @Value("#{target.da_xoa}")
    Boolean getDaXoa();

    @Value("#{target.dia_chi_cu_the}")
    String getDiaChiCuThe();

    @Value("#{target.phuong_xa}")
    String getPhuongXa();

    @Value("#{target.tinh_thanh_pho}")
    String getTinhThanhPho();

    @Value("#{target.quan_huyen}")
    String getQuanHuyen();


}
