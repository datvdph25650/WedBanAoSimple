package com.example.demo.repository;

import com.example.demo.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon, UUID> {
    @Query(value = """
            SELECT lich_su_hoa_don.id,
            lich_su_hoa_don.noi_dung,
            lich_su_hoa_don.ngay_tao,
            lich_su_hoa_don.nguoi_tao,
            lich_su_hoa_don.trang_thai_hoa_don,
            lich_su_hoa_don.hoa_don_id FROM lich_su_hoa_don
            WHERE hoa_don_id = :hoaDonId
            ORDER BY lich_su_hoa_don.ngay_tao ASC;
            """, nativeQuery = true)
    List<LichSuHoaDon> getListLichSuHoaDon(@Param("hoaDonId") UUID hoaDonId);
}
