package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class HinhThucThanhToanRequest {

    private String tenHinhThuc;

    private UUID hoaDonId;
}
