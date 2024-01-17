package com.example.demo.service.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.model.request.UpdateSanPham;
import com.example.demo.model.response.SanPhamChiTietResponse;
import com.example.demo.model.response.SanPhamHienThiTrangThaiReponse;
import com.example.demo.repository.*;
import com.example.demo.service.SanPhamChiTietService;
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
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;
    @Autowired
    private SanPhamRepository sanPhamRepository;
    @Autowired
    private KichThuocRepository kichThuocRepository;
    @Autowired
    private ChatLieuRepository chatLieuRepository;
    @Autowired
    private HoaTietRepository hoaTietRepository;
    @Autowired
    private MauSacRepository mauSacRepository;
    @Autowired
    private GioHangChiTietRepository gioHangChiTietRepository;
    @Autowired
    private PhongCachRepository phongCachRepository;
    @Autowired
    private TayAoRepository tayAoRepository;
    @Autowired
    private CoAoRepository coAoRepository;

    @Override
    public Page<SanPhamChiTietResponse> getAll(Integer pageNo, UUID id) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return sanPhamChiTietRepository.getPage(pageable, id);
    }


    @Override
    public Page<SanPhamChiTietResponse> getSanPhamBanHang(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamChiTietRepository.getSanPhamBanHangTaiQuay(pageable);
    }

    @Override
    public Page<SanPhamChiTietResponse> search(Integer pageNo, String key, List<UUID> mauSacIds, List<UUID> kichThuocIds) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamChiTietRepository.search(pageable, key, mauSacIds, kichThuocIds);
    }

    @Override
    public List<SanPhamChiTietResponse> getSanPhamTrangChu() {
        return sanPhamChiTietRepository.getSanPhamTrangChu();
    }

    @Override
    public List<SanPhamChiTietResponse> detailSanPham(UUID id) {
        return sanPhamChiTietRepository.detailSanPham(id);
    }

    @Override
    public List<SanPhamChiTietResponse> serachh(String key) {
        return sanPhamChiTietRepository.getSearchSanPhamTrangChu(key);
    }

    @Override
    public List<SanPhamHienThiTrangThaiReponse> sanPhamBanChay() {
        return sanPhamChiTietRepository.getSanPhamBanChay();
    }

    @Override
    public SanPhamChiTiet getOne(UUID id) {
        return sanPhamChiTietRepository.findById(id).orElse(null);
    }

    @Override
    public List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests) {
        sanPhamChiTietRequests.forEach(sanPhamChiTietRequest -> {
            Optional<SanPham> optionalSanPham = sanPhamRepository.findByTen(sanPhamChiTietRequest.getTenSanPham());
            if (optionalSanPham.isPresent()) {
                optionalSanPham.map(sanPham -> {
                            sanPham.setNgaySua(sanPhamChiTietRequest.getNgayTao());
                            return sanPhamRepository.save(sanPham);
                        }
                ).orElse(null);

                SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet.builder()
                        .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
                        .donGia(BigDecimal.valueOf(sanPhamChiTietRequest.getDonGia()))
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .ngayTao(sanPhamChiTietRequest.getNgayTao())
                        .nguoiTao(sanPhamChiTietRequest.getNguoiTao())
                        .urlImage(sanPhamChiTietRequest.getUrlImage())
                        .sanPham(sanPhamRepository.findById(getIdSanPham(sanPhamChiTietRequest.getTenSanPham())).get())
                        .kichThuoc(kichThuocRepository.findById(getIdKichThuoc(sanPhamChiTietRequest.getTenKichThuoc())).get())
                        .mauSac(mauSacRepository.findById(getIdMauSac(sanPhamChiTietRequest.getTenMauSac())).get())
                        .chatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get())
                        .phongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get())
                        .coAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get())
                        .tayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get())
                        .hoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get())
                        .build();
                sanPhamChiTietRepository.save(sanPhamChiTietSave);
                return;
            } else {
                SanPham sanPhamSave = SanPham.builder()
                        .ma(sanPhamChiTietRequest.getMaSanPham())
                        .ten(sanPhamChiTietRequest.getTenSanPham())
                        .moTa(sanPhamChiTietRequest.getMoTa())
                        .ngayTao(sanPhamChiTietRequest.getNgayTao())
                        .nguoiTao(sanPhamChiTietRequest.getNguoiTao())
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .build();
                SanPham sanPham = sanPhamRepository.save(sanPhamSave);

                SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet.builder()
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
                        .donGia(BigDecimal.valueOf(sanPhamChiTietRequest.getDonGia()))
                        .ngayTao(sanPhamChiTietRequest.getNgayTao())
                        .nguoiTao(sanPhamChiTietRequest.getNguoiTao())
                        .urlImage(sanPhamChiTietRequest.getUrlImage())
                        .sanPham(sanPham)
                        .kichThuoc(kichThuocRepository.findById(getIdKichThuoc(sanPhamChiTietRequest.getTenKichThuoc())).get())
                        .mauSac(mauSacRepository.findById(getIdMauSac(sanPhamChiTietRequest.getTenMauSac())).get())
                        .chatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get())
                        .phongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get())
                        .coAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get())
                        .tayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get())
                        .hoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get())
                        .build();
                sanPhamChiTietRepository.save(sanPhamChiTietSave);
                return;
            }
        });
        return null;
    }


    @Override
    public SanPhamChiTiet updateSL(int soLuong, UUID id) {
        Optional<SanPhamChiTiet> optional = sanPhamChiTietRepository.findById(id);
        optional.map(sanPhamChiTietUpdate -> {
            sanPhamChiTietUpdate.setSoLuong(sanPhamChiTietUpdate.getSoLuong() - Integer.valueOf(soLuong));
            return sanPhamChiTietRepository.save(sanPhamChiTietUpdate);
        }).orElse(null);

        return null;
    }

    @Override
    public SanPhamChiTiet update(SanPhamChiTietRequest sanPhamChiTietRequest, UUID id) {
        Optional<SanPhamChiTiet> optional = sanPhamChiTietRepository.findById(id);
        optional.map(sanPhamChiTietUpdate -> {
            sanPhamChiTietUpdate.setSoLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()));
            sanPhamChiTietUpdate.setDonGia(BigDecimal.valueOf(sanPhamChiTietRequest.getDonGia()));
            sanPhamChiTietUpdate.setNgaySua(sanPhamChiTietRequest.getNgaySua());
            sanPhamChiTietUpdate.setNguoiSua(sanPhamChiTietRequest.getNguoiSua());
            sanPhamChiTietUpdate.setUrlImage(sanPhamChiTietRequest.getUrlImage());
            sanPhamChiTietUpdate.setDaXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()));
            sanPhamChiTietUpdate.setMauSac(mauSacRepository.findById(sanPhamChiTietRequest.getIdMauSac()).get());
            sanPhamChiTietUpdate.setKichThuoc(kichThuocRepository.findById(sanPhamChiTietRequest.getIdKichThuoc()).get());
            sanPhamChiTietUpdate.setChatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get());
            sanPhamChiTietUpdate.setPhongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get());
            sanPhamChiTietUpdate.setHoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get());
            sanPhamChiTietUpdate.setTayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get());
            sanPhamChiTietUpdate.setCoAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get());
            return sanPhamChiTietRepository.save(sanPhamChiTietUpdate);
        }).orElse(null);
        Optional<GioHangChiTiet> gioHangChiTiet = gioHangChiTietRepository.getAlll(id);
        gioHangChiTiet.map(gioHangChiTiet1 -> {
            gioHangChiTiet1.setDonGia(BigDecimal.valueOf(sanPhamChiTietRequest.getDonGia()).multiply(BigDecimal.valueOf(gioHangChiTiet.get().getSoLuong())));
            return gioHangChiTietRepository.save(gioHangChiTiet1);
        }).orElse(null);


        return null;
    }

    @Override
    public SanPhamChiTiet updateSoLuong(UpdateSanPham updateSanPham) {
        Optional<SanPhamChiTiet> optional = sanPhamChiTietRepository.findById(updateSanPham.getIdSanPhamChiTiet());
        if (optional.isPresent()) {
            Integer soLuongNew = optional.get().getSoLuong() - updateSanPham.getSoLuong();
            optional.map(sanPhamChiTiet -> {
                sanPhamChiTiet.setSoLuong(soLuongNew);
                if (soLuongNew == 0) {
                    sanPhamChiTiet.setDaXoa(true);
                }
                return sanPhamChiTietRepository.save(sanPhamChiTiet);
            }).orElse(null);
        }

        return null;
    }

    public UUID getIdSanPham(String ten) {
        for (SanPham sanPham : sanPhamRepository.findAll()) {
            if (ten.equals(sanPham.getTen())) {
                return sanPham.getId();
            }
        }
        return null;
    }

    public UUID getIdKichThuoc(String ten) {
        for (KichThuoc kichThuoc : kichThuocRepository.findAll()) {
            if (ten.equals(kichThuoc.getTen())) {
                return kichThuoc.getId();
            }
        }
        return null;
    }

    public UUID getIdMauSac(String ten) {
        for (MauSac mauSac : mauSacRepository.findAll()) {
            if (ten.equals(mauSac.getTen())) {
                return mauSac.getId();
            }
        }
        return null;
    }

}
