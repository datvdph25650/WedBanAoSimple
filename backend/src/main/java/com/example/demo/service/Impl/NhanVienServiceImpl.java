package com.example.demo.service.Impl;

import com.example.demo.entity.ChucVu;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.repository.ChucVuRepository;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.service.NhanVienService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NhanVienServiceImpl implements NhanVienService {

    @Autowired
    private ChucVuRepository chucVuRepository;

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public List<NhanVien> getAll() {
        return nhanVienRepository.findAll();
    }

    @Override
    public Page<NhanVien> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return nhanVienRepository.getALl(pageable);
    }

    @Override
    public NhanVien login(String email, String matKhau) {
        return nhanVienRepository.login(email,matKhau);
    }


    @Override
    public NhanVien add(NhanVienRequest nhanVienRequest) {
        Optional<ChucVu> chucVuOptional = chucVuRepository.findByTen(nhanVienRequest.getTenChucVu());
        if (chucVuOptional.isPresent()) {
            NhanVien nhanVien = NhanVien.builder()
                    .chucVu(chucVuRepository.findById(getId(nhanVienRequest.getTenChucVu())).get())
                    .ma(nhanVienRequest.getMa())
                    .hoTen(nhanVienRequest.getHoTen())
                    .email(nhanVienRequest.getEmail())
                    .matKhau(nhanVienRequest.getMatKhau())
                    .soDienThoai(nhanVienRequest.getSoDienThoai())
                    .gioiTinh(nhanVienRequest.getGioiTinh())
                    .ngaySinh(nhanVienRequest.getNgaySinh())
                    .anhDaiDien(nhanVienRequest.getAnhDaiDien())
                    .ngayTao(nhanVienRequest.getNgayTao())
                    .nguoiTao("Hung")
                    .diaChiCuThe(nhanVienRequest.getDiaChiCuThe())
                    .tinhThanhPho((nhanVienRequest.getTinhThanhPho()))
                    .quanHuyen(nhanVienRequest.getQuanHuyen())
                    .phuongXa(nhanVienRequest.getPhuongXa())
                    .daXoa(nhanVienRequest.getDaXoa())
                    .build();
            sendEmail(nhanVien);
            return nhanVienRepository.save(nhanVien);
        } else {
            ChucVu chucVuSave = ChucVu.builder()
                    .ma("CV001")
                    .ten(nhanVienRequest.getTenChucVu())
                    .ngayTao(nhanVienRequest.getNgayTao())
                    .nguoiTao("Hung")
                    .daXoa(nhanVienRequest.getDaXoa())
                    .build();
            ChucVu chucVu = chucVuRepository.save(chucVuSave);
            NhanVien nhanVien = NhanVien.builder()
                    .chucVu(chucVu)
                    .ma(nhanVienRequest.getMa())
                    .hoTen(nhanVienRequest.getHoTen())
                    .email(nhanVienRequest.getEmail())
                    .matKhau(nhanVienRequest.getMatKhau())
                    .soDienThoai(nhanVienRequest.getSoDienThoai())
                    .gioiTinh(nhanVienRequest.getGioiTinh())
                    .ngaySinh(nhanVienRequest.getNgaySinh())
                    .anhDaiDien(nhanVienRequest.getAnhDaiDien())
                    .ngayTao(nhanVienRequest.getNgayTao())
                    .nguoiTao("Hung")
                    .diaChiCuThe(nhanVienRequest.getDiaChiCuThe())
                    .tinhThanhPho((nhanVienRequest.getTinhThanhPho()))
                    .quanHuyen(nhanVienRequest.getQuanHuyen())
                    .phuongXa(nhanVienRequest.getPhuongXa())
                    .daXoa(nhanVienRequest.getDaXoa())
                    .build();
            sendEmail(nhanVien);
            return nhanVienRepository.save(nhanVien);
        }
    }

    @Override
    public NhanVien importExcel(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }

    @Override
    public NhanVien update(NhanVien nhanVien, UUID id) {
        Optional<NhanVien> optional = nhanVienRepository.findById(id);
        if (optional.isPresent()) {
            optional.map(khachHangUpdate -> {
                khachHangUpdate.setHoTen(nhanVien.getHoTen());
                khachHangUpdate.setNgaySinh(nhanVien.getNgaySinh());
                khachHangUpdate.setGioiTinh(nhanVien.getGioiTinh());
                khachHangUpdate.setEmail(nhanVien.getEmail());
                khachHangUpdate.setSoDienThoai(nhanVien.getSoDienThoai());
                khachHangUpdate.setAnhDaiDien(nhanVien.getAnhDaiDien());
                khachHangUpdate.setDaXoa(nhanVien.getDaXoa());
                khachHangUpdate.setDiaChiCuThe(nhanVien.getDiaChiCuThe());
                khachHangUpdate.setTinhThanhPho(nhanVien.getTinhThanhPho());
                khachHangUpdate.setQuanHuyen(nhanVien.getQuanHuyen());
                khachHangUpdate.setPhuongXa(nhanVien.getPhuongXa());
                return nhanVienRepository.save(khachHangUpdate);
            }).orElse(null);
        }
        return null;
    }

    @Override
    public Page<NhanVien> loc(Integer pageNo, String trangThai) {
        Pageable pageable=PageRequest.of(pageNo,10);
        return nhanVienRepository.loc(pageable,trangThai);
    }

    @Override
    public Page<NhanVien> search(Integer pageNo, String keyWord) {
        Pageable pageable=PageRequest.of(pageNo,10);
        return nhanVienRepository.searchByKeyword(pageable,keyWord);
    }

    private void sendEmail(NhanVien nhanVien) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(nhanVien.getEmail());
            helper.setSubject("Chào mừng bạn đến với cửa hàng Simple");
            helper.setText("Xin chào " + nhanVien.getHoTen() + ",\n\n" +
                    "Chúc mừng bạn đã trở thành nhân viên của cửa hàng chúng tôi.\n" +
                    "Dưới đây là một số thông tin về tài khoản của bạn:\n\n" +
                    "Mã nhân viên: " + nhanVien.getMa() + "\n" +
                    "Mật khẩu: " + nhanVien.getMatKhau() + "\n\n" +
                    "Trân trọng,\n");
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public NhanVien detail(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    public UUID getId(String ten) {
        for (ChucVu chucVu : chucVuRepository.findAll()) {
            if (ten.equals(chucVu.getTen())) {
                return chucVu.getId();
            }
        }
        return null;
    }

}
