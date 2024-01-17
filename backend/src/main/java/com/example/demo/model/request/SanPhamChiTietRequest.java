package com.example.demo.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
public class SanPhamChiTietRequest {

    private String maSanPham;

    private String tenSanPham;

    private Double donGia;

    private String nguoiTao;

    private Timestamp ngayTao;

    private String nguoiSua;

    private Timestamp ngaySua;

    private String soLuong;

    private String urlImage;

    private String moTa;

    private String daXoa;

    private UUID idChatLieu;

    private UUID idPhongCach;

    private UUID idHoaTiet;

    private UUID idCoAo;

    private UUID idTayAo;

    private UUID idMauSac;

    private UUID idKichThuoc;

    private String tenKichThuoc;

    private String tenMauSac;

}
