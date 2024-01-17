package com.example.demo.service.Impl;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.model.request.HoaDonChiTietRequest;
import com.example.demo.model.response.HoaDonChiTietReponse;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.repository.HoaDonReponsitory;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {

    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    private HoaDonReponsitory hoaDonReponsitory;
    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;


    @Override
    public List<HoaDonChiTiet> getByMa(UUID hoaDonId) {
        return hoaDonChiTietRepository.getByMa(hoaDonId);
    }

    @Override
    public Page<HoaDonChiTietReponse> getGioHang(Integer pageNo, String ma) {
        Pageable pageable = PageRequest.of(pageNo, 3);
        return hoaDonChiTietRepository.getGioHang(pageable, ma);
    }

    @Override
    public HoaDonChiTiet add(HoaDonChiTietRequest hoaDonChiTietRequest) {
        System.out.println(hoaDonChiTietRequest);
        HoaDonChiTiet hoaDonChiTietSave = HoaDonChiTiet.builder()
                .soLuong(Integer.valueOf(hoaDonChiTietRequest.getSoLuong()))
                .donGia(BigDecimal.valueOf(hoaDonChiTietRequest.getDonGia()))
                .thanhTien(BigDecimal.valueOf(hoaDonChiTietRequest.getThanhTien()))
                .hoaDon(hoaDonReponsitory.findById(hoaDonChiTietRequest.getIdHoaDon()).get())
                .sanPhamChiTiet(sanPhamChiTietRepository.findById(hoaDonChiTietRequest.getIdSanPhamChiTiet()).get())
                .build();
        return hoaDonChiTietRepository.save(hoaDonChiTietSave);
    }

    @Override
    public HoaDonChiTiet update(HoaDonChiTietRequest hoaDonChiTietRequest, UUID id) {
        Optional<HoaDonChiTiet> optional = hoaDonChiTietRepository.findById(id);
        optional.map(o -> {
            o.setSoLuong(Integer.valueOf(hoaDonChiTietRequest.getSoLuong()));
            o.setThanhTien(BigDecimal.valueOf(hoaDonChiTietRequest.getThanhTien()));
            return hoaDonChiTietRepository.save(o);
        }).orElse(null);
        return null;
    }

    @Override
    public Page<HoaDonChiTietReponse> detail(Integer pageNo, UUID id) {
        Pageable pageable = PageRequest.of(pageNo, 3);
        return hoaDonChiTietRepository.getSanPhamHoaDon(pageable, id);
    }


    @Override
    public HoaDonChiTiet delete(UUID id) {
        Optional<HoaDonChiTiet> optional = hoaDonChiTietRepository.findById(id);

        return optional.map(o -> {
            hoaDonChiTietRepository.delete(o);
            return o;
        }).orElse(null);
    }


}
