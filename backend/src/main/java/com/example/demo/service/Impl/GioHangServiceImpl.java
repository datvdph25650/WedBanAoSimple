package com.example.demo.service.Impl;

import com.example.demo.entity.GioHang;
import com.example.demo.entity.GioHangChiTiet;
import com.example.demo.entity.KhachHang;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.GioHangThemNhieuRequset;
import com.example.demo.model.request.GioHangRequset;
import com.example.demo.model.response.GioHangChiTietReponse;
import com.example.demo.model.response.GioHangReponse;
import com.example.demo.repository.*;
import com.example.demo.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class GioHangServiceImpl implements GioHangService {
    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    @Autowired
    private GioHangChiTietRepository gioHangChiTietRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    @Override
    @Transactional
    public void GioHang(UUID sanPhamChiTietId, UUID khachHangId, Integer soLuong) {
        // Lấy thông tin khách hàng từ khóa chính (ID).
        KhachHang khachHang = getKhachHangById(khachHangId);

        // Lấy thông tin sản phẩm chi tiết từ khóa chính (ID).
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(sanPhamChiTietId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));

        // Kiểm tra số lượng tồn kho.
        int soLuongMoi = soLuong;
        int tonKho = sanPhamChiTiet.getSoLuong();

        if (soLuongMoi > tonKho) {
            throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm");
        }

        // Tạo mới đối tượng GioHang.
        GioHang gioHang = GioHang.builder().ten("GioHang").khachHang(khachHang).build();


        // Tìm kiếm GioHangChiTiet bằng Id của SanPhamChiTiet.
        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.findBySanPhamChiTiet_Id(sanPhamChiTietId);

        if (gioHangChiTiet != null) {
            // Nếu sản phẩm chi tiết đã tồn tại trong giỏ hàng chi tiết, kiểm tra số lượng mới.
            int soLuongMoiTrongGioHang = gioHangChiTiet.getSoLuong() + soLuongMoi;
            if (soLuongMoiTrongGioHang > tonKho) {
                throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm trong giỏ hàng");
            }

            // Cập nhật số lượng trong giỏ hàng chi tiết.
            gioHangChiTiet.setSoLuong(soLuongMoiTrongGioHang);
            gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia().multiply(BigDecimal.valueOf(soLuongMoiTrongGioHang)));
            gioHangChiTietRepository.save(gioHangChiTiet);
        } else {
            // Nếu sản phẩm chi tiết chưa tồn tại trong giỏ hàng chi tiết, tạo mới đối tượng GioHangChiTiet.

            gioHangChiTiet = new GioHangChiTiet();
            gioHangChiTiet.setSoLuong(soLuongMoi);
            gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia().multiply(BigDecimal.valueOf(soLuongMoi)));
            gioHangChiTiet.setGioHang(gioHang);
            gioHangChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
            gioHangRepository.save(gioHang);
            gioHangChiTietRepository.save(gioHangChiTiet);

        }

        // Liên kết đối tượng GioHang với khách hàng và lưu đối tượng GioHang.
        gioHang.setKhachHang(khachHang);

    }
    public void GioHangThemNhieu(List<UUID> sanPhamChiTietIds, UUID khachHangId, Integer soLuong) {
        // Lấy thông tin khách hàng từ khóa chính (ID).
        KhachHang khachHang = getKhachHangById(khachHangId);

        for (UUID sanPhamChiTietId : sanPhamChiTietIds) {
            // Lấy thông tin sản phẩm chi tiết từ khóa chính (ID).
            SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(sanPhamChiTietId)
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));

            // Kiểm tra số lượng tồn kho.
            int soLuongMoi = soLuong;
            int tonKho = sanPhamChiTiet.getSoLuong();

            if (soLuongMoi > tonKho) {
                throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm");
            }

            // Tạo mới đối tượng GioHang.
            GioHang gioHang = GioHang.builder().ten("GioHang").khachHang(khachHang).build();

            // Tìm kiếm GioHangChiTiet bằng Id của SanPhamChiTiet.
            GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.findBySanPhamChiTiet_Id(sanPhamChiTietId);

            if (gioHangChiTiet != null) {
                // Nếu sản phẩm chi tiết đã tồn tại trong giỏ hàng chi tiết, kiểm tra số lượng mới.
                int soLuongMoiTrongGioHang = gioHangChiTiet.getSoLuong() + soLuongMoi;
                if (soLuongMoiTrongGioHang > tonKho) {
                    throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm trong giỏ hàng");
                }

                // Cập nhật số lượng trong giỏ hàng chi tiết.
                gioHangChiTiet.setSoLuong(soLuongMoiTrongGioHang);
                gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia().multiply(BigDecimal.valueOf(soLuongMoiTrongGioHang)));
                gioHangChiTietRepository.save(gioHangChiTiet);
            } else {
                // Nếu sản phẩm chi tiết chưa tồn tại trong giỏ hàng chi tiết, tạo mới đối tượng GioHangChiTiet.

                gioHangChiTiet = new GioHangChiTiet();
                gioHangChiTiet.setSoLuong(soLuongMoi);
                gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia().multiply(BigDecimal.valueOf(soLuongMoi)));
                gioHangChiTiet.setGioHang(gioHang);
                gioHangChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
                gioHangRepository.save(gioHang);
                gioHangChiTietRepository.save(gioHangChiTiet);

            }

            // Liên kết đối tượng GioHang với khách hàng và lưu đối tượng GioHang.
            gioHang.setKhachHang(khachHang);
        }
    }



    @Override
    public void GioHangK(UUID sanPhamChiTietId, Integer soLuong) {

            // Lấy thông tin sản phẩm chi tiết từ khóa chính (ID).
            SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(sanPhamChiTietId)
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
        GioHang gioHang = GioHang.builder().ten("GioHang").build();


            // Kiểm tra số lượng tồn kho.
            int tonKho = sanPhamChiTiet.getSoLuong();

            if (soLuong > tonKho) {
                throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm");
            }

            // Tạo mới đối tượng GioHangChiTiet.
            GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.findBySanPhamChiTiet_Id(sanPhamChiTietId);

            if (gioHangChiTiet != null) {
                // Nếu sản phẩm chi tiết đã tồn tại trong giỏ hàng chi tiết, kiểm tra số lượng mới.
                int soLuongMoiTrongGioHang = gioHangChiTiet.getSoLuong() + soLuong;
                if (soLuongMoiTrongGioHang > tonKho) {
                    throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm trong giỏ hàng");
                }

                // Cập nhật số lượng trong giỏ hàng chi tiết.
                gioHangChiTiet.setSoLuong(soLuongMoiTrongGioHang);
                gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia().multiply(BigDecimal.valueOf(soLuongMoiTrongGioHang)));
                gioHangChiTietRepository.save(gioHangChiTiet);
            } else {
                // Nếu sản phẩm chi tiết chưa tồn tại trong giỏ hàng chi tiết, tạo mới đối tượng GioHangChiTiet.
                gioHangChiTiet = new GioHangChiTiet();
                gioHangChiTiet.setSoLuong(soLuong);
                gioHangChiTiet.setGioHang(gioHang);
                gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia().multiply(BigDecimal.valueOf(soLuong)));
                gioHangChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
                gioHangRepository.save(gioHang);
                gioHangChiTietRepository.save(gioHangChiTiet);


            }
        }





    @Override
    public void Xoa(UUID gioHangId) {
        gioHangRepository.deleteById(gioHangId);
    }

    @Override
    public KhachHang getKhachHangById(UUID id) {
        return taiKhoanRepository.findById(id).orElse(null);
    }

    @Override
    public List<GioHangChiTietReponse> getAll(UUID id) {
        return gioHangChiTietRepository.getAll(id);
    }

    @Override
    public List<GioHangReponse> getAllK() {
        return gioHangChiTietRepository.getAllK();
    }


    @Override
    @Transactional
    public void deleteByKH(UUID id) {
        List<GioHang> gioHang = gioHangRepository.findAllByKhachHangId(id);

        for (int i = 0; i < gioHang.size(); i++) {
            gioHangChiTietRepository.deleteByGioHang(gioHang.get(i));
        }

        gioHangRepository.deleteByKhachHangId(id);

    }

    @Override
    @Transactional
    public void delete(UUID id) {
        GioHang gioHang = gioHangRepository.findById(id) .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        gioHangChiTietRepository.deleteByGioHang(gioHang);

        gioHangRepository.deleteById(id);

    }

    @Override
    public void update(GioHangRequset gioHangRequset) {
        UUID goiHangChiTietId = gioHangRequset.getGioHangChiTietId();
        int soLuongMoi = gioHangRequset.getSoLuong();

        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.findById(goiHangChiTietId)
                .orElseThrow(() -> new RuntimeException("Gio hàng chi tiết không tồn tại"));

        // Lấy thông tin số lượng tồn kho từ sản phẩm chi tiết
        int tonKho = gioHangChiTiet.getSanPhamChiTiet().getSoLuong();

        // Kiểm tra xem số lượng mới có nhỏ hơn hoặc bằng tồn kho không
        if (soLuongMoi > tonKho) {
            throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm");
        }

        // Cập nhật thông tin số lượng và đơn giá
        gioHangChiTiet.setSoLuong(soLuongMoi);
        BigDecimal donGiaBanDau = gioHangChiTiet.getSanPhamChiTiet().getDonGia();
        BigDecimal donGiaMoi = donGiaBanDau.multiply(BigDecimal.valueOf(soLuongMoi));
        gioHangChiTiet.setDonGia(donGiaMoi);

        gioHangChiTietRepository.save(gioHangChiTiet);
    }

//    @Override
//    public void updateNoLogin(GioHangThemNhieuRequset gioHangThemNhieuRequset) {
//        UUID goiHangChiTietId = gioHangThemNhieuRequset.getGioHangChiTietId();
//        int soLuongMoi = gioHangThemNhieuRequset.getSoLuong();
//
//        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.findById(goiHangChiTietId)
//                .orElseThrow(() -> new RuntimeException("Gio hàng chi tiết không tồn tại"));
//
//        // Lấy thông tin số lượng tồn kho từ sản phẩm chi tiết
//        int tonKho = gioHangChiTiet.getSanPhamChiTiet().getSoLuong();
//
//        // Kiểm tra xem số lượng mới có nhỏ hơn hoặc bằng tồn kho không
//        if (soLuongMoi > tonKho) {
//            throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm");
//        }
//
//        // Cập nhật thông tin số lượng và đơn giá
//        gioHangChiTiet.setSoLuong(soLuongMoi);
//        BigDecimal donGiaBanDau = gioHangChiTiet.getSanPhamChiTiet().getDonGia();
//        BigDecimal donGiaMoi = donGiaBanDau.multiply(BigDecimal.valueOf(soLuongMoi));
//        gioHangChiTiet.setDonGia(donGiaMoi);
//
//        gioHangChiTietRepository.save(gioHangChiTiet);
//
//    }


}
