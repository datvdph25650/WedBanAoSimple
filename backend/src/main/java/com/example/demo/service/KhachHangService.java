package com.example.demo.service;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.model.response.KhachHangReponse;
import com.example.demo.model.request.KhachHangRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface KhachHangService {

    List<KhachHang> getAll();

    Page<KhachHang> getPage(Integer pageNo);

    KhachHang add(KhachHangRequest khachHangRequest);

    KhachHang importExcel(KhachHang khachHang);

    KhachHang update(KhachHang khachHang, UUID id);

    Page<KhachHang> loc(Integer pageNo, String trangThai);

    Page<KhachHang> search(Integer pageNo, String keyWord);

    KhachHang detail(UUID id);


}
