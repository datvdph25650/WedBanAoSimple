package com.example.demo.controller;

import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.service.TaiKhoanService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/accout/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;
    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("loginfake")
    public ResponseEntity<?> login(@RequestBody KhachHang khachHang) {
        KhachHang existingUser = taiKhoanService.login(khachHang.getEmail());

        if (existingUser != null && existingUser.getMatKhau().equals(khachHang.getMatKhau())) {
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

    }
    @PostMapping("/login")
    public ResponseEntity<?> loginreal(@RequestBody KhachHang khachHang) {
        String emailOrPhone = khachHang.getEmail();
        String password = khachHang.getMatKhau();

        KhachHang authenticatedUser = taiKhoanService.loginreal(emailOrPhone, password);

        if (authenticatedUser != null) {
            // Đăng nhập thành công, trả về thông tin khách hàng
            return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
        } else {
            // Đăng nhập thất bại
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestParam String email,
            @RequestParam String currentPassword,
            @RequestParam String newPassword) {
        Map<String, String> response = new HashMap<>();

        if (taiKhoanService.checkPassword(email, currentPassword)) {
            taiKhoanService.updatePassword(email, newPassword);
            response.put("message", "Password has been changed");
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Incorrect password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }



    @PostMapping("forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) throws MessagingException {
        String email = request.get("email");
        Optional<KhachHang> optionalKhachHang = taiKhoanService.forgetPassword(email);
        if (optionalKhachHang.isPresent()) {
            String resetToken = UUID.randomUUID().toString();
            KhachHang khachHang = optionalKhachHang.get();
            khachHang.setResetToken(resetToken);
            taiKhoanService.save(khachHang);
            String resetUrl = "http://127.0.0.1:5500/src/pages/user.html#/dat-lai-mat-khau?token=" + resetToken;
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("[SIMPLE] - ĐỔI MẬT KHẨU");
            String emailContent = "Xin chào quý khách " + ",\n\n" +
                    "Click vào đường dẫn dưới đây để thiết lập mật khẩu tài khoản của bạn tại SIMPLE.\n"
                    + "<br><br>"
                    + "Nếu bạn không có yêu cầu thay đổi mật khẩu\n\n"
                    + "<br>"
                    + "xin hãy xóa email này để bảo mật thông tin. " + "\n"
                    + "<br><br>"
                    + "<a href=\"" + resetUrl + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;\">Reset Password</a>"
                    + "<br><br>"
                    + "<hr>"
                    + "Trân trọng,\n";
            helper.setText(emailContent, true);

            javaMailSender.send(message);
            return new ResponseEntity<>(optionalKhachHang, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Email not found.", HttpStatus.UNAUTHORIZED);
        }


    }

    @PostMapping("reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestBody Map<String, String> request) {

        String newPassword = request.get("newPassword");

        Optional<KhachHang> optionalKhachHang = taiKhoanService.findByResetToken(token);

        if (optionalKhachHang.isPresent()) {
            KhachHang khachHang = optionalKhachHang.get();
            khachHang.setMatKhau(newPassword);
            khachHang.setResetToken(null); // Clear reset token after password reset
            taiKhoanService.save(khachHang);

            return new ResponseEntity<>(optionalKhachHang, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Email not found.", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("singup")
    public ResponseEntity add(@RequestBody KhachHang khachHang) throws Exception {
        return new ResponseEntity(taiKhoanService.singup(khachHang), HttpStatus.OK);
    }


}


