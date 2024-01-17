package com.example.demo.service.Impl;

import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.model.request.MaGiamGiaChiTietRequest;
import com.example.demo.model.response.MaGiamGiaReponse;
import com.example.demo.repository.HoaDonReponsitory;
import com.example.demo.repository.MaGiamGiaChiTietRepositioy;
import com.example.demo.repository.MaGiamGiaRepository;
import com.example.demo.service.MaGiamGiaChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class MaGiamGiaChiTietImpl implements MaGiamGiaChiTietService {

    @Autowired
    private MaGiamGiaChiTietRepositioy maGiamGiaChiTietRepositioy;

    @Autowired
    private HoaDonReponsitory hoaDonReponsitory;

    @Autowired
    private MaGiamGiaRepository maGiamGiaRepository;


    @Override
    public Page<MaGiamGiaChiTiet> getPage(Integer pageNo, UUID id) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return maGiamGiaChiTietRepositioy.getPage(pageable, id);
    }

    @Override
    public MaGiamGiaChiTiet add(MaGiamGiaChiTietRequest maGiamGiaChiTietRequest) {
        MaGiamGiaChiTiet maGiamGiaChiTiet = MaGiamGiaChiTiet.builder()
                .donGia(BigDecimal.valueOf(maGiamGiaChiTietRequest.getTongTien()))
                .donGiaSauKhiGiam(BigDecimal.valueOf(maGiamGiaChiTietRequest.getTongTienSauKhiGiam()))
                .hoaDon(hoaDonReponsitory.findById(maGiamGiaChiTietRequest.getHoaDonId()).get())
                .maGiamGia(maGiamGiaRepository.findById(maGiamGiaChiTietRequest.getMaGiamGiaId()).get())
                .build();
        return maGiamGiaChiTietRepositioy.save(maGiamGiaChiTiet);
    }

    @Override
    public MaGiamGiaChiTiet update(MaGiamGiaChiTiet maGiamGiaChiTiet, UUID id) {
        if (maGiamGiaChiTietRepositioy.existsById(id)) {
            return maGiamGiaChiTietRepositioy.save(maGiamGiaChiTiet);
        }
        return null;
    }

    @Override
    public MaGiamGiaChiTiet detail(UUID hoaDonId) {

        return maGiamGiaChiTietRepositioy.detail(hoaDonId);
    }

    @Override
    public List<MaGiamGiaReponse> getidHd(UUID id) {
        return maGiamGiaChiTietRepositioy.getIdHd(id);
    }


}
