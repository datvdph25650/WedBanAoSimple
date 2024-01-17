package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
public class KhachHangRequest {

    private String ma;

    private String hoTen;

    private String email;

    private String anhDaiDien;

    private Boolean gioiTinh;

    private String matKhau;

    private String soDienThoai;

    private Date ngaySinh;

    private Timestamp ngayTao;

    private Timestamp ngaySua;

    private String daXoa;

    private String diaChiCuThe;

    private String diaChiMacDinh;

    private String quanHuyen;

    private String phuongXa;

    private String tinhThanhPho;
}
