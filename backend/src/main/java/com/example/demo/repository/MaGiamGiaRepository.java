package com.example.demo.repository;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.model.response.SanPhamReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MaGiamGiaRepository extends JpaRepository<MaGiamGia, UUID> {

    @Query(value = """
            select *
            from ma_giam_gia
            group by id,ma,ten,so_luong,hinh_thuc_giam,trang_thai,gia_tri_don_toi_thieu
            ,gia_tri_giam,gia_tri_giam_toi_da,ngay_bat_dau,ngay_ket_thuc,ngay_tao,ngay_sua,nguoi_tao,nguoi_sua,da_xoa
             ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC
            """, nativeQuery = true)
    Page<MaGiamGia> getAll(Pageable pageable);

    @Query(value = """
            select *
            from ma_giam_gia
            where trang_thai=2
            group by id,ma,ten,so_luong,hinh_thuc_giam,trang_thai,gia_tri_don_toi_thieu
            ,gia_tri_giam,gia_tri_giam_toi_da,ngay_bat_dau,ngay_ket_thuc,ngay_tao,ngay_sua,nguoi_tao,nguoi_sua,da_xoa
             ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC
                            """, nativeQuery = true)
    Page<MaGiamGia> getAllByStatus(Pageable pageable);

    @Query(value = """
            select *
            from ma_giam_gia
            where (trang_thai = ?1 OR trang_thai IS NULL OR ?1 IS NULL)                                           
            AND (hinh_thuc_giam = ?2 OR hinh_thuc_giam IS NULL OR ?2 IS NULL)
            group by id,ma,ten,so_luong,hinh_thuc_giam,trang_thai,gia_tri_don_toi_thieu
            ,gia_tri_giam,gia_tri_giam_toi_da,ngay_bat_dau,ngay_ket_thuc,ngay_tao,ngay_sua,nguoi_tao,nguoi_sua,da_xoa
             ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC
                  """, nativeQuery = true)
    Page<MaGiamGia> locMaGiamGia(Pageable pageable, Integer trangThai, Integer hinhThuc);

    @Query(value = """
            select * from ma_giam_gia where ma like %:key% or ten like %:key%  group by id,ma,ten,so_luong,hinh_thuc_giam,trang_thai,gia_tri_don_toi_thieu
            ,gia_tri_giam,gia_tri_giam_toi_da,ngay_bat_dau,ngay_ket_thuc,ngay_tao,ngay_sua,nguoi_tao,nguoi_sua,da_xoa
             ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC
            """, nativeQuery = true)
    Page<MaGiamGia> searchMaGiamGia(Pageable pageable, @Param("key") String keyword);
}
