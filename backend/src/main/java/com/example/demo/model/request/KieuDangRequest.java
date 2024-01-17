package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class KieuDangRequest {

    private String ma;

    private String ten;

    private String daXoa;

    private UUID idDanhMuc;
}
