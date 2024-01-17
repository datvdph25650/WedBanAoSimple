package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "lich_su_hoa_don")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LichSuHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "ngay_tao")
    private Timestamp ngayTao;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "noi_dung")
    private String noiDung;

    @Column(name = "trang_thai_hoa_don")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id")
    private HoaDon hoaDon;

}
