package com.example.demo.controller;

import com.example.demo.entity.PhongCach;
import com.example.demo.service.PhongCachService;
import com.example.demo.model.request.KieuDangRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/phong-cach/")
@CrossOrigin(origins = "*", maxAge = 4800, allowCredentials = "false")
public class PhongCachController {

    @Autowired
    private PhongCachService phongCachService;

    @GetMapping("get-all")
    public ResponseEntity getAll() {
        return new ResponseEntity(phongCachService.getAll(), HttpStatus.OK);
    }

    @GetMapping("hien-thi")
    public ResponseEntity getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(phongCachService.getPage(pageNo), HttpStatus.OK);
    }

    @GetMapping("trang-thai")
    public List<PhongCach> hienThiTheoTrangThai() {
        return phongCachService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public PhongCach detail(@PathVariable("id") String id) {
        return phongCachService.getOne(UUID.fromString(id));
    }

    @PostMapping("add")
    public PhongCach add(@RequestBody PhongCach phongCach) {
        return phongCachService.add(phongCach);
    }

    @PutMapping("update/{id}")
    public PhongCach update(@RequestBody PhongCach phongCach, @PathVariable("id") String id) {
        return phongCachService.update(phongCach, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        phongCachService.delete(UUID.fromString(id));
    }
}
