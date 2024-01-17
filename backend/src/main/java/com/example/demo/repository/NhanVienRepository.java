package com.example.demo.repository;

import com.example.demo.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, UUID> {

    @Query(value = """  
            select * from nhan_vien
            group by id,ma,ho_ten,email,so_dien_thoai,gioi_tinh,ngay_sinh,anh_dai_dien,mat_khau,ngay_tao,ngay_sua,nguoi_tao,nguoi_sua,dia_chi_cu_the,tinh_thanh_pho,quan_huyen,phuong_xa,da_xoa,chuc_vu_id
            ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;
            """, nativeQuery = true)
    Page<NhanVien> getALl(Pageable pageable);

    @Query(value = """  
            select * from nhan_vien where email=?1 and mat_khau=?2       
            """, nativeQuery = true)
    NhanVien login(String email, String matKhau);

    @Query(value = """
            select * from nhan_vien
            where da_xoa=?1
            group by id,ma,ho_ten,email,so_dien_thoai,gioi_tinh,ngay_sinh,anh_dai_dien,mat_khau,ngay_tao,ngay_sua,nguoi_tao,nguoi_sua,dia_chi_cu_the,tinh_thanh_pho,quan_huyen,phuong_xa,da_xoa,chuc_vu_id
            ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;    
            """, nativeQuery = true)
    Page<NhanVien> loc(Pageable pageable, String trangThai);

    @Query(value = """
            SELECT *
               FROM nhan_vien
               WHERE ma LIKE %:key%
               OR ho_ten LIKE %:key%
               OR email LIKE %:key%
               OR so_dien_thoai LIKE %:key%
               group by id,ma,ho_ten,email,so_dien_thoai,gioi_tinh,ngay_sinh,anh_dai_dien,mat_khau,ngay_tao,ngay_sua,nguoi_tao,nguoi_sua,dia_chi_cu_the,tinh_thanh_pho,quan_huyen,phuong_xa,da_xoa,chuc_vu_id
               ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;    
             """, nativeQuery = true)
    Page<NhanVien> searchByKeyword(Pageable pageable, @Param("key") String keyWord);

}
