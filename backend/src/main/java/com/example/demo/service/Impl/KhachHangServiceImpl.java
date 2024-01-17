package com.example.demo.service.Impl;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.response.KhachHangReponse;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.KhachHangService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private JavaMailSender javaMailSender;


    @Override
    public List<KhachHang> getAll() {
        return khachHangRepository.findAll();
    }

    @Override
    public Page<KhachHang> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return khachHangRepository.getALl(pageable);
    }

    @Override
    public KhachHang add(KhachHangRequest khachHangRequest) {
        KhachHang khachHangSave = KhachHang.builder()
                .ma(khachHangRequest.getMa())
                .hoTen(khachHangRequest.getHoTen())
                .email(khachHangRequest.getEmail())
                .anhDaiDien(khachHangRequest.getAnhDaiDien())
                .matKhau(khachHangRequest.getMatKhau())
                .soDienThoai(khachHangRequest.getSoDienThoai())
                .gioiTinh(khachHangRequest.getGioiTinh())
                .ngaySinh(khachHangRequest.getNgaySinh())
                .ngayTao(khachHangRequest.getNgayTao())
                .nguoiTao("Hưng")
                .daXoa(Boolean.valueOf(khachHangRequest.getDaXoa()))
                .build();
        KhachHang KhachHang = khachHangRepository.save(khachHangSave);
        sendEmail(KhachHang);
        DiaChi diaChi = DiaChi.builder()
                .khachHang(KhachHang)
                .diaChiCuThe(khachHangRequest.getDiaChiCuThe())

                .diaChiMacDinh(Boolean.valueOf(khachHangRequest.getDiaChiMacDinh()))
                .tenKhachHang(khachHangRequest.getHoTen())
                .soDienThoai(khachHangRequest.getSoDienThoai())
                .tinhThanhPho(khachHangRequest.getTinhThanhPho())

                .quanHuyen(khachHangRequest.getQuanHuyen())
                .phuongXa(khachHangRequest.getPhuongXa())
                .ngayTao(khachHangRequest.getNgayTao())
                .nguoiTao("Hưng")
                .daXoa(Boolean.valueOf(khachHangRequest.getDaXoa()))
                .build();
        diaChiRepository.save(diaChi);
        return null;
    }

    @Override
    public KhachHang importExcel(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang update(KhachHang khachHang, UUID id) {
        Optional<KhachHang> optionalKhachHang = khachHangRepository.findById(id);
        if (optionalKhachHang.isPresent()) {
            optionalKhachHang.map(khachHangUpdate -> {
                khachHangUpdate.setHoTen(khachHang.getHoTen());
                khachHangUpdate.setNgaySinh(khachHang.getNgaySinh());
                khachHangUpdate.setGioiTinh(khachHang.getGioiTinh());
                khachHangUpdate.setEmail(khachHang.getEmail());
                khachHangUpdate.setSoDienThoai(khachHang.getSoDienThoai());
                khachHangUpdate.setAnhDaiDien(khachHang.getAnhDaiDien());
                khachHangUpdate.setDaXoa(khachHang.getDaXoa());
                return khachHangRepository.save(khachHangUpdate);
            }).orElse(null);
        }
        return null;
    }

    private void sendEmail(KhachHang khachHang) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(khachHang.getEmail());
            helper.setSubject("Chào mừng bạn đến với cửa hàng Simple");
            helper.setText("Xin chào " + khachHang.getHoTen() + ",\n\n" +
                    "Cảm ơn bạn đã trở thành khách hàng của cửa hàng chúng tôi.\n" +
                    "Dưới đây là một số thông tin về tài khoản của bạn:\n\n" +
                    "Mã khách hàng: " + khachHang.getMa() + "\n" +
                    "Mật khẩu: " + khachHang.getMatKhau() + "\n\n" +
                    "Trân trọng,\n");

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Page<KhachHang> loc(Integer pageNo, String trangThai) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return khachHangRepository.loc(pageable, trangThai);
    }

    @Override
    public Page<KhachHang> search(Integer pageNo, String keyWord) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return khachHangRepository.searchByKeyword(pageable, keyWord);
    }

    @Override
    public KhachHang detail(UUID id) {
        return khachHangRepository.findById(id).get();
    }


}
