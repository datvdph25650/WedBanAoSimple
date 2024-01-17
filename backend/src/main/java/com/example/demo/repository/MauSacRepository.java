package com.example.demo.repository;

import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, UUID> {

    @Query(value = """
            SELECT * FROM mau_sac
            GROUP BY id, ma, ten, ngay_tao, ngay_sua, nguoi_sua, nguoi_tao, da_xoa
            ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;
                                                """, nativeQuery = true)
    Page<MauSac> getPage(Pageable pageable);

    @Query(value = """
            SELECT * FROM mau_sac WHERE da_xoa = 'false'
            GROUP BY id, ma, ten, ngay_tao, ngay_sua, nguoi_sua, nguoi_tao, da_xoa
            ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;
                                                  """, nativeQuery = true)
    List<MauSac> getAllByStatus();
}
