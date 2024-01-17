package com.example.demo.repository;

import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface TaiKhoanRepository extends JpaRepository<KhachHang, UUID> {
    KhachHang findByEmail(String email);
    Optional<KhachHang> findKhachHangByEmail(String email);
    Optional<KhachHang> findKhachHangBySoDienThoai(String sodienthoai);
    Optional<KhachHang> findByResetToken(String resetToken);
    @Query(value="""

SELECT * FROM khach_hang kh WHERE (kh.email = :emailOrPhone OR kh.so_dien_thoai = :emailOrPhone) AND kh.mat_khau = :password

""",nativeQuery = true)
    KhachHang findByEmailOrSoDienThoaiAndMatKhau(
            @Param("emailOrPhone") String emailOrPhone,
            @Param("password") String password
    );


}
