package com.example.demo.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class HoaDonChiTietRequest {

    private String soLuong;

    private Double donGia;

    private Double thanhTien;

    private UUID idSanPhamChiTiet;

    private UUID idHoaDon;
}
