package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UpdateSanPham {

    private UUID idSanPhamChiTiet;

    private Integer soLuong;

}
