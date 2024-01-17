package com.example.demo.model.request;

import lombok.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class GioHangThemNhieuRequset {
        private List<UUID> sanPhamChiTietIds;
        private UUID khachHangId;
        private Integer soLuong;

}
