package com.example.demo.repository;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.model.response.HoaDonChiTietReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, UUID> {

    @Query(value = """
            select hdct.id as'id_hoa_don_chi_tiet',spct.id as 'id_san_pham_chi_tiet',hd.ma,hinh_anh,sp.ten as 'ten_san_pham',kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac',hdct.so_luong,hdct.don_gia,hdct.thanh_tien  from hoa_don_chi_tiet hdct
            inner join hoa_don hd on hd.id = hdct.hoa_don_id
            inner join san_pham_chi_tiet spct on hdct.san_pham_chi_tiet_id = spct.id
            inner join san_pham sp on spct.san_pham_id = sp.id
            inner join kich_thuoc kt on spct.kich_thuoc_id = kt.id
            inner join mau_sac ms on spct.mau_sac_id = ms.id
            where hd.ma=?1
            """, nativeQuery = true)
    Page<HoaDonChiTietReponse> getGioHang(Pageable pageable, String ma);

    @Query(value = """
            select hdct.id as 'id_hoa_don_chi_tiet',
                                            spct.id as 'id_san_pham_chi_tiet',
                                            hd.ma,
                                            hinh_anh,
                                            sp.ten  as 'ten_san_pham',
                                            kt.ten  as 'ten_kich_thuoc',
                                            ms.ten  as 'ten_mau_sac',
                                            hdct.so_luong,
                                            hdct.don_gia,
                                            hdct.thanh_tien
                                     from hoa_don_chi_tiet hdct
                                              inner join hoa_don hd on hd.id = hdct.hoa_don_id
                                              inner join san_pham_chi_tiet spct on hdct.san_pham_chi_tiet_id = spct.id
                                              inner join san_pham sp on spct.san_pham_id = sp.id
                                              inner join kich_thuoc kt on spct.kich_thuoc_id = kt.id
                                              inner join mau_sac ms on spct.mau_sac_id = ms.id
                                     where hdct.hoa_don_id = ?1
             """, nativeQuery = true)
    Page<HoaDonChiTietReponse> getSanPhamHoaDon(Pageable pageable, UUID id);

    @Query(value = """
            select * from hoa_don_chi_tiet where hoa_don_id=?1
            """, nativeQuery = true)
    List<HoaDonChiTiet> getByMa(UUID hoaDonId);

    List<HoaDonChiTiet> findByHoaDonId(UUID donHangId);
}
