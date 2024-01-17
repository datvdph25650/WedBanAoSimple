package com.example.demo.repository;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.model.response.MaGiamGiaReponse;
import com.example.demo.model.response.SanPhamReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MaGiamGiaChiTietRepositioy extends JpaRepository<MaGiamGiaChiTiet, UUID> {

    @Query(value = """
            select * from ma_giam_gia_chi_tiet where ma_giam_gia_id=?1
            """, nativeQuery = true)
    Page<MaGiamGiaChiTiet> getPage(Pageable pageable, UUID id);

    @Query(value = """
            select * from ma_giam_gia_chi_tiet where hoa_don_id=?1
            """, nativeQuery = true)
    MaGiamGiaChiTiet detail(UUID id);

    @Query(value = """
            SELECT 
                ma_giam_gia.hinh_thuc_giam as 'hinh_thuc',
                ma_giam_gia.gia_tri_giam as 'gia_tri',
                hoa_don.id as 'hoa_don'
            FROM 
                ma_giam_gia_chi_tiet
            INNER JOIN
                hoa_don ON ma_giam_gia_chi_tiet.hoa_don_id = hoa_don.id
            INNER JOIN
                ma_giam_gia ON ma_giam_gia.id = ma_giam_gia_chi_tiet.ma_giam_gia_id\s
            WHERE
                hoa_don.id=?1

                        """, nativeQuery = true)
    List<MaGiamGiaReponse> getIdHd(UUID id);


}
