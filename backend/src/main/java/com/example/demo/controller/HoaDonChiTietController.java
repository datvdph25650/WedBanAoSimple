package com.example.demo.controller;


import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.model.request.HoaDonChiTietRequest;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/hoa-don-chi-tiet/")
public class HoaDonChiTietController {

    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    @GetMapping("hien-thi/{ma}")
    public ResponseEntity hienThiGioHang(@RequestParam(value = "pageNo", defaultValue = "0") String pageNo, @PathVariable("ma") String ma) {
        return new ResponseEntity(hoaDonChiTietService.getGioHang(Integer.valueOf(pageNo), ma), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@RequestParam(value = "pageNo", defaultValue = "0") String pageNo, @PathVariable("id") String id) {
        return new ResponseEntity(hoaDonChiTietService.detail(Integer.valueOf(pageNo), UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("tinh-tong/{id}")
    public ResponseEntity hienThi(@PathVariable("id") String ma) {
        return new ResponseEntity(hoaDonChiTietService.getByMa(UUID.fromString(ma)),HttpStatus.OK);
    }

    @PostMapping("add")
    public HoaDonChiTiet add(@RequestBody HoaDonChiTietRequest hoaDonChiTietRequest) {
        System.out.println(hoaDonChiTietRequest);
        return hoaDonChiTietService.add(hoaDonChiTietRequest);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody HoaDonChiTietRequest hoaDonChiTietRequest, @PathVariable("id") String id) {
        return new ResponseEntity(hoaDonChiTietService.update(hoaDonChiTietRequest, UUID.fromString(id)), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable("id") String id) {
        return new ResponseEntity(hoaDonChiTietService.delete(UUID.fromString(id)), HttpStatus.OK);
    }
}
