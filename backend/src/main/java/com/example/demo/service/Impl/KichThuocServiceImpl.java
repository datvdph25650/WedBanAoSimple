package com.example.demo.service.Impl;

import com.example.demo.entity.KichThuoc;
import com.example.demo.repository.KichThuocRepository;
import com.example.demo.service.KichThuocService;
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
public class KichThuocServiceImpl implements KichThuocService {

    @Autowired
    private KichThuocRepository kichThuocRepository;

    @Override
    public List<KichThuoc> getAll() {
        return kichThuocRepository.findAll();
    }

    @Override
    public Page<KichThuoc> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return kichThuocRepository.getPage(pageable);
    }

    @Override
    public List<KichThuoc> getAllByStatus() {
        return kichThuocRepository.getAllByStatus();
    }

    @Override
    public KichThuoc add(KichThuoc kichThuoc) {
        KichThuoc kichThuocSave = KichThuoc.builder()
                .ma(kichThuoc.getMa())
                .ten(kichThuoc.getTen())
                .nguoiTao("Hưng")
                .ngayTao(kichThuoc.getNgayTao())
                .daXoa(kichThuoc.getDaXoa())
                .build();
        return kichThuocRepository.save(kichThuocSave);
    }

    @Override
    public KichThuoc update(KichThuoc kichThuoc, UUID id) {
        Optional<KichThuoc> optional = kichThuocRepository.findById(id);
        if (optional.isPresent()) {
            optional.map(kichThuocUpdate -> {
                kichThuocUpdate.setTen(kichThuoc.getTen());
                kichThuocUpdate.setNgaySua(kichThuoc.getNgaySua());
                kichThuocUpdate.setNguoiSua("Hưng");
                kichThuocUpdate.setDaXoa(kichThuoc.getDaXoa());
                return kichThuocRepository.save(kichThuocUpdate);
            }).orElse(null);
        }
        return null;
    }

    @Override
    public KichThuoc detail(UUID id) {
        return kichThuocRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        kichThuocRepository.deleteById(id);
    }
}
