package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.model.response.DonHangKhachHangReponse;
import com.example.demo.model.response.DonHangRepone;
import com.example.demo.model.response.HienThiHoaDonReponse;
import com.example.demo.model.response.HoaDonResponse;
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
public interface HoaDonReponsitory extends JpaRepository<HoaDon, UUID> {

    @Query("select hd from HoaDon hd where hd.trangThai=5 order by hd.ngayTao desc ")
    List<HoaDon> getHoaDonCho();


    @Query(value = """
            select hd.id,
                    ma,
                    ten_khach_hang,
                    so_dien_thoai_khach_hang,
                    loai_hoa_don,
                    tong_tien,
                    ngay_tao,
                    trang_thai
            from hoa_don hd
            GROUP BY hd.id, ma, ten_khach_hang, so_dien_thoai_khach_hang, ngay_tao, loai_hoa_don, tong_tien, trang_thai
            ORDER BY IIF(MAX(ngay_thanh_toan) IS NULL, MAX(ngay_tao), IIF(MAX(ngay_tao) > MAX(ngay_thanh_toan), MAX(ngay_tao), MAX(ngay_thanh_toan))) DESC          
             """, nativeQuery = true)
    Page<HoaDonResponse> getPage(Pageable pageable);

    @Query(value = """  
            select  hd.id, hd.ma, hd.ten_khach_hang, hd.loai_hoa_don, hd.tong_tien, hd.trang_thai, hd.ngay_dat_hang , hd.ngay_tao from  hoa_don hd  where
            hd.ma like %:search% or hd.ten_khach_hang like %:search% or hd.loai_hoa_don like %:search% or hd.tong_tien like %:search%
            order by hd.ngay_tao desc """, nativeQuery = true)
    Page<HoaDonResponse> searchByKeyword(Pageable pageable, @Param("search") String search);

    @Query(value = """
            select * from hoa_don hd
            where trang_thai = ?1
            ORDER BY hd.ngay_tao DESC;        
            """, nativeQuery = true)
    Page<HoaDonResponse> loc(Pageable pageable, String trangThai);

    @Query(value = """
               SELECT san_pham_chi_tiet.hinh_anh,san_pham_chi_tiet.so_luong as'so_luong_sp',
               hoa_don.id as 'id_hoa_don',
            hoa_don_chi_tiet.thanh_tien as'thanh_tien',
            hoa_don_chi_tiet.so_luong as 'so_luongsp_hd',
            hoa_don.ma as 'ma_don_hang',
               hoa_don_chi_tiet.don_gia as'don_gia_sp',
            san_pham_chi_tiet.id as 'id_san_pham_chi_tiet',
            san_pham.ten as 'ten_san_pham',
            phong_cach.ten as 'ten_phong_cach',
            co_ao.ten as 'ten_co_ao',
            tay_ao.ten as 'ten_tay_ao',
            chat_lieu.ten as 'ten_chat_lieu',
            hoa_tiet.ten as 'ten_hoa_tiet',
            khach_hang.id as 'id_khach_hang',
            mau_sac.ten as 'ten_mau_sac',kich_thuoc.ten as 'ten_kich_thuoc' ,
            hoa_don.tong_tien as 'tong_tien',
            hoa_don.trang_thai FROM san_pham_chi_tiet
                  INNER JOIN hoa_don_chi_tiet ON san_pham_chi_tiet.id = hoa_don_chi_tiet.san_pham_chi_tiet_id
                  INNER JOIN hoa_don ON hoa_don_chi_tiet.hoa_don_id = hoa_don.id
                  INNER JOIN khach_hang ON hoa_don.khach_hang_id = khach_hang.id
                  INNER JOIN kich_thuoc ON san_pham_chi_tiet.kich_thuoc_id = kich_thuoc.id
                  INNER JOIN mau_sac ON san_pham_chi_tiet.mau_sac_id = mau_sac.id
                  INNER JOIN tay_ao ON san_pham_chi_tiet.tay_ao_id = tay_ao.id
                  INNER JOIN co_ao ON san_pham_chi_tiet.co_ao_id = co_ao.id
                  INNER JOIN chat_lieu ON san_pham_chi_tiet.chat_lieu_id = chat_lieu.id
                  INNER JOIN phong_cach ON san_pham_chi_tiet.phong_cach_id = phong_cach.id
                  INNER JOIN hoa_tiet ON san_pham_chi_tiet.hoa_tiet_id = hoa_tiet.id
                  INNER JOIN san_pham ON san_pham_chi_tiet.san_pham_id = san_pham.id where khach_hang.id =?1 ORDER BY hoa_don.ngay_tao DESC """, nativeQuery = true)
    List<DonHangKhachHangReponse> getDonHangKhachHang(UUID id);

    @Query(value = """
               SELECT san_pham_chi_tiet.hinh_anh,san_pham_chi_tiet.so_luong as'so_luong_sp',
               hoa_don.id as 'id_hoa_don',
            hoa_don_chi_tiet.thanh_tien as'thanh_tien',
            hoa_don.ma as 'ma_don_hang',
            hoa_don_chi_tiet.so_luong as 'so_luongsp_hd',
               hoa_don_chi_tiet.don_gia as'don_gia_sp',
            san_pham_chi_tiet.id as 'id_san_pham_chi_tiet',
            san_pham.ten as 'ten_san_pham',
            phong_cach.ten as 'ten_phong_cach',
            co_ao.ten as 'ten_co_ao',
            tay_ao.ten as 'ten_tay_ao',
            chat_lieu.ten as 'ten_chat_lieu',
            hoa_tiet.ten as 'ten_hoa_tiet',
            khach_hang.id as 'id_khach_hang',
            mau_sac.ten as 'ten_mau_sac',kich_thuoc.ten as 'ten_kich_thuoc' ,
            hoa_don.tong_tien as 'tong_tien',
            hoa_don.trang_thai FROM san_pham_chi_tiet
                  INNER JOIN hoa_don_chi_tiet ON san_pham_chi_tiet.id = hoa_don_chi_tiet.san_pham_chi_tiet_id
                  INNER JOIN hoa_don ON hoa_don_chi_tiet.hoa_don_id = hoa_don.id
                  INNER JOIN khach_hang ON hoa_don.khach_hang_id = khach_hang.id
                  INNER JOIN kich_thuoc ON san_pham_chi_tiet.kich_thuoc_id = kich_thuoc.id
                  INNER JOIN mau_sac ON san_pham_chi_tiet.mau_sac_id = mau_sac.id
                  INNER JOIN tay_ao ON san_pham_chi_tiet.tay_ao_id = tay_ao.id
                  INNER JOIN co_ao ON san_pham_chi_tiet.co_ao_id = co_ao.id
                  INNER JOIN chat_lieu ON san_pham_chi_tiet.chat_lieu_id = chat_lieu.id
                  INNER JOIN phong_cach ON san_pham_chi_tiet.phong_cach_id = phong_cach.id
                  INNER JOIN hoa_tiet ON san_pham_chi_tiet.hoa_tiet_id = hoa_tiet.id
                  INNER JOIN san_pham ON san_pham_chi_tiet.san_pham_id = san_pham.id where khach_hang.id = ?1 and hoa_don.trang_thai = ?2 ORDER BY hoa_don.ngay_tao DESC """, nativeQuery = true)
    List<DonHangKhachHangReponse> getSearchDonHangKhachHang(String id, String trangThai);

    @Query(value = """

               SELECT san_pham_chi_tiet.hinh_anh,san_pham_chi_tiet.so_luong as'so_luong_sp',
                   hoa_don.id as 'id_hoa_don',
                   hoa_don_chi_tiet.thanh_tien as'thanh_tien',
            hoa_don_chi_tiet.so_luong as 'so_luongsp_hd',
                   hoa_don.ma as 'ma_don_hang',
                   hoa_don_chi_tiet.don_gia as'don_gia_sp',
            san_pham_chi_tiet.id as 'id_san_pham_chi_tiet',
            hoa_don.phi_ship as 'phi_ship',
            san_pham.ten as 'ten_san_pham',
            hoa_don.loai_hoa_don as 'loai_hoa_don',
               khach_hang.id as 'id_khach_hang',
            phong_cach.ten as 'ten_phong_cach',
            co_ao.ten as 'ten_co_ao',
            hoa_don.dia_chi_khach_hang as 'dia_chi',
            hoa_don.ten_khach_hang as 'ten_khach_hang',
            hoa_don.ngay_thanh_toan as 'ngay_thanh_toan',
            hoa_don.so_dien_thoai_khach_hang as 'so_dien_thoai',
            tay_ao.ten as 'ten_tay_ao',
            chat_lieu.ten as 'ten_chat_lieu',
            hoa_tiet.ten as 'ten_hoa_tiet',
            mau_sac.ten as 'ten_mau_sac',kich_thuoc.ten as 'ten_kich_thuoc' ,
            hoa_don.tong_tien as 'tong_tien',
            hoa_don.trang_thai FROM san_pham_chi_tiet
                   INNER JOIN hoa_don_chi_tiet ON san_pham_chi_tiet.id = hoa_don_chi_tiet.san_pham_chi_tiet_id
                   INNER JOIN hoa_don ON hoa_don_chi_tiet.hoa_don_id = hoa_don.id
                   INNER JOIN khach_hang ON hoa_don.khach_hang_id = khach_hang.id
                   INNER JOIN kich_thuoc ON san_pham_chi_tiet.kich_thuoc_id = kich_thuoc.id
                   INNER JOIN mau_sac ON san_pham_chi_tiet.mau_sac_id = mau_sac.id
                   INNER JOIN tay_ao ON san_pham_chi_tiet.tay_ao_id = tay_ao.id
                   INNER JOIN co_ao ON san_pham_chi_tiet.co_ao_id = co_ao.id
                   INNER JOIN chat_lieu ON san_pham_chi_tiet.chat_lieu_id = chat_lieu.id
                   INNER JOIN phong_cach ON san_pham_chi_tiet.phong_cach_id = phong_cach.id
                   INNER JOIN hoa_tiet ON san_pham_chi_tiet.hoa_tiet_id = hoa_tiet.id
                   INNER JOIN san_pham ON san_pham_chi_tiet.san_pham_id = san_pham.id where khach_hang.id =?1  and hoa_don.id=?2   ORDER BY hoa_don.ngay_tao DESC""", nativeQuery = true)
    List<HienThiHoaDonReponse> getDetailDonHangKhachHang(UUID idKhachHang, UUID idHoaDon);

    Optional<HoaDon> findByKhachHangIdAndId(UUID idKhachHang, UUID idDonHang);

    @Query(value = """
             select * from hoa_don where hoa_don.trang_thai=0 order by ngay_tao desc
            """, nativeQuery = true)
    List<HoaDon> listthongbao();
}
