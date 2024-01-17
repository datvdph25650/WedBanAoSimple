package com.example.demo.controller;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.service.MaGiamGiaChiTietService;
import com.example.demo.service.MaGiamGiaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ma-giam-gia/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class MaGiamGiaController {

    @Autowired
    private MaGiamGiaService maGiamGiaService;

    @GetMapping("hien-thi")
    public Page<MaGiamGia> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return maGiamGiaService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public ResponseEntity getAllByStatus(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(maGiamGiaService.getAllByStatus(pageNo), HttpStatus.OK);
    }

    @PostMapping("add")
    public MaGiamGia post(@RequestBody MaGiamGia maGiamGia, BindingResult result, Model model) throws Exception {
        maGiamGia.setMa(maGiamGia.getMa().toUpperCase());
        return maGiamGiaService.add(maGiamGia);
    }

    @PutMapping("update/{id}")
    public MaGiamGia update(@RequestBody MaGiamGia maGiamGia, @PathVariable("id") String id) {
        return maGiamGiaService.update(maGiamGia, UUID.fromString(id));
    }
//    @PutMapping("update-so-luong/{id}")
//    public MaGiamGia updateSoLuong(@RequestBody MaGiamGia maGiamGia, @PathVariable("id") String id) {
//        return maGiamGiaService.updateSoLuong(maGiamGia, UUID.fromString(id));
//    }

    @GetMapping("detail/{id}")
    public MaGiamGia detail(@PathVariable("id") String id) {
        return maGiamGiaService.detail(UUID.fromString(id));
    }

    @GetMapping("loc")
    public Page<MaGiamGia> loc(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo,
                               @RequestParam(name = "trangThai") String trangThai,
                               @RequestParam(name = "hinhThuc") String hinhThuc) {
        Integer hinhThucValue = "null".equals(hinhThuc) ? null : Integer.valueOf(hinhThuc);
        Integer trangThaiValue = "null".equals(trangThai) ? null : Integer.valueOf(trangThai);
        return maGiamGiaService.locMaGiamGia(pageNo, trangThaiValue, hinhThucValue);
    }

    @GetMapping("search")
    public Page<MaGiamGia> search(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo,
                                  @RequestParam(name = "keyWord") String keyWord) {
        return maGiamGiaService.searchMaGiamGia(pageNo, keyWord);
    }
}
