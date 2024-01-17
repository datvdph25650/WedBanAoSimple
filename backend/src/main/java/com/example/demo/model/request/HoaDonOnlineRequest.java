package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class HoaDonOnlineRequest {

    private String ma;

    private Timestamp ngayTao;

    private int trangThai;

    private String tenKhachHang;

    private String diaChiKhachHang;

    private String soDienThoaiKhachHang;

    private UUID idKhachHang;

    private Timestamp ngayThanhToan;

    private int phiShip;

    private long tongTien;

}
