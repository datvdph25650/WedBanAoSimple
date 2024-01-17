package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import javax.xml.crypto.Data;
import java.sql.Timestamp;

public interface BieuDoThongKeReponse {

    @Value("#{target.ngay}")
    String getNgay();

    @Value("#{target.tong_doanh_thu}")
    Double getTongDoanhThu();

}
