package com.example.demo.repository;

import com.example.demo.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DiaChiRepository extends JpaRepository<DiaChi, UUID> {

    @Query("select dc from DiaChi dc inner join KhachHang kh on kh.id=dc.khachHang.id where kh.id=?1 ")
    List<DiaChi> detail(UUID id);
}
