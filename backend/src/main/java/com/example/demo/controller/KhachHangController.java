package com.example.demo.controller;

import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = {"*"})
@RequestMapping("/khach-hang/")
@RestController
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @GetMapping("get-all")
    public ResponseEntity getAllKhachHang() {
        return new ResponseEntity(khachHangService.getAll(), HttpStatus.OK);
    }

    @GetMapping("hien-thi")
    public ResponseEntity getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(khachHangService.getPage(pageNo), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody KhachHangRequest khachHangRequest) throws Exception {
        return new ResponseEntity(khachHangService.add(khachHangRequest), HttpStatus.OK);
    }

    @PostMapping("import-excel")
    public ResponseEntity importExcel(@RequestBody KhachHang khachHang)   {
        return new ResponseEntity(khachHangService.importExcel(khachHang), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(khachHangService.detail(UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody KhachHang khachHang, @PathVariable("id") String id) {
        return new ResponseEntity(khachHangService.update(khachHang, UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("loc")
    public ResponseEntity loc(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "trangThai") String trangThai) {
        return new ResponseEntity(khachHangService.loc(pageNo, trangThai), HttpStatus.OK);

    }

    @GetMapping("search")
    public ResponseEntity search(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "keyWord") String keyWord) {
        return new ResponseEntity(khachHangService.search(pageNo, keyWord), HttpStatus.OK);
    }


}

