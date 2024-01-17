package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.UUID;

@Table(name = "gio_hang_chi_tiet")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class GioHangChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;
    @Column(name = "so_luong")
    private Integer soLuong;
    @Column(name = "don_gia")
    private BigDecimal donGia;
    @Column(name="don_gia_sau_khuyen_mai")
    private BigDecimal donGiaSauKhuyenMai;
    @Column(name="ghi_chu")
    private String ghiChu;
    @Column(name = "ngay_tao")
    private Timestamp ngayTao;
    @Column(name = "ngay_sua")
    private Timestamp ngaySua;
    @Column(name = "nguoi_tao")
    private String nguoiTao;
    @Column(name = "nguoi_sua")
    private String nguoiSua;
    @ManyToOne
    @JoinColumn(name = "san_pham_chi_tiet_id")
    private SanPhamChiTiet sanPhamChiTiet;
    @ManyToOne
    @JoinColumn(name = "gio_hang_id")
    private GioHang gioHang;
}
