package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class MaGiamGiaChiTietRequest {

    private Double tongTien;

    private Double tongTienSauKhiGiam;

    private UUID hoaDonId;

    private UUID maGiamGiaId;
}
