package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class HoaDonRequest {

    private String trangThai;

    private String tenKhachHang;

    private String diaChiKhachHang;

    private String soDienThoaiKhachHang;

    private Double phiVanChuyen;

    private UUID idKhachHang;

    private Timestamp ngayThanhToan;

    private Double tongTien;
}
