package com.example.demo.service;

import com.example.demo.entity.KhachHang;

import java.util.Optional;
import java.util.UUID;

public interface TaiKhoanService {
    KhachHang login(String email);

    KhachHang loginreal(String sdt_email,String mat_khau);

    Optional<KhachHang> forgetPassword(String email) ;
    void save(KhachHang khachHang);
    Optional<KhachHang> findByResetToken(String resetToken);
    KhachHang singup(KhachHang khachHang) throws Exception ;

    boolean checkPassword(String username, String currentPassword);
    void updatePassword(String username, String newPassword);


}
