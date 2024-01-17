package com.example.demo.service.Impl;

import com.example.demo.entity.HinhThucThanhToan;
import com.example.demo.model.request.HinhThucThanhToanRequest;
import com.example.demo.repository.HinhThucThanhToanRepository;
import com.example.demo.repository.HoaDonReponsitory;
import com.example.demo.service.HinhThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HinhThucThanhToanServiceImpl implements HinhThucThanhToanService {

    @Autowired
    private HinhThucThanhToanRepository hinhThucThanhToanRepository;
    @Autowired
    private HoaDonReponsitory hoaDonReponsitory;



    @Override
    public HinhThucThanhToan add(HinhThucThanhToanRequest hinhThucThanhToanRequest) {
        HinhThucThanhToan hinhThucThanhToanSave=HinhThucThanhToan.builder()
                .ten(hinhThucThanhToanRequest.getTenHinhThuc())
                .hoaDon(hoaDonReponsitory.findById(hinhThucThanhToanRequest.getHoaDonId()).get())
                .build();
        return hinhThucThanhToanRepository.save(hinhThucThanhToanSave);
    }
}
