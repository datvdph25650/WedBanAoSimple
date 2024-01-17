package com.example.demo.repository;

import com.example.demo.entity.SanPham;
import com.example.demo.model.response.SanPhamMoi;
import com.example.demo.model.response.SanPhamReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, UUID> {

    @Query("select sp from SanPham sp where sp.daXoa=false")
    List<SanPham> getAllByStatus();

    @Query(value = """
            SELECT sp.id,
                sp.ma,
                sp.ten,
                SUM(spct.so_luong) AS so_luong,
                sp.mo_ta,
                sp.da_xoa,
                MAX(sp.ngay_tao)   AS ngay_tao,
                MAX(sp.ngay_sua)   AS ngay_sua
            FROM san_pham_chi_tiet spct
                INNER JOIN san_pham sp ON sp.id = spct.san_pham_id
            GROUP BY sp.id,
                    sp.ma,
                    sp.ten,
                    sp.mo_ta,
                    sp.da_xoa
            ORDER BY IIF(MAX(sp.ngay_sua) IS NULL, MAX(sp.ngay_tao), IIF(MAX(sp.ngay_tao) > MAX(sp.ngay_sua), MAX(sp.ngay_tao), MAX(sp.ngay_sua))) DESC;
                              """, nativeQuery = true)
    Page<SanPhamReponse> getPage(Pageable pageable);

    @Query(value = """
            select sp.id, sp.ma, sp.ten, sum(spct.so_luong) as 'so_luong', sp.mo_ta, sp.da_xoa
            from san_pham_chi_tiet spct
            inner join san_pham sp on sp.id = spct.san_pham_id
            where sp.da_xoa = ?1
            group by sp.id, sp.ma, sp.ten, sp.mo_ta, sp.da_xoa, sp.ngay_tao, sp.ngay_sua
            ORDER BY IIF(MAX(sp.ngay_sua) IS NULL, MAX(sp.ngay_tao), IIF(MAX(sp.ngay_tao) > MAX(sp.ngay_sua), MAX(sp.ngay_tao), MAX(sp.ngay_sua))) DESC;
                                         """, nativeQuery = true)
    Page<SanPhamReponse> loc(Pageable pageable, String trangThai);


    @Query(value = """
            select sp.id, sp.ma, sp.ten, sum(spct.so_luong) as 'so_luong', sp.mo_ta, sp.da_xoa
            from san_pham_chi_tiet spct
            inner join san_pham sp on sp.id = spct.san_pham_id
            where sp.ma like %:key%
            or sp.ten like %:key%
            group by sp.id, sp.ma, sp.ten, sp.mo_ta, sp.da_xoa, sp.ngay_tao, sp.ngay_sua
            ORDER BY IIF(MAX(sp.ngay_sua) IS NULL, MAX(sp.ngay_tao), IIF(MAX(sp.ngay_tao) > MAX(sp.ngay_sua), MAX(sp.ngay_tao), MAX(sp.ngay_sua))) DESC;
                                        """, nativeQuery = true)
    Page<SanPhamReponse> search(Pageable pageable, @Param("key") String keyword);

    Optional<SanPham> findByTen(String ten);

    @Query(value = """
            select top (8) sp.id             as 'id_san_pham',
                            sp.ten            as 'ten_san_pham',
                            cl.ten            as 'ten_chat_lieu',
                            pc.ten            as 'ten_phong_cach',
                            ht.ten            as 'ten_hoa_tiet',
                            ta.ten            as 'ten_tay_ao',
                            ca.ten            as 'ten_co_ao',
                            spct.hinh_anh     as 'hinh_anh',
                            min(spct.don_gia) as 'gia_min',
                            max(spct.don_gia) as 'gia_max'
            from san_pham sp
                    inner join san_pham_chi_tiet spct on sp.id = spct.san_pham_id
                    inner join chat_lieu cl on cl.id = spct.chat_lieu_id
                    inner join phong_cach pc on spct.phong_cach_id = pc.id
                    inner join hoa_tiet ht on spct.hoa_tiet_id = ht.id
                    inner join tay_ao ta on ta.id = spct.tay_ao_id
                    inner join co_ao ca on spct.co_ao_id = ca.id
            group by sp.id, sp.ten, spct.hinh_anh, sp.ngay_tao, cl.ten, pc.ten, ht.ten, ta.ten, ca.ten
            ORDER BY IIF(MAX(sp.ngay_sua) IS NULL, MAX(sp.ngay_tao), IIF(MAX(sp.ngay_tao) > MAX(sp.ngay_sua), MAX(sp.ngay_tao), MAX(sp.ngay_sua))) DESC;
                                               """, nativeQuery = true)
    List<SanPhamMoi> topSanPhamMoi();
}
