package com.example.demo.controller;

import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.service.KhachHangService;
import com.example.demo.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = {"*"})
@RequestMapping("/nhan-vien/")
@RestController
public class NhanVienController {
    @Autowired
    private NhanVienService nhanVienService;

    @GetMapping("get-all")
    public ResponseEntity getAllKhachHang() {
        return new ResponseEntity(nhanVienService.getAll(), HttpStatus.OK);
    }

    @GetMapping("hien-thi")
    public ResponseEntity getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(nhanVienService.getPage(pageNo), HttpStatus.OK);
    }
    @GetMapping("login")
    public ResponseEntity login(@RequestParam(name = "email") String  email,
                                @RequestParam(name = "matKhau") String  matKhau) {
        return new ResponseEntity(nhanVienService.login(email,matKhau), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody NhanVienRequest nhanVienRequest) throws Exception {
        return new ResponseEntity(nhanVienService.add(nhanVienRequest), HttpStatus.OK);
    }

    @PostMapping("import-excel")
    public ResponseEntity importExcel(@RequestBody NhanVien nhanVien) {
        return new ResponseEntity(nhanVienService.importExcel(nhanVien), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(nhanVienService.detail(UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody NhanVien nhanVien, @PathVariable("id") String id) {
        return new ResponseEntity(nhanVienService.update(nhanVien, UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("loc")
    public ResponseEntity loc(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "trangThai") String trangThai) {
        return new ResponseEntity(nhanVienService.loc(pageNo, trangThai), HttpStatus.OK);

    }

    @GetMapping("search")
    public ResponseEntity search(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "keyWord") String keyWord) {
        return new ResponseEntity(nhanVienService.search(pageNo, keyWord), HttpStatus.OK);
    }


}

