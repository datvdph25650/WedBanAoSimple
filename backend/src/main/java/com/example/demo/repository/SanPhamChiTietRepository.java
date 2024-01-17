package com.example.demo.repository;

import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.response.SanPhamChiTietResponse;
import com.example.demo.model.response.SanPhamHienThiTrangThaiReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet, UUID> {

    @Query(value = """
            select sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet', ta.ten as'ten_tay_ao', ca.ten as'ten_co_ao', spct.da_xoa as 'da_xoa' from san_pham_chi_tiet spct
              inner join chat_lieu cl on cl.id = spct.chat_lieu_id
              inner join phong_cach pc on pc.id = spct.phong_cach_id
              inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
              inner join san_pham sp on sp.id = spct.san_pham_id
              inner join tay_ao ta on ta.id = spct.tay_ao_id
              inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
              inner join mau_sac ms on ms.id = spct.mau_sac_id
              inner join co_ao ca on spct.co_ao_id = ca.id
              where sp.id=?1
              group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten, ta.ten, ca.ten, spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
              ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC; 
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getPage(Pageable pageable, UUID id);


    @Query(value = """
            select * from san_pham_chi_tiet where san_pham_id=?1
              """, nativeQuery = true)
    List<SanPhamChiTiet> getAllBySanPham(UUID id);

    @Query(value = """
            select sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet', spct.da_xoa as 'da_xoa' from san_pham_chi_tiet spct
              inner join chat_lieu cl on cl.id = spct.chat_lieu_id
              inner join phong_cach pc on pc.id = spct.phong_cach_id
              inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
              inner join san_pham sp on sp.id = spct.san_pham_id
              inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
              inner join mau_sac ms on ms.id = spct.mau_sac_id
              where spct.da_xoa='false'
              group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten,  spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
             ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC; 
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getSanPhamBanHangTaiQuay(Pageable pageable);

    @Query(value = """
            SELECT sp.id as 'id_san_pham', spct.id as 'id_san_pham_chi_tiet', hinh_anh, sp.ten as 'ten_san_pham', 
            SUM(spct.so_luong) as 'so_luong', spct.don_gia, kt.ten as 'ten_kich_thuoc', ms.ten as 'ten_mau_sac', 
            cl.ten as 'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as 'ten_hoa_tiet', spct.da_xoa as 'da_xoa' 
            FROM san_pham_chi_tiet spct
            INNER JOIN chat_lieu cl ON cl.id = spct.chat_lieu_id
            INNER JOIN phong_cach pc ON pc.id = spct.phong_cach_id
            INNER JOIN hoa_tiet ht ON ht.id = spct.hoa_tiet_id
            INNER JOIN san_pham sp ON sp.id = spct.san_pham_id
            INNER JOIN kich_thuoc kt ON kt.id = spct.kich_thuoc_id
            INNER JOIN mau_sac ms ON ms.id = spct.mau_sac_id
            WHERE spct.da_xoa = 'false' 
            AND (sp.ten like %:key% or sp.ten is null)
            AND ((:mauSacIds IS NOT NULL AND spct.mau_sac_id IN (:mauSacIds)) OR :mauSacIds IS NULL)                                                                                                                                                                                                                                                           
            AND ((:kichThuocIds IS NOT NULL AND spct.kich_thuoc_id IN (:kichThuocIds)) OR :kichThuocIds IS NULL)                                                                                                                                   
            GROUP BY sp.id, spct.id, sp.ten, kt.ten, ms.ten, cl.ten, pc.ten, ht.ten, spct.da_xoa, spct.ngay_tao, spct.don_gia, hinh_anh
            ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC;
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> search(
            Pageable pageable,
            @Param("key") String key,
            @Param("mauSacIds") List<UUID> mauSacIds,
            @Param("kichThuocIds") List<UUID> kichThuocIds
    );


    @Query(value = """
            select  sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet', spct.da_xoa as 'da_xoa' from san_pham_chi_tiet spct
               inner join chat_lieu cl on cl.id = spct.chat_lieu_id
               inner join phong_cach pc on pc.id = spct.phong_cach_id
               inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
               inner join san_pham sp on sp.id = spct.san_pham_id
               inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
               inner join mau_sac ms on ms.id = spct.mau_sac_id
               where spct.da_xoa='false'
               group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten, spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
              ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC ; 
             """, nativeQuery = true)
    List<SanPhamChiTietResponse> getSanPhamTrangChu();

    @Query(value = """
    select  sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hd.trang_thai as 'trang_thai',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet', spct.da_xoa as 'da_xoa' from san_pham_chi_tiet spct
               inner join chat_lieu cl on cl.id = spct.chat_lieu_id
               inner join phong_cach pc on pc.id = spct.phong_cach_id
               inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
			   inner join hoa_don_chi_tiet hdct on hdct.san_pham_chi_tiet_id = spct.id
			   inner join hoa_don hd on hd.id = hdct.hoa_don_id
               inner join san_pham sp on sp.id = spct.san_pham_id
               inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
               inner join mau_sac ms on ms.id = spct.mau_sac_id
               where spct.da_xoa='false' and hd.trang_thai=3
               group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten, spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh,hd.trang_thai
              ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC ;\s
             """, nativeQuery = true)
    List<SanPhamHienThiTrangThaiReponse> getSanPhamBanChay();


    @Query(value = """
            select  sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet', spct.da_xoa as 'da_xoa' from san_pham_chi_tiet spct
               inner join chat_lieu cl on cl.id = spct.chat_lieu_id
               inner join phong_cach pc on pc.id = spct.phong_cach_id
               inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
               inner join san_pham sp on sp.id = spct.san_pham_id
               inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
               inner join mau_sac ms on ms.id = spct.mau_sac_id
               where spct.da_xoa='false' and sp.ten LIKE %:key%
               group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten, spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
              ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC ; 
             """, nativeQuery = true)
    List<SanPhamChiTietResponse> getSearchSanPhamTrangChu(@Param("key") String keyWord);

    @Query(value = """
            select sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet', spct.da_xoa as 'da_xoa' from san_pham_chi_tiet spct
               inner join chat_lieu cl on cl.id = spct.chat_lieu_id
               inner join phong_cach pc on pc.id = spct.phong_cach_id
               inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
               inner join san_pham sp on sp.id = spct.san_pham_id
               inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
               inner join mau_sac ms on ms.id = spct.mau_sac_id
               where sp.id=?1 and  spct.da_xoa='false'
               group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten, spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
              ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC ; 
             """, nativeQuery = true)
    List<SanPhamChiTietResponse> detailSanPham(UUID id);

    Optional<SanPhamChiTiet> findById(UUID sanPhamChiTietId);
    @Modifying
    @Query("UPDATE SanPhamChiTiet s SET s.soLuong = s.soLuong - :soLuong WHERE s.id = :sanPhamChiTietId")
    void giamSoLuongSanPham(@Param("sanPhamChiTietId") UUID sanPhamChiTietId, @Param("soLuong") int soLuong);
    @Modifying
    @Query("UPDATE SanPhamChiTiet s SET s.soLuong = s.soLuong + :soLuong WHERE s.id = :sanPhamChiTietId")
    void tangSoLuongSanPham(@Param("sanPhamChiTietId") UUID sanPhamChiTietId, @Param("soLuong") int soLuong);



}
