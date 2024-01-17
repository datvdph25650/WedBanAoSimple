package com.example.demo.controller;

import com.example.demo.entity.KichThuoc;
import com.example.demo.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
@RequestMapping("/kich-thuoc/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class KichThuocController {

    @Autowired
    private KichThuocService kichThuocService;

    @GetMapping("get-all")
    public List<KichThuoc> getAll() {
        return kichThuocService.getAll();
    }

    @GetMapping("hien-thi")
    public Page<KichThuoc> getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return kichThuocService.getPage(pageNo);
    }

    @GetMapping("trang-thai")
    public List<KichThuoc> hienThiTheoTrangThai() {
        return kichThuocService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public KichThuoc detail(@PathVariable("id") String id) {
        return kichThuocService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public KichThuoc add(@RequestBody KichThuoc kichThuoc) {
        return kichThuocService.add(kichThuoc);
    }

    @PutMapping("update/{id}")
    public KichThuoc update(@RequestBody KichThuoc kichThuoc, @PathVariable("id") String id) {
        return kichThuocService.update(kichThuoc, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        kichThuocService.delete(UUID.fromString(id));
    }
}
