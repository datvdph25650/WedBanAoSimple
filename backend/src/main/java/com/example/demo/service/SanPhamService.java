package com.example.demo.service;

import com.example.demo.entity.SanPham;
import com.example.demo.model.response.SanPhamMoi;
import com.example.demo.model.response.SanPhamReponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SanPhamService {

    Page<SanPhamReponse> getPage(Integer pageNo);

    List<SanPham> getAllByStatus();

    Optional<SanPham> findbyName(String name);

    SanPham update(SanPham sanPham, UUID id);

    SanPham detail(UUID id);

    Page<SanPhamReponse> loc(Integer pageNo, String trangThai);

    Page<SanPhamReponse> search(Integer pageNo, String keyword);

    List<SanPhamMoi> topSanPhamMoi();

}
