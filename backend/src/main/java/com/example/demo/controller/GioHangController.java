package com.example.demo.controller;

import com.example.demo.model.request.GioHangThemNhieuRequset;
import com.example.demo.model.request.GioHangRequset;
import com.example.demo.model.response.GioHangChiTietReponse;
import com.example.demo.model.response.GioHangReponse;
import com.example.demo.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/gio-hang/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class GioHangController {
    @Autowired
    private GioHangService gioHangService;

    @PostMapping("them")
    public ResponseEntity<Map<String, Object>> themSanPhamVaKhachHangVaoGioHang(@RequestBody GioHangRequset request) {
        gioHangService.GioHang(request.getSanPhamChiTietId(), request.getKhachHangId(), request.getSoLuong());

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Sản phẩm đã được thêm vào giỏ hàng ");

        return ResponseEntity.ok(response);
    }
    @PostMapping("/them-nhieu")
    public ResponseEntity<String> themSanPhamNhieu(@RequestBody GioHangThemNhieuRequset gioHangRequest) {
        try {
            gioHangService.GioHangThemNhieu(gioHangRequest.getSanPhamChiTietIds(),gioHangRequest.getKhachHangId(),gioHangRequest.getSoLuong());
            return new ResponseEntity<>("Thêm sản phẩm vào giỏ hàng thành công", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi khi thêm sản phẩm vào giỏ hàng: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//    @PostMapping("themsanpham")
//    public ResponseEntity<Map<String, Object>> themSanPhamVaoGioHangChiTiet(@RequestBody GioHangThemNhieuRequset gioHangThemNhieuRequset) {
//        gioHangService.GioHangK(gioHangThemNhieuRequset.getSanPhamChiTietId(), gioHangThemNhieuRequset.getSoLuong());
//        Map<String, Object> response = new HashMap<>();
//        response.put("status", "success");
//        response.put("message", "Sản phẩm đã được thêm vào giỏ hàng ");
//
//        return ResponseEntity.ok(response);
//    }

    @DeleteMapping("xoa")
    public ResponseEntity<?> xoaGioHang(@RequestParam UUID gioHangId) {
        gioHangService.Xoa(gioHangId);
        return ResponseEntity.ok("Giỏ hàng đã được xóa.");
    }
    @GetMapping("hien-thi/{id}")
    public ResponseEntity<List<GioHangChiTietReponse>> getAll( @PathVariable UUID id){
        List<GioHangChiTietReponse> gioHangChiTietReponses=gioHangService.getAll(id);
        return ResponseEntity.ok(gioHangChiTietReponses);

    }
    @GetMapping("hien-thiN")
    public ResponseEntity<List<GioHangReponse>> getAllK(){
        List<GioHangReponse> gioHangChiTietReponses=gioHangService.getAllK();
        return ResponseEntity.ok(gioHangChiTietReponses);

    }

    @DeleteMapping("/xoakh/{id}")
    public ResponseEntity<Map<String, String>> xoaByKH(@PathVariable UUID id) {
        try {
            gioHangService.deleteByKH(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Xóa giỏ hàng thành công");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> xoa(@PathVariable UUID id) {
        try {
            gioHangService.delete(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Xóa giỏ hàng thành công");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateCartItem(@RequestBody GioHangRequset gioHangChiTietRequest) {
        try {
            gioHangService.update(gioHangChiTietRequest);
            return ResponseEntity.ok("Cập nhật giỏ hàng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi cập nhật giỏ hàng");
        }
    }
//    @PutMapping("/updateNoLogin")
//    public ResponseEntity<?> updateCartItemN(@RequestBody GioHangThemNhieuRequset gioHangChiTietRequest) {
//        try {
//            gioHangService.updateNoLogin(gioHangChiTietRequest);
//            return ResponseEntity.ok("Cập nhật giỏ hàng thành công");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi cập nhật giỏ hàng");
//        }
//    }
}
