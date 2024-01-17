package com.example.demo.controller;

import com.example.demo.model.request.HinhThucThanhToanRequest;
import com.example.demo.service.HinhThucThanhToanService;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/hinh-thuc-thanh-toan/")
public class HinhThucThanhToanController {

    @Autowired
    private HinhThucThanhToanService hinhThucThanhToanService;

    @PostMapping("add")
    public ResponseEntity add(@RequestBody HinhThucThanhToanRequest hinhThucThanhToanRequest) {
        return new ResponseEntity(hinhThucThanhToanService.add(hinhThucThanhToanRequest), HttpStatus.OK);
    }
}
