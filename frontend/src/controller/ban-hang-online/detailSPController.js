window.detailSanPhamController = function (
  $scope,
  $http,
  $routeParams,
  $rootScope,
  $location
) {
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listNewSanPhamChiTiet = [];
  $scope.showSPCT = false;
  $scope.trangThai = false;
  $scope.goiHang = {
    sanPhamChiTietId: $scope.idSPCT,
    khachHangId: $scope.idKhachHang,
    soLuong: 1,
  };

  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/detail-trang-chu/" + $routeParams.id)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data;
        console.log($scope.listSanPhamChiTiet);
        const groupedSanPham = {};
        $scope.listSanPhamChiTiet.forEach((sanPham) => {
          const tenSanPham = sanPham.tenSanPham;

          if (!groupedSanPham[tenSanPham]) {
            groupedSanPham[tenSanPham] = {
              ...sanPham,
              tenMauSac: [sanPham.tenMauSac],
              tenKichThuoc: [sanPham.tenKichThuoc],
              duongDan: [sanPham.duongDan],
              giaMin: sanPham.donGia,
              giaMax: sanPham.donGia,
            };
          } else {
            groupedSanPham[tenSanPham].giaMin = Math.min(
              groupedSanPham[tenSanPham].giaMin,
              sanPham.donGia
            );
            groupedSanPham[tenSanPham].giaMax = Math.max(
              groupedSanPham[tenSanPham].giaMax,
              sanPham.donGia
            );
            if (
              !groupedSanPham[tenSanPham].tenMauSac.includes(sanPham.tenMauSac)
            ) {
              groupedSanPham[tenSanPham].tenMauSac.push(sanPham.tenMauSac);
            }
            if (
              !groupedSanPham[tenSanPham].tenKichThuoc.includes(
                sanPham.tenKichThuoc
              )
            ) {
              groupedSanPham[tenSanPham].tenKichThuoc.push(
                sanPham.tenKichThuoc
              );
            }
            if (
              !groupedSanPham[tenSanPham].duongDan.includes(sanPham.duongDan)
            ) {
              groupedSanPham[tenSanPham].duongDan.push(sanPham.duongDan);
            }
          }
        });

        // Chuyển đổi object thành mảng
        $scope.listNewSanPhamChiTiet = Object.values(groupedSanPham);

        console.log($scope.listNewSanPhamChiTiet);
      });
  };
  $scope.getSanPhamChiTiet();

  $scope.selectdMauSac = function (mauSac) {
    let tonTai = false;
    $scope.searchMauSac = mauSac;
    console.log($scope.searchKichThuoc);
    console.log($scope.searchMauSac);
    $scope.listSanPhamChiTiet.filter((sanPham) => {
      if (
        sanPham.tenKichThuoc === $scope.searchKichThuoc &&
        sanPham.tenMauSac === $scope.searchMauSac
      ) {
        $scope.sanPhamCT = sanPham;
        $scope.idSPCT = sanPham.idSanPhamChiTiet;
        $scope.goiHang.sanPhamChiTietId = $scope.idSPCT;
        $scope.soLuongSp = sanPham.soLuong;
        $scope.showSPCT = true;
        $scope.trangThai = false;
        tonTai = true;
      } else if ($scope.searchKichThuoc === undefined) {
        $scope.trangThai = false;
        tonTai = true;
      }
    });
    if (tonTai == false) {
      $scope.trangThai = true;
      $scope.soLuong = 0;
    }
  };
  $scope.selectdKichThuoc = function (kichThuoc) {
    let tonTai = false;
    $scope.searchKichThuoc = kichThuoc;
    console.log($scope.searchKichThuoc);
    console.log($scope.searchMauSac);

    $scope.listSanPhamChiTiet.filter((sanPham) => {
      if (
        sanPham.tenKichThuoc == $scope.searchKichThuoc &&
        sanPham.tenMauSac == $scope.searchMauSac
      ) {
        $scope.idSPCT = sanPham.idSanPhamChiTiet;
        $scope.sanPhamCT = sanPham;
        $scope.soLuongSp = sanPham.soLuong;
        $scope.goiHang.sanPhamChiTietId = $scope.idSPCT;
        $scope.showSPCT = true;
        $scope.trangThai = false;
        tonTai = true;
      } else if ($scope.searchMauSac === undefined) {
        $scope.trangThai = false;
        tonTai = true;
      }
    });
    if (tonTai == false) {
      $scope.trangThai = true;
      $scope.soLuong = 0;
    }
  };

  if ($rootScope.trangthai == true) {
    if (!$rootScope.idKhachHang) {
      console.error("idKhachHang is not set in $rootScope.");
      return;
    }
    $scope.idKhachHang = $rootScope.idKhachHang;
    console.log("id khach hang:", $rootScope.idKhachHang);
    $scope.goiHang = {
      sanPhamChiTietId: $scope.idSPCT,
      khachHangId: $scope.idKhachHang,
      soLuong: 1,
    };
    console.log("id:", $rootScope.idKhachHang);
  }

  $scope.incrementQuantity = function () {
    console.log("Incrementing quantity");

    // Kiểm tra xem số lượng sau khi tăng có vượt quá giới hạn không
    if ($scope.goiHang.soLuong + 1 > $scope.soLuongSp) {
      window.alert("Số lượng vượt quá tồn kho của sản phẩm");
      return; // Ngừng thực hiện nếu vượt quá giới hạn
    }

    $scope.goiHang.soLuong++;
  };

  $scope.decrementQuantity = function () {
    console.log("Decrementing quantity");
    if ($scope.goiHang.soLuong > 1) {
      $scope.goiHang.soLuong--;
    }
  };
  $scope.redirectToPage = function () {
    if ($scope.isLoggedIn) {
      // Nếu đã đăng nhập, xử lý logic cho trường hợp này
    } else {
      // Nếu chưa đăng nhập, chuyển hướng đến trang khác (ví dụ: #/login)
      $location.path("/login"); // Đảm bảo bạn đã inject $location vào controller của bạn
    }
  };
  $scope.addGioHang = function () {
    if (!$scope.searchMauSac || !$scope.searchKichThuoc) {
      // Hiển thị thông báo yêu cầu chọn màu sắc và kích thước
      alert("Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng.");
      return;
    }

    $http
      .post(gioHangAPI + "/them", $scope.goiHang)
      .then(function (response) {
        if (response.data && typeof response.data === "object") {
          if (response.data.status === "success") {
            // Hiển thị thông báo thành công
            alert(response.data.message);
          } else {
            // Hiển thị thông báo lỗi
            alert(
              "Có lỗi xảy ra khi thêm vào giỏ hàng: " + response.data.message
            );
          }
        } else {
          // Hiển thị thông báo lỗi nếu phản hồi không hợp lệ
          alert("Có lỗi xảy ra khi thêm vào giỏ hàng: Phản hồi không hợp lệ.");
        }
      })
      .catch(function (error) {
        // Bắt lỗi từ phản hồi HTTP
        if (error && error.data && error.data.message) {
          // Hiển thị thông báo lỗi cụ thể từ phản hồi
          alert("Lỗi từ server: " + error.data.message);
        } else {
          // Hiển thị thông báo lỗi chung nếu không có thông báo cụ thể
          alert("Có lỗi xảy ra khi thêm vào giỏ hàng: " + error.statusText);
        }
      });
  };
  $scope.muaNgay = function () {
    if (!$scope.searchMauSac || !$scope.searchKichThuoc) {
      // Hiển thị thông báo yêu cầu chọn màu sắc và kích thước
      alert("Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng.");
      return;
    }

    $http
      .post(gioHangAPI + "/them", $scope.goiHang)
      .then(function (response) {
        if (response.data && typeof response.data === "object") {
          if (response.data.status === "success") {
            $location.path("/thanh-toan-onl");
            $timeout(function () {
              $window.location.reload();
            }, 0);
            // Hiển thị thông báo thành công
          } else {
          }
        } else {
          // Hiển thị thông báo lỗi nếu phản hồi không hợp lệ
          alert("Có lỗi xảy ra khi thêm vào giỏ hàng: Phản hồi không hợp lệ.");
        }
      })
      .catch(function (error) {
        // Bắt lỗi từ phản hồi HTTP
        if (error && error.data && error.data.message) {
          // Hiển thị thông báo lỗi cụ thể từ phản hồi
          alert("Lỗi từ server: " + error.data.message);
        } else {
        }
      });
  };

  $scope.search = function () {
    $http
      .get(
        sanPhamAPI +
          "/search?pageNo=" +
          $scope.currentPage +
          "&keyword=" +
          $scope.searchKeyword
      )
      .then(function (response) {
        $scope.listSanPham = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
};
