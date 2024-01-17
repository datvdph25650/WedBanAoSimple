package com.example.demo.repository;

import com.example.demo.entity.GioHang;
import com.example.demo.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang,UUID> {
    Optional<GioHang> findByKhachHangId(UUID khachHangId );
    List<GioHang> findAllByKhachHangId(UUID khachHangId );
    void deleteByKhachHangId(UUID khachHangId );
}
