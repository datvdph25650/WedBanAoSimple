package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface HienThiHoaDonReponse {
    @Value("#{target.id_san_pham_chi_tiet}")
    String getIdSanPhamChiTiet();

    //
    @Value("#{target.id_khach_hang}")
    String getIdKhachHang();

    @Value("#{target.id_hoa_don}")
    String getHoaDonId();

    @Value("#{target.ma_don_hang}")
    String getMaHoaDon();

    @Value("#{target.trang_thai}")
    String getTrangThai();


    @Value("#{target.don_gia_sp}")
    String getDonGiaSanPham();
    @Value("#{target.so_luongsp_hd}")
    String getSLsanPhamHoaDon();
    @Value("#{target.thanh_tien}")
    String getThanhTien();
    @Value("#{target.tong_tien}")
    String getTongTien();
    @Value("#{target.so_luong_sp}")
    String getSoLuongSanPham();

    @Value("#{target.ngay_thanh_toan}")
    String getNgayThanhToan();
    @Value("#{target.hinh_anh}")
    String getDuongDan();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();





    @Value("#{target.ten_kich_thuoc}")
    String getTenKichThuoc();
    //
    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();
    //
    @Value("#{target.ten_chat_lieu}")
    String getTenChatLieu();
    //
    @Value("#{target.ten_phong_cach}")
    String getTenPhongCach();
    //
    @Value("#{target.ten_hoa_tiet}")
    String getTenHoaTiet();
    //
    @Value("#{target.ten_tay_ao}")
    String getTenTayAo();
    //
    @Value("#{target.ten_co_ao}")
    String getTenCoAo();

    @Value("#{target.phi_ship}")
    BigDecimal getPhiShip();

    @Value("#{target.ten_khach_hang}")
    String getTenKhachHang();

    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();

    @Value("#{target.dia_chi}")
    String getDiaChi();
    @Value("#{target.loai_hoa_don}")
    String getLoaiHoaDon();
//    @Value("#{target.hinh_thuc_thanh_toan}")
//    String getHinhThucThanhToan();


}
