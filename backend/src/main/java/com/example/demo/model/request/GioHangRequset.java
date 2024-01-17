package com.example.demo.model.request;

import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class GioHangRequset {
        private UUID gioHangChiTietId;
        private UUID sanPhamChiTietId;
        private UUID khachHangId;
        private int soLuong;
}
