package com.example.demo.controller;

import com.example.demo.model.response.BieuDoThongKeReponse;
import com.example.demo.model.response.ThongKeReponse;
import com.example.demo.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.xml.crypto.Data;
import java.util.List;

@RestController
@RequestMapping("/thong-ke/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")


public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/hien-thi")
    public ResponseEntity getTongDoanhThu() {
        return new ResponseEntity(thongKeService.getThongKeTongHop(), HttpStatus.OK);
    }
    @GetMapping("/hien-thi-2")
    public ResponseEntity getThongKeTrangThai() {
        return new ResponseEntity(thongKeService.getThongKeTrangThai(), HttpStatus.OK);
    }
    @GetMapping("/hien-thi-3")
    public ResponseEntity getThongKe() {
        return new ResponseEntity(thongKeService.getThongKe(), HttpStatus.OK);
    }
    @GetMapping("/hien-thi-1")
    public ResponseEntity<List<BieuDoThongKeReponse>> getTongDoanhThu2(
            @RequestParam(name = "startDate") String startDateString,
            @RequestParam(name = "endDate") String endDateString
    ) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = sdf.parse(startDateString);
            Date endDate = sdf.parse(endDateString);

            List<BieuDoThongKeReponse> thongKeData = thongKeService.getThongKeTongHopByDateRange(startDate, endDate);
            return new ResponseEntity<>(thongKeData, HttpStatus.OK);
        } catch (ParseException e) {
            // Xử lý lỗi chuyển đổi ngày tháng
            e.printStackTrace();
            return new ResponseEntity("Invalid date format", HttpStatus.BAD_REQUEST);
        }
    }
}


