package com.example.demo.service.Impl;

import com.example.demo.entity.HoaTiet;
import com.example.demo.repository.HoaTietRepository;
import com.example.demo.service.HoaTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaTietServiceImpl implements HoaTietService {

    @Autowired
    private HoaTietRepository hoaTietRepository;

    @Override
    public List<HoaTiet> getAll() {
        return hoaTietRepository.findAll();
    }

    @Override
    public Page<HoaTiet> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return hoaTietRepository.getPage(pageable);
    }

    @Override
    public List<HoaTiet> getAllByStatus() {
        return hoaTietRepository.getAllByStatus();
    }

    @Override
    public HoaTiet add(HoaTiet hoaTiet) {
        if (hoaTiet.getTen().isBlank()) {
            return null;
        }
        HoaTiet hoaTietSave = HoaTiet.builder()
                .ma(hoaTiet.getMa())
                .ten(hoaTiet.getTen())
                .ngayTao(hoaTiet.getNgayTao())
                .nguoiTao("Hưng")
                .daXoa(hoaTiet.getDaXoa())
                .build();
        return hoaTietRepository.save(hoaTietSave);
    }

    @Override
    public HoaTiet update(HoaTiet hoaTiet, UUID id) {
        Optional<HoaTiet> optionalHoaTiet = hoaTietRepository.findById(id);
        if (optionalHoaTiet.isPresent()) {
            optionalHoaTiet.map(hoaTietUpdate -> {
                hoaTietUpdate.setTen(hoaTiet.getTen());
                hoaTietUpdate.setNgaySua(hoaTiet.getNgaySua());
                hoaTietUpdate.setNguoiSua("Hưng");
                hoaTietUpdate.setDaXoa(hoaTiet.getDaXoa());
                return hoaTietRepository.save(hoaTietUpdate);
            }).orElse(null);

        }
        return null;
    }

    @Override
    public HoaTiet detail(UUID id) {
        return hoaTietRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        hoaTietRepository.deleteById(id);
    }
}
