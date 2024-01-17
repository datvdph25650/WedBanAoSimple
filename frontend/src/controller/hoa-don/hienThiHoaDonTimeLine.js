window.hienThiHoaDonTimeLineController = function (
  $http,
  $scope,
  $location,
  $rootScope,
  $timeout,
  $window,
  $httpParamSerializerJQLike
) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.filteredHoaDonList = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.maxVisiblePages = 3;

  $scope.getLocHoaDon = function () {
    $scope.beautifyDate = function (date) {
      // Sử dụng Moment.js để định dạng ngày tháng
      return moment(date).format("hh:mm A, DD/MM/YYYY");
    };

    $scope.mergeDuplicateOr = function (dh) {
      var mergedOrders = {}; // Đối tượng để gộp các đơn hàng
      var allOrders = []; // Mảng để hiển thị tất cả các đơn hàng

      for (var i = 0; i < dh.length; i++) {
        var donHang = dh[i];

        if (mergedOrders[donHang.hoaDonId]) {
          // Nếu đơn hàng đã tồn tại, cập nhật trạng thái và tổng tiền
          mergedOrders[donHang.hoaDonId].trangThai = donHang.trangThai; // Gộp trangThai
          mergedOrders[donHang.hoaDonId].tongTien = donHang.tongTien;
          mergedOrders[donHang.hoaDonId].phiShip = donHang.phiShip;
          mergedOrders[donHang.hoaDonId].loaiHoaDon = donHang.loaiHoaDon;
          mergedOrders[donHang.hoaDonId].maHoaDon = donHang.maHoaDon;
          mergedOrders[donHang.hoaDonId].diaChi = donHang.diaChi;
          mergedOrders[donHang.hoaDonId].tenKhachHang = donHang.tenKhachHang;
          mergedOrders[donHang.hoaDonId].soDienThoai = donHang.soDienThoai;
          mergedOrders[donHang.hoaDonId].ngayThanhToan = donHang.ngayThanhToan;
          // Gộp tổng tiền
          // Gộp sản phẩm vào danh sách sản phẩm của đơn hàng đã gộp
          mergedOrders[donHang.hoaDonId].products.push(donHang);
        } else {
          // Nếu đơn hàng chưa tồn tại, tạo một bản sao và thêm vào đối tượng đã gộp
          mergedOrders[donHang.hoaDonId] = {
            hoaDonId: donHang.hoaDonId,
            trangThai: donHang.trangThai,
            loaiHoaDon: donHang.loaiHoaDon,
            phiShip: donHang.phiShip,
            diaChi: donHang.diaChi,
            maHoaDon: donHang.maHoaDon,
            tenKhachHang: donHang.tenKhachHang,
            soDienThoai: donHang.soDienThoai,
            tongTien: donHang.tongTien,
            ngayThanhToan: donHang.ngayThanhToan,
            products: [donHang], // Tạo một mảng chứa sản phẩm của đơn hàng mới
          };
        }

        // Thêm đơn hàng vào mảng hiển thị tất cả các đơn hàng
        allOrders.push(donHang);
      }

      // Chuyển đối tượng gộp thành một mảng để hiển thị trong HTML
      $scope.donHangListMerged = Object.values(mergedOrders);
      console.log($scope.donHangListMerged);
      $scope.allOrders = allOrders;
    };
    $scope.statusMapping = {
      0: "Đơn hàng đang chờ xác nhận",
      1: "Đơn hàng đã xác nhận thành công",
      2: "Đơn hàng đang giao hàng",
      3: "Đơn hàng đã giao thành công",
      5: "Đơn hàng giao không thành công",
      4: "đã hủy",
      // Thêm các ánh xạ khác nếu cần
    };

    $scope.getStatusColor = function (trangThai) {
      if (trangThai == 0) {
        return "color-cho-xac-nhan";
      } else if (trangThai == 1) {
        return "color-da-xac-nhan";
      } else if (trangThai == 2) {
        return "color-dang-giao-hang";
      } else if (trangThai == 3) {
        return "color-da-giao-thanh-cong";
      } else if (trangThai == 5) {
        return "color-giao-khong-thanh-cong";
      } else if (trangThai == 4) {
        return "color-da-huy";
      } else {
        return ""; // Nếu không phù hợp với bất kỳ trạng thái nào khác
      }
    };
    console.log("idKhachHang", $scope.idKhachHang);

    console.log("idhd", $rootScope.hangg);

    if (!$scope.idKhachHang) {
      console.error("Giá trị idKhachHang không hợp lệ");
      return;
    }

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.idKhachHang,
      idDonHang: $rootScope.hangg,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/hien-thi-hoa-don", data, config)
      .then(function (response) {
        $scope.dh = response.data;
        $scope.mergeDuplicateOr(response.data);
      })
      .catch(function (error) {});
    $http
      .get(hoaDonAPI + "/lich-su/" + $rootScope.hangg)
      .then(function (response) {
        $scope.listlichsu = response.data;
        console.log("idhd", $scope.listlichsu);
      });
    $http
      .get(maGiamGiaChiTietAPI + "/hoa-donid?id=" + $rootScope.hangg)
      .then(function (response) {
        $scope.listgiamgia = response.data;
        console.log("giamgia", $scope.listgiamgia);
      });
  };
  $scope.getLocHoaDon();
  $scope.huyDonHang = function (hang) {
    // Hiển thị hộp thoại xác nhận với thông báo và nút xác nhận/hủy
    var xacNhanHuy = confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");

    if (!xacNhanHuy) {
      // Nếu người dùng chọn "Hủy", không thực hiện bước tiếp theo
      return null;
    }

    // Nếu người dùng chọn "OK", tiếp tục với lựa chọn hủy đơn hàng
    var noiDung = prompt("Nhập lý do hủy đơn hàng:", "");

    if (noiDung === null || noiDung === "") {
      // Nếu người dùng chọn "Hủy" hoặc không nhập lý do, không thực hiện bước tiếp theo
      return;
    }
    if (!$scope.idKhachHang) {
      console.error("Giá trị idKhachHang không hợp lệ");
      return;
    }

    var idDonHang = hang.hoaDonId;

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.idKhachHang,
      idDonHang: idDonHang,
      noiDung: noiDung,
      nguoiTao: $scope.ten,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/huy-don-hang", data, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        alert("Hủy đơn hàng thành công!");
        $location.path("/don-hang");
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };
  $scope.daNhanHang = function (hang) {
    if (!$scope.idKhachHang) {
      console.error("Giá trị idKhachHang không hợp lệ");
      return;
    }

    var idDonHang = hang.hoaDonId;

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.idKhachHang,
      idDonHang: idDonHang,
      nguoiTao: $scope.ten,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/da-nhan-hang", data, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        $location.path("/don-hang");
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };
  $scope.quayLai = function () {
    $location.path("/don-hang");
  };
  $scope.muaLai = function (products) {
    // Lấy danh sách idSanPhamChiTiet từ mảng sản phẩm
    var sanPhamChiTietIds = products.map(function (item) {
      return item.idSanPhamChiTiet;
    });

    // Dữ liệu gửi đi
    var goiHangData = {
      khachHangId: $scope.idKhachHang,
      soLuong: 1,
      sanPhamChiTietIds: sanPhamChiTietIds,
    };

    // Gọi API để thêm nhiều sản phẩm vào giỏ hàng
    $http
      .post(gioHangAPI + "/them-nhieu", goiHangData)
      .then(function (response) {
        if (response.data && typeof response.data === "object") {
          if (response.data.status === "success") {
            $location.path("/gio-hang");
            $timeout(function () {
              $window.location.reload();
            }, 0);
          } else {
            $location.path("/gio-hang");
            $timeout(function () {
              $window.location.reload();
            }, 0);
            // Hiển thị thông báo lỗi nếu có
            console.error("Lỗi từ server: " + response.data.message);
          }
        } else {
          // Xử lý trường hợp khác nếu cần
        }
      })
      .catch(function (error) {
        $location.path("/gio-hang");
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };
  $scope.lienHe = function () {
    var contactInfo =
      "Địa chỉ: Số nhà 56 Ngõ 2 Nguyên Xá Bắc Từ Liêm Hà Nội\nSố điện thoại: 0363446243";
    alert(contactInfo);
  };
};
