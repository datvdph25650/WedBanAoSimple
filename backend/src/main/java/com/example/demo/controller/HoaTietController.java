package com.example.demo.controller;

import com.example.demo.entity.HoaTiet;
import com.example.demo.service.HoaTietService;
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
@RequestMapping("/hoa-tiet/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class HoaTietController {
    @Autowired
    private HoaTietService hoaTietService;

    @GetMapping("get-all")
    public ResponseEntity getAll() {
        return new ResponseEntity(hoaTietService.getAll(), HttpStatus.OK);

    } @GetMapping("hien-thi")
    public Page<HoaTiet> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return hoaTietService.getPage(pageNo);
    }

    @GetMapping("trang-thai")
    public List<HoaTiet> hienThiTheoTrangThai() {
        return hoaTietService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public HoaTiet detail(@PathVariable("id") String id) {
        return hoaTietService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public HoaTiet add(@RequestBody HoaTiet hoaTiet) {
        return hoaTietService.add(hoaTiet);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody HoaTiet hoaTiet, @PathVariable("id") String id) {
        return new ResponseEntity(hoaTietService.update(hoaTiet, UUID.fromString(id)),HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        hoaTietService.delete(UUID.fromString(id));
    }
}
