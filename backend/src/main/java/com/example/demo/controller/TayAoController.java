package com.example.demo.controller;

import com.example.demo.entity.TayAo;
import com.example.demo.service.TayAoService;
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
@RequestMapping("/tay-ao/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class TayAoController {

    @Autowired
    private TayAoService tayAoService;

    @GetMapping("get-all")
    public List<TayAo> getAll() {
        return tayAoService.getAll();
    }

    @GetMapping("hien-thi")
    public Page<TayAo> getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return tayAoService.getPage(pageNo);
    }

    @GetMapping("trang-thai")
    public List<TayAo> hienThiTheoTrangThai() {
        return tayAoService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(tayAoService.detail(UUID.fromString(id)), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody TayAo tayAo) {
        return new ResponseEntity(tayAoService.add(tayAo), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody TayAo tayAo, @PathVariable("id") String id) {
        return new ResponseEntity(tayAoService.update(tayAo, UUID.fromString(id)), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        tayAoService.delete(UUID.fromString(id));
    }
}
