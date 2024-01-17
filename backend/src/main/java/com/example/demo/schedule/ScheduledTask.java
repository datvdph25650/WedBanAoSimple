//package com.example.demo.schedule;
//
//import com.example.demo.entity.MaGiamGia;
//import com.example.demo.repository.MaGiamGiaRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.sql.Timestamp;
//import java.util.List;
//
//@Component
//public class ScheduledTask {
//    @Autowired
//    private MaGiamGiaRepository maGiamGiaRepository;
//
//    @Scheduled(cron = "0 * * * * ?") // Chạy mỗi phút
//    public void performScheduledTask() {
//        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
//        List<MaGiamGia> maGiamGias = maGiamGiaRepository.findAll();
//        maGiamGias.forEach(maGiamGia -> {
//            if (maGiamGia.getNgayBatDau().compareTo(timestamp) < 0) {
//                if (maGiamGia.getNgayKetThuc().compareTo(timestamp) < 0) {
//                    if (maGiamGia.getTrangThai() != 3) {
//                        maGiamGia.setTrangThai(3);
//                        maGiamGiaRepository.save(maGiamGia);
//                    }
//                } else {
//                    if (maGiamGia.getTrangThai() != 2) {
//                        maGiamGia.setTrangThai(2);
//                        maGiamGiaRepository.save(maGiamGia);
//                    }
//                }
//            }
//        });
//
//    }
//}
