package com.example.demo.service.Impl;

import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.response.SanPhamMoi;
import com.example.demo.model.response.SanPhamReponse;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamService;
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
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;
    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;


    @Override
    public Page<SanPhamReponse> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamRepository.getPage(pageable);
    }

    @Override
    public Page<SanPhamReponse> loc(Integer pageNo, String trangThai) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamRepository.loc(pageable, trangThai);
    }

    @Override
    public Page<SanPhamReponse> search(Integer pageNo, String keyword) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamRepository.search(pageable, keyword);
    }

    @Override
    public List<SanPhamMoi> topSanPhamMoi() {
        return sanPhamRepository.topSanPhamMoi();
    }

    @Override
    public List<SanPham> getAllByStatus() {
        return sanPhamRepository.getAllByStatus();
    }

    @Override
    public Optional<SanPham> findbyName(String name) {
        return sanPhamRepository.findByTen(name);
    }


    @Override
    public SanPham update(SanPham sanPham, UUID id) {
        Optional<SanPham> optional = sanPhamRepository.findById(id);
        List<SanPhamChiTiet> sanPhamChiTietList = sanPhamChiTietRepository.getAllBySanPham(id);
        if (optional.isPresent()) {
            optional.map(sanPhamUpdate -> {
                sanPhamUpdate.setTen(sanPham.getTen());
                sanPhamUpdate.setMoTa(sanPham.getMoTa());
                sanPhamUpdate.setDaXoa(sanPham.getDaXoa());
                sanPhamUpdate.setNgaySua(sanPham.getNgaySua());
                sanPhamUpdate.setNguoiSua("Nguyễn Ngọc Hưng");
                return sanPhamRepository.save(sanPhamUpdate);
            }).orElse(null);
            System.out.println(sanPhamChiTietList);
           sanPhamChiTietList.forEach(sanPhamChiTiet -> {
               sanPhamChiTiet.setDaXoa(sanPham.getDaXoa());
               sanPhamChiTietRepository.save(sanPhamChiTiet);
           });
        }
        return null;
    }

    @Override
    public SanPham detail(UUID id) {
        return sanPhamRepository.findById(id).get();
    }


}
