package com.example.demo.controller;

import com.example.demo.entity.CoAo;
import com.example.demo.service.CoAoService;
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
@RequestMapping("/co-ao/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class CoAoController {

    @Autowired
    private CoAoService coAoService;

    @GetMapping("get-all")
    public List<CoAo> getAll() {
        return coAoService.getAll();
    }

    @GetMapping("hien-thi")
    public Page<CoAo> getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return coAoService.getPage(pageNo);
    }

    @GetMapping("trang-thai")
    public List<CoAo> hienThiTheoTrangThai() {
        return coAoService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(coAoService.detail(UUID.fromString(id)), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody CoAo coAo) {
        return new ResponseEntity(coAoService.add(coAo), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody CoAo coAo, @PathVariable("id") String id) {
        return new ResponseEntity(coAoService.update(coAo, UUID.fromString(id)), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        coAoService.delete(UUID.fromString(id));
    }
}
