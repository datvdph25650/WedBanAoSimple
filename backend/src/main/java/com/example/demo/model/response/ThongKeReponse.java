package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeReponse {
//    @Value("#{target.id}")
//    String getID();
//
//    @Value("#{target.ma}")
//    String getMa();

    @Value("#{target.ngay}")
    Integer getNgay();

    @Value("#{target.thang}")
    Integer getThang();

    @Value("#{target.nam}")
    Integer getNam();

//    @Value("#{target.tong_khach_hang}")
//    String getTongKhachHang();
//
    @Value("#{target.tong_doanh_thu_ngay}")
    Double getTongDoanhThuNgay();

    @Value("#{target.tong_doanh_thu_thang}")
    Double getTongDoanhThuThang();

//    @Value("#{target.thong_ke_tong_hop}")
//    String getThongKeTongHop();

    @Value("#{target.tong_don_hang_ngay}")
    Integer getTongDonHangNgay();

    @Value("#{target.tong_don_hang_thang}")
    Integer getTongDonHangThang();

    @Value("#{target.tong_san_pham_ngay}")
    Integer getTongSanPhamNgay();

    @Value("#{target.tong_san_pham_thang}")
    Integer getTongSanPhamThang();

//    @Value("#{target.ngay_thanh_toan}")
//    String getNgayThanhToan();
//
//    @Value("#{target.tong_tien}")
//    String getTongTien();

//    @Value("#{target.so_luong}")
//    String getSoLuong();

//    @Value("#{target.gia_tri}")
//    String getGiaTri();
//
//    @Value("#{target.loai_thong_ke}")
//    String getLoaiThognKe();
}
