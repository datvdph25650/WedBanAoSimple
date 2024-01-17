package com.example.demo.service.Impl;

import com.example.demo.entity.PhongCach;
import com.example.demo.repository.PhongCachRepository;
import com.example.demo.service.PhongCachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PhongCachServiceImpl implements PhongCachService {

    @Autowired
    private PhongCachRepository phongCachRepository;

    @Override
    public Page<PhongCach> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return phongCachRepository.getPage(pageable);
    }

    @Override
    public List<PhongCach> getAll() {
        return phongCachRepository.findAll();
    }

    @Override
    public List<PhongCach> getAllByStatus() {
        return phongCachRepository.getAllByStatus();
    }

    @Override
    public PhongCach getOne(UUID id) {
        return phongCachRepository.findById(id).orElse(null);
    }

    @Override
    public PhongCach add(PhongCach phongCach) {
        PhongCach phongCachSave = PhongCach.builder()
                .ma(phongCach.getMa())
                .ten(phongCach.getTen())
                .ngayTao(phongCach.getNgayTao())
                .nguoiTao("Hưng")
                .daXoa(phongCach.getDaXoa())
                .build();
        return phongCachRepository.save(phongCachSave);
    }

    @Override
    public PhongCach update(PhongCach phongCach, UUID id) {
        Optional<PhongCach> optionalPhongCach = phongCachRepository.findById(id);
        if (optionalPhongCach.isPresent()) {
            optionalPhongCach.map(phongCachUpdate -> {
                phongCachUpdate.setTen(phongCach.getTen());
                phongCachUpdate.setNgaySua(phongCach.getNgaySua());
                phongCachUpdate.setNguoiSua("Hưng");
                phongCachUpdate.setDaXoa(phongCach.getDaXoa());
                return phongCachRepository.save(phongCachUpdate);
            }).orElse(null);
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        phongCachRepository.deleteById(id);
    }
}
