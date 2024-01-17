package com.example.demo.controller;

import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.model.request.MaGiamGiaChiTietRequest;
import com.example.demo.model.response.MaGiamGiaReponse;
import com.example.demo.service.MaGiamGiaChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ma-giam-gia-chi-tiet/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class MaGiamGiaChiTietController {
    @Autowired
    private MaGiamGiaChiTietService maGiamGiaChiTietService;

    @GetMapping("hien-thi/{id}")
    public ResponseEntity hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @PathVariable("id") String id) {
        return new ResponseEntity(maGiamGiaChiTietService.getPage(pageNo, UUID.fromString(id)), HttpStatus.OK);
    }
    @GetMapping("detail/{id}")
    public ResponseEntity detail( @PathVariable("id") String id) {
        return new ResponseEntity(maGiamGiaChiTietService.detail(UUID.fromString(id)), HttpStatus.OK);
    }
    @GetMapping("hoa-donid")
    public ResponseEntity<List<MaGiamGiaReponse>> getMaGiamGiaChiTietByIdHd(@RequestParam UUID id) {
        List<MaGiamGiaReponse> result = maGiamGiaChiTietService.getidHd(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



    @PostMapping("add")
    public ResponseEntity post(@RequestBody MaGiamGiaChiTietRequest maGiamGiaChiTietRequest) {
        return new ResponseEntity(maGiamGiaChiTietService.add(maGiamGiaChiTietRequest),HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public MaGiamGiaChiTiet update(@RequestBody MaGiamGiaChiTiet maGiamGiaChiTiet, @PathVariable("id") String id) {
        return maGiamGiaChiTietService.update(maGiamGiaChiTiet, UUID.fromString(id));
    }

}
