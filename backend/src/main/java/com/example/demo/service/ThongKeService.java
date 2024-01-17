package com.example.demo.service;

import com.example.demo.model.response.BieuDoThongKeReponse;
import com.example.demo.model.response.BieuDoTrangThaiReponse;
import com.example.demo.model.response.ThongKeReponse;

import java.util.Date;
import java.util.List;


public interface ThongKeService {
    List<ThongKeReponse> getThongKeTongHop();
    List<BieuDoThongKeReponse> getThongKeTongHopByDateRange(Date startDate, Date endDate);
    List<BieuDoTrangThaiReponse> getThongKeTrangThai();
    List<BieuDoThongKeReponse> getThongKe();
}
