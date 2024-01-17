package com.example.demo.repository;

import com.example.demo.entity.GioHang;
import com.example.demo.entity.GioHangChiTiet;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.response.GioHangChiTietReponse;
import com.example.demo.model.response.GioHangReponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet, UUID> {
    GioHangChiTiet findBySanPhamChiTiet_Id(UUID sanPhamChiTietId);
    @Query(value = """
         SELECT san_pham_chi_tiet.hinh_anh,san_pham_chi_tiet.so_luong as'so_luong_sp',san_pham_chi_tiet.don_gia as'don_gia_sp',san_pham_chi_tiet.id as 'id_san_pham_chi_tiet',gio_hang_chi_tiet.id as 'id_gio_hang_chi_tiet',san_pham.ten as 'ten_san_pham',phong_cach.ten as 'ten_phong_cach',co_ao.ten as 'ten_co_ao', tay_ao.ten as 'ten_tay_ao',chat_lieu.ten
         as 'ten_chat_lieu',hoa_tiet.ten as 'ten_hoa_tiet',gio_hang.id as'id_gio_hang',khach_hang.id as 'id_khach_hang',gio_hang_chi_tiet.so_luong,gio_hang_chi_tiet.don_gia,mau_sac.ten as 'ten_mau_sac',kich_thuoc.ten as
         'ten_kich_thuoc' FROM san_pham_chi_tiet
         INNER JOIN gio_hang_chi_tiet ON san_pham_chi_tiet.id = gio_hang_chi_tiet.san_pham_chi_tiet_id
         INNER JOIN gio_hang ON gio_hang_chi_tiet.gio_hang_id = gio_hang.id
         INNER JOIN khach_hang ON gio_hang.khach_hang_id = khach_hang.id
         INNER JOIN kich_thuoc ON san_pham_chi_tiet.kich_thuoc_id = kich_thuoc.id
         INNER JOIN mau_sac ON san_pham_chi_tiet.mau_sac_id = mau_sac.id
         INNER JOIN tay_ao ON san_pham_chi_tiet.tay_ao_id = tay_ao.id
         INNER JOIN co_ao ON san_pham_chi_tiet.co_ao_id = co_ao.id
         INNER JOIN chat_lieu ON san_pham_chi_tiet.chat_lieu_id = chat_lieu.id
         INNER JOIN phong_cach ON san_pham_chi_tiet.phong_cach_id = phong_cach.id
         INNER JOIN hoa_tiet ON san_pham_chi_tiet.hoa_tiet_id = hoa_tiet.id
         INNER JOIN san_pham ON san_pham_chi_tiet.san_pham_id = san_pham.id where khach_hang.id =?1
            """, nativeQuery = true)
    List<GioHangChiTietReponse> getAll(UUID id);
    @Query(value = """
  SELECT san_pham_chi_tiet.hinh_anh,san_pham_chi_tiet.so_luong as'so_luong_sp',san_pham_chi_tiet.don_gia as'don_gia_sp',san_pham_chi_tiet.id as 'id_san_pham_chi_tiet',gio_hang_chi_tiet.id as 'id_gio_hang_chi_tiet',san_pham.ten as 'ten_san_pham',phong_cach.ten as 'ten_phong_cach',co_ao.ten as 'ten_co_ao', tay_ao.ten as 'ten_tay_ao',chat_lieu.ten
         as 'ten_chat_lieu',hoa_tiet.ten as 'ten_hoa_tiet',gio_hang.id as'id_gio_hang',gio_hang_chi_tiet.so_luong,gio_hang_chi_tiet.don_gia,mau_sac.ten as 'ten_mau_sac',kich_thuoc.ten as
         'ten_kich_thuoc' FROM san_pham_chi_tiet
         INNER JOIN gio_hang_chi_tiet ON san_pham_chi_tiet.id = gio_hang_chi_tiet.san_pham_chi_tiet_id
         INNER JOIN gio_hang ON gio_hang_chi_tiet.gio_hang_id = gio_hang.id
         INNER JOIN kich_thuoc ON san_pham_chi_tiet.kich_thuoc_id = kich_thuoc.id
         INNER JOIN mau_sac ON san_pham_chi_tiet.mau_sac_id = mau_sac.id
         INNER JOIN tay_ao ON san_pham_chi_tiet.tay_ao_id = tay_ao.id
         INNER JOIN co_ao ON san_pham_chi_tiet.co_ao_id = co_ao.id
         INNER JOIN chat_lieu ON san_pham_chi_tiet.chat_lieu_id = chat_lieu.id
         INNER JOIN phong_cach ON san_pham_chi_tiet.phong_cach_id = phong_cach.id
         INNER JOIN hoa_tiet ON san_pham_chi_tiet.hoa_tiet_id = hoa_tiet.id
         INNER JOIN san_pham ON san_pham_chi_tiet.san_pham_id = san_pham.id where khach_hang_id is null
            """, nativeQuery = true)
    List<GioHangReponse> getAllK();
    void deleteByGioHang(GioHang gioHang);


    @Query(value = """
  SELECT * from gio_hang_chi_tiet where san_pham_chi_tiet_id =?1
  
  """, nativeQuery = true)
    Optional<GioHangChiTiet> getAlll(UUID id);










}
