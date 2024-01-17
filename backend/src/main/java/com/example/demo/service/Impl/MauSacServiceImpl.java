package com.example.demo.service.Impl;

import com.example.demo.entity.MauSac;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.service.MauSacService;
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
public class MauSacServiceImpl implements MauSacService {

    @Autowired
    private MauSacRepository mauSacRepository;

    @Override
    public Page<MauSac> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return mauSacRepository.getPage(pageable);
    }

    @Override
    public List<MauSac> getAll() {
        return mauSacRepository.findAll();
    }

    @Override
    public List<MauSac> getAllByStatus() {
        return mauSacRepository.getAllByStatus();
    }

    @Override
    public MauSac getOne(UUID id) {
        return mauSacRepository.findById(id).orElse(null);
    }

    @Override
    public MauSac add(MauSac mauSac) {
        MauSac mauSacSave = MauSac.builder()
                .ma(mauSac.getMa())
                .ten(mauSac.getTen())
                .daXoa(mauSac.getDaXoa())
                .ngayTao(mauSac.getNgayTao())
                .nguoiTao("Hưng")
                .build();
        return mauSacRepository.save(mauSacSave);
    }

    @Override
    public MauSac update(MauSac mauSac, UUID id) {
        Optional<MauSac> optional = mauSacRepository.findById(id);
        if (optional.isPresent()) {
            optional.map(mauSacUpdate -> {
                mauSacUpdate.setMa(mauSac.getMa());
                mauSacUpdate.setTen(mauSac.getTen());
                mauSacUpdate.setNgaySua(mauSac.getNgaySua());
                mauSacUpdate.setNguoiSua("Hưng");
                mauSacUpdate.setDaXoa(mauSac.getDaXoa());
                return mauSacRepository.save(mauSacUpdate);
            }).orElse(null);
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        mauSacRepository.deleteById(id);
    }
}
