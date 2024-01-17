package com.example.demo.service;

import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.NhanVienRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface NhanVienService {

    List<NhanVien> getAll();

    Page<NhanVien> getPage(Integer pageNo);

    NhanVien login (String email,String matKhau);

    NhanVien add(NhanVienRequest nhanVienRequest);

    NhanVien importExcel(NhanVien nhanVien);

    NhanVien update(NhanVien nhanVien, UUID id);

    Page<NhanVien> loc(Integer pageNo, String trangThai);

    Page<NhanVien> search(Integer pageNo, String keyWord);

    NhanVien detail(UUID id);
}
