package com.example.demo.service.Impl;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.model.request.HoaDonOnlineRequest;
import com.example.demo.model.request.HoaDonRequest;
import com.example.demo.model.response.DonHangKhachHangReponse;
import com.example.demo.model.response.HienThiHoaDonReponse;
import com.example.demo.model.response.HoaDonResponse;
import com.example.demo.repository.*;
import com.example.demo.service.HoaDonService;
import com.example.demo.service.LichSuHoaDonService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonReponsitory hoaDonReponsitory;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;


    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;



    @Autowired
    private LichSuHoaDonRepository lichSuHoaDonRepository;

    @Override
    public List<HoaDon> getHoaDonCho() {
        return hoaDonReponsitory.getHoaDonCho();
    }

    @Override
    public List<DonHangKhachHangReponse> getAll(UUID id) {
        return hoaDonReponsitory.getDonHangKhachHang(id);
    }

    @Override
    public List<HienThiHoaDonReponse> getHienThi(UUID idKhachHang, UUID idHoaDon) {
        return hoaDonReponsitory.getDetailDonHangKhachHang(idKhachHang,idHoaDon);
    }

    @Override
    public List<DonHangKhachHangReponse> getSearch(String id, String trangThai) {
        return hoaDonReponsitory.getSearchDonHangKhachHang(id,trangThai);
    }

    @Override
    public HoaDon add(HoaDon hoaDon) {
        HoaDon hoaDonSave = HoaDon.builder()
                .ma(hoaDon.getMa())
                .ngayTao(hoaDon.getNgayTao())
                .loaiHoaDon("Tại quầy")
                .nguoiTao(hoaDon.getNguoiTao())
                .trangThai(hoaDon.getTrangThai())
                .build();
        HoaDon hoaDonNew=hoaDonReponsitory.save(hoaDonSave);
        LichSuHoaDon lichSuHoaDon= LichSuHoaDon.builder()
                .ngayTao(hoaDon.getNgayTao())
                .nguoiTao(hoaDon.getNguoiTao())
                .trangThai(hoaDon.getTrangThai())
                .hoaDon(hoaDonNew)
                .build();
        lichSuHoaDonRepository.save(lichSuHoaDon);
        return null;
    }


    @Override
    public HoaDon addOnline(HoaDonOnlineRequest hoaDon) {
        HoaDon hoaDonSave = HoaDon.builder()
                .khachHang(khachHangRepository.findById(hoaDon.getIdKhachHang()).orElse(null))
                .tenKhachHang(hoaDon.getTenKhachHang())
                .soDienThoaiKhachHang(hoaDon.getSoDienThoaiKhachHang())
                .ngayThanhToan(hoaDon.getNgayThanhToan())
                .tongTien(BigDecimal.valueOf(hoaDon.getTongTien()))
                .diaChiKhachHang(hoaDon.getDiaChiKhachHang())
                .ma(hoaDon.getMa())
                .ngayTao(hoaDon.getNgayTao())
                .loaiHoaDon("Online")
                .nguoiTao("P")
                .phiShip(BigDecimal.valueOf(hoaDon.getPhiShip()))
                .trangThai(hoaDon.getTrangThai())
                .build();
        hoaDonReponsitory.save(hoaDonSave);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setNgayTao(new Timestamp(System.currentTimeMillis()));
        lichSuHoaDon.setNguoiTao(hoaDon.getTenKhachHang()); // You may set the actual user or system information
        lichSuHoaDon.setNoiDung("Chờ xác nhận");
        lichSuHoaDon.setTrangThai(hoaDonSave.getTrangThai());
        lichSuHoaDon.setHoaDon(hoaDonSave);
        lichSuHoaDonRepository.save(lichSuHoaDon);


        return hoaDonSave;
    }

    @Override
    public HoaDon update(HoaDonRequest hoaDonRequest, UUID id) {
        Optional<HoaDon> optional = hoaDonReponsitory.findById(id);
        if (hoaDonRequest.getIdKhachHang() == null) {
            optional.map(hoaDon -> {
                hoaDon.setTrangThai(Integer.valueOf(hoaDonRequest.getTrangThai()));
                hoaDon.setTenKhachHang(hoaDonRequest.getTenKhachHang());
                hoaDon.setSoDienThoaiKhachHang(hoaDonRequest.getSoDienThoaiKhachHang());
                hoaDon.setDiaChiKhachHang(hoaDonRequest.getDiaChiKhachHang());
                hoaDon.setNgayThanhToan(hoaDonRequest.getNgayThanhToan());
                hoaDon.setPhiShip(BigDecimal.valueOf(hoaDonRequest.getPhiVanChuyen()));
                hoaDon.setTongTien(BigDecimal.valueOf(hoaDonRequest.getTongTien()));
                hoaDon.setPhiShip(BigDecimal.valueOf(hoaDonRequest.getPhiVanChuyen()));
                HoaDon hoaDonNew= hoaDonReponsitory.save(hoaDon);
                LichSuHoaDon lichSuHoaDon= LichSuHoaDon.builder()
                        .ngayTao(hoaDonNew.getNgayThanhToan())
                        .nguoiTao(hoaDonNew.getNguoiTao())
                        .trangThai(hoaDonNew.getTrangThai())
                        .hoaDon(hoaDonNew)
                        .build();
                lichSuHoaDonRepository.save(lichSuHoaDon);
                return null;
            }).orElse(null);
        } else {
            optional.map(hoaDon -> {
                hoaDon.setTrangThai(Integer.valueOf(hoaDonRequest.getTrangThai()));
                hoaDon.setTenKhachHang(hoaDonRequest.getTenKhachHang());
                hoaDon.setSoDienThoaiKhachHang(hoaDonRequest.getSoDienThoaiKhachHang());
                hoaDon.setDiaChiKhachHang(hoaDonRequest.getDiaChiKhachHang());
                hoaDon.setNgayThanhToan(hoaDonRequest.getNgayThanhToan());
                hoaDon.setTongTien(BigDecimal.valueOf(hoaDonRequest.getTongTien()));
                hoaDon.setPhiShip(BigDecimal.valueOf(hoaDonRequest.getPhiVanChuyen()));
                hoaDon.setKhachHang(khachHangRepository.findById(hoaDonRequest.getIdKhachHang()).orElse(null));
                hoaDon.setPhiShip(BigDecimal.valueOf(hoaDonRequest.getPhiVanChuyen()));
                HoaDon hoaDonNew= hoaDonReponsitory.save(hoaDon);
                LichSuHoaDon lichSuHoaDon= LichSuHoaDon.builder()
                        .ngayTao(hoaDon.getNgayThanhToan())
                        .nguoiTao(hoaDon.getNguoiTao())
                        .trangThai(hoaDon.getTrangThai())
                        .hoaDon(hoaDonNew)
                        .build();
                lichSuHoaDonRepository.save(lichSuHoaDon);
                return null;
            }).orElse(null);
        }
        return null;
    }

    @Override
    public HoaDon updateTongTien(Double tongTien, UUID id) {
        HoaDon hoaDon=hoaDonReponsitory.findById(id).get();
        hoaDon.setTongTien(BigDecimal.valueOf(tongTien));
        return hoaDonReponsitory.save(hoaDon);
    }


    @Override
    public HoaDon detail(UUID id) {
        return hoaDonReponsitory.findById(id).orElse(null);
    }


    @Override
    @Transactional
    public void updateTrangThaiDonHang(UUID khachHangId, UUID donHangId, Integer newTrangThai, String noiDung, String nguoiTao) {
        Optional<HoaDon> optionalHoaDon = hoaDonReponsitory.findByKhachHangIdAndId(khachHangId, donHangId);

        if (optionalHoaDon.isPresent()) {
            HoaDon hoaDon = optionalHoaDon.get();

            // Save payment history and update order status
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setNgayTao(new Timestamp(System.currentTimeMillis()));
            // Set the person who made the change (you might want to retrieve this information from the current user or a system user)
            lichSuHoaDon.setNguoiTao(nguoiTao);
            lichSuHoaDon.setNoiDung(noiDung);
            lichSuHoaDon.setTrangThai(newTrangThai);
            lichSuHoaDon.setHoaDon(hoaDon);

            // Save the payment history and update the order status
            lichSuHoaDonRepository.save(lichSuHoaDon);
            hoaDon.setTrangThai(newTrangThai);
            hoaDonReponsitory.save(hoaDon);
            if (newTrangThai == 1) {
                List<HoaDonChiTiet> hoaDonChiTietList = hoaDonChiTietRepository.findByHoaDonId(donHangId);
                for (HoaDonChiTiet hoaDonChiTiet : hoaDonChiTietList) {
                    // Gọi phương thức từ repository để giảm số lượng sản phẩm
                    sanPhamChiTietRepository.giamSoLuongSanPham(hoaDonChiTiet.getSanPhamChiTiet().getId(), hoaDonChiTiet.getSoLuong());
                }
            }
            } else {
                // Handle the case when the order is not found
                throw new EntityNotFoundException("Không tìm thấy đơn hàng");
            }

        }



    @Override
    public Page<HoaDonResponse> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return hoaDonReponsitory.getPage(pageable);
    }

    @Override
    public Page<HoaDonResponse> search(Integer pageNo, String search) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaDonReponsitory.searchByKeyword(pageable, search);
    }

    @Override
    public Page<HoaDonResponse> loc(Integer pageNo, String trangThai) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return hoaDonReponsitory.loc(pageable, trangThai);
    }
    @Override
    @Transactional
    public void khongNhanHang(UUID id) {
        List<HoaDonChiTiet> hoaDonChiTietList = hoaDonChiTietRepository.findByHoaDonId(id);
        for (HoaDonChiTiet hoaDonChiTiet : hoaDonChiTietList) {
            sanPhamChiTietRepository.tangSoLuongSanPham(hoaDonChiTiet.getSanPhamChiTiet().getId(), hoaDonChiTiet.getSoLuong());
        }
    }

    @Override
    public List<HoaDon> getThongBao() {
        return hoaDonReponsitory.listthongbao();
    }


}
