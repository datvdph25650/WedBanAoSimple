package com.example.demo.controller;

import com.example.demo.entity.SanPham;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/san-pham/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("hien-thi")
    public ResponseEntity hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(sanPhamService.getPage(pageNo), HttpStatus.OK);
    }

    @GetMapping("trang-thai")
    public ResponseEntity hienThiTheoTrangThai() {
        return new ResponseEntity(sanPhamService.getAllByStatus(), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(sanPhamService.detail(UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("find/{name}")
    public ResponseEntity find(@PathVariable("name") String name) {
        return new ResponseEntity(sanPhamService.findbyName(name), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody SanPham sanPham, @PathVariable("id") String id) {
        return new ResponseEntity(sanPhamService.update(sanPham, UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("/loc")
    public ResponseEntity loc(@RequestParam(name = "pageNo", defaultValue = "0") String pageNo,
                              @RequestParam(name = "loc") String loc) {
        return new ResponseEntity(sanPhamService.loc(Integer.valueOf(pageNo), loc), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(name = "pageNo", defaultValue = "0") String pageNo,
                                 @RequestParam(name = "keyword") String keyword) {
        return new ResponseEntity(sanPhamService.search(Integer.valueOf(pageNo), keyword), HttpStatus.OK);
    }

    @GetMapping("/san-pham-moi")
    public ResponseEntity topSanPhamMoi() {
        return new ResponseEntity(sanPhamService.topSanPhamMoi(), HttpStatus.OK);
    }
}

