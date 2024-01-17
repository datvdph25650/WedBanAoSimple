package com.example.demo.controller;

import com.example.demo.entity.DiaChi;
import com.example.demo.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/dia-chi/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class DiaChiController {

    @Autowired
    private DiaChiService diaChiService;

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(diaChiService.detailDiaChi(UUID.fromString(id)), HttpStatus.OK);
    }

    @PostMapping("add/{id}")
    public ResponseEntity add(@RequestBody DiaChi diaChi, @PathVariable("id") String id) {
        return new ResponseEntity(diaChiService.add(diaChi, UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody DiaChi diaChi, @PathVariable("id") String id) {
        return new ResponseEntity(diaChiService.update(diaChi, UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("update-ma-dinh/{id}")
    public ResponseEntity updateMacDinh(@RequestBody DiaChi diaChi, @PathVariable("id") String id) {
        return new ResponseEntity(diaChiService.updateMacDinh(diaChi, UUID.fromString(id)), HttpStatus.OK);
    }

}
