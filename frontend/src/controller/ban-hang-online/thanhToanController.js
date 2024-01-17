window.thanhToanController = function (
  $http,
  $scope,
  $routeParams,
  $route,
  $filter,
  $window,
  $rootScope,
  $location
) {
  $scope.listHoaDon = [];
  $scope.sizeAndQuantitys = [];
  $scope.listKichThuoc = [];
  $scope.totalPages = [];
  $scope.totalPagesHDCT = [];
  $scope.listMaGiamGia = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listMaGiamGiaChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.listKhachHang = [];
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.visiblePages = [];
  $scope.detailDiaChi = [];
  $scope.districts = [];
  $scope.wards = [];
  $scope.chonKhachHang = false;
  $scope.diaChiMacDinh = false;
  $scope.show = false;
  $scope.addSanPham = false;
  $scope.showDropDownVoucher = false;
  $scope.showDropDownThanhPho = false;
  $scope.showDropDownPhuongXa = false;
  $scope.showDropDownQuanHuyen = false;
  $scope.tongTien = 0;
  $scope.giamGia = 0;
  $scope.tienHang = 0;
  $scope.phiVanChuyen = 0;
  $scope.currentPage = 0;
  $scope.currentPageHDCT = 0;
  $scope.maxVisiblePages = 3;
  $scope.searchHinhThucThanhToan = null;
  $scope.searchKeyword = undefined;
  $scope.hoaDonThanhToan = {
    idKhachHang: "",
    tenKhachHang: "",
    soDienThoaiKhachHang: "",
    diaChiKhachHang: "",
    diaChiCuThe: "",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    tongTien: "",
    ngayThanhToan: new Date(),
    trangThai: 1,
  };
  // if (condition) {
  // } else {
  // }
  //   // $scope.dataFromGioHang = "Dữ liệu từ GioHangController";

  if (!$rootScope.idKhachHang) {
    console.error("idKhachHang is not set in $rootScope.");
    return;
  }

  $scope.idKhachHang = $rootScope.idKhachHang;
  console.log("id khach hang:", $scope.ten);
  $http
    .get(gioHangAPI + "/hien-thi/" + $rootScope.idKhachHang)
    .then(function (response) {
      $scope.gioHangList = response.data;

      console.log("response.data", response.data);

      $scope.dataFromGioHang = $scope.gioHangList.length;
      console.log(response.data.soLuong);

      $rootScope.$emit("dataFromGioHang", $scope.gioHangList.length);
      $rootScope.soLuongGioHangList = $scope.gioHangList.length;
      console.log("so luong gio hang:", $rootScope.soLuongGioHangList);

      // Tính tổng giá trị từ đơn giá
      $scope.tongGiaTri = 0;
      let hasRedirected = false;
      angular.forEach($scope.gioHangList, function (item) {
        // Chuyển đổi donGia sang kiểu số

        // Kiểm tra điều kiện
        if (item.soLuong > item.soLuongSp && !hasRedirected) {
          $location.path("/gio-hang");
          hasRedirected = true;

          alert(
            "Vui lòng xóa và cập nhật lại số lượng sản phẩm: " + item.tenSanPham
          );
          return;
        }

        // Nếu điều kiện không đúng, tiếp tục vòng lặp

        var donGia = parseFloat(item.donGia);

        // Kiểm tra xem có phải là số không
        if (!isNaN(donGia)) {
          item.donGia = $filter("number")(donGia, 0);
          // Tính toán tổng giá trị từ đơn giá
          $scope.tongGiaTri += donGia;
          $scope.tongTienThanhToan = $scope.tongGiaTri + 30000;
          // In ra console log để kiểm tra từng bước tính toán
          console.log("donGia:", donGia);
          console.log("Partial tongGiaTri:", $scope.tongGiaTri);
        } else {
          console.error("Invalid donGia:", item);
        }
      });
      $scope.tongTienThanhToan -= $scope.giamGia;
      // In ra console log để kiểm tra giá trị cuối cùng của tongGiaTri
      console.log("Final tongTienThanhToan:", $scope.tongTienThanhToan);
    })
    .catch(function (error) {
      console.error("Error fetching gio hang:", error);
    });
  $http
    .get(khachHangAPI + "/detail/" + $rootScope.idKhachHang)
    .then(function (response) {
      return response?.data;
    });
  $http
    .get(diaChiAPI + "/detail/" + $rootScope.idKhachHang)
    .then(function (response) {
      return response?.data;
    });
  let diaChiMacDinh = "";
  detailKhachHang($scope.idKhachHang).then(function (detailKhachHang) {
    $scope.hoaDonThanhToan.idKhachHang = detailKhachHang.id;
  });
  detailDiaChi($scope.idKhachHang).then(function (detailDiaChi) {
    if (detailDiaChi) {
      diaChiMacDinh = detailDiaChi.find((diaChi) => {
        return diaChi.diaChiMacDinh === true;
      });
    }
    $scope.hoaDonThanhToan.tenKhachHang = diaChiMacDinh.tenKhachHang;
    $scope.hoaDonThanhToan.soDienThoaiKhachHang = diaChiMacDinh.soDienThoai;
    $scope.hoaDonThanhToan.diaChiCuThe = diaChiMacDinh.diaChiCuThe;
    $scope.hoaDonThanhToan.tinhThanhPho = diaChiMacDinh.tinhThanhPho;
    $scope.hoaDonThanhToan.quanHuyen = diaChiMacDinh.quanHuyen;
    $scope.hoaDonThanhToan.phuongXa = diaChiMacDinh.phuongXa;
    $scope.hoaDonThanhToan.diaChiKhachHang =
      $scope.hoaDonThanhToan.diaChiCuThe +
      ", " +
      $scope.hoaDonThanhToan.phuongXa +
      ", " +
      $scope.hoaDonThanhToan.quanHuyen +
      ", " +
      $scope.hoaDonThanhToan.tinhThanhPho;
  });

  $scope.listHoaDon = [];
  $scope.formHoaDonChiTiet = {};
  // error check ma giam gia
  $scope.successProgress = function () {
    let elem = document.getElementById("success");
    let width = 100;
    let id = setInterval(frame, 10);

    function frame() {
      if (width <= 0) {
        clearInterval(id);
      } else {
        width--;
        elem.style.width = width + "%";
      }
    }
  };
  $scope.errorProgress = function () {
    let elem = document.getElementById("error");
    let width = 100;
    let id = setInterval(frame, 10);

    function frame() {
      if (width <= 0) {
        clearInterval(id);
      } else {
        width--;
        elem.style.width = width + "%";
      }
    }
  };
  function showError(message) {
    $scope.errorProgress();
    $scope.message = message;
    // toastBootstrap.show();
    $scope.showError = true;
  }

  $scope.selectTab = function (tab, id, ma) {
    $scope.formHoaDonChiTiet.idHoaDon = id;
    $scope.maHoaDon = ma;
    $scope.selectedTab = tab;
    $scope.addSanPham = true;
    $scope.getHoaDonChiTiet();
  };

  $scope.isSelectedTab = function (tab) {
    return tab === $scope.selectedTab;
  };

  // hien thi ma giam gia

  $scope.getMaGiamGia = function (option) {
    $http.get(magiamgiaAPI + "/trang-thai").then(function (response) {
      $scope.listMaGiamGia = response?.data.content;

      $scope.listMaGiamGia.forEach((maGiamGia) => {
        $http
          .get(
            maGiamGiaChiTietAPI +
              "/hien-thi/" +
              maGiamGia.id +
              "?pageNo=" +
              $scope.currentPage
          )
          .then(function (response) {
            if (response.status == 200) {
              $scope.listMaGiamGiaChiTiet = response?.data.content;
              maGiamGia.soLuong =
                maGiamGia.soLuong - $scope.listMaGiamGiaChiTiet.length;
            }
          });
      });
    });
  };

  $scope.getMaGiamGia();
  //Su kien click chon ma giam gia
  $scope.selectedVoucher = function (index, option) {
    $scope.maGiamGiaId = option.id;
    if ($scope.tongGiaTri < option.giaTriDonToiThieu) {
      alert("Chưa đủ giá trị đơn tối thiểu");
    } else {
      $scope.searchKeyword = option.ma;
      if (option.hinhThucGiam === 1) {
        $scope.giamGia = $scope.tongGiaTri * (option.giaTriGiam / 100);
        $scope.tongTienThanhToan = $scope.tongGiaTri + 30000 - $scope.giamGia;
      } else {
        $scope.giamGia = option.giaTriGiam;
        $scope.tongTienThanhToan =
          $scope.tongGiaTri + 30000 - option.giaTriGiam;
      }
    }

    $scope.showDropDownVoucher = false;
  };

  // }
  // };

  //thanh toan
  $scope.addHoaDon = function (event) {
    $scope.randomHoaDon = "HD" + Math.floor(Math.random() * 10000) + 1;

    $scope.formHoaDon = {
      ma: $scope.randomHoaDon,
      ngayTao: new Date(),
      trangThai: 0,
      idKhachHang: $scope.idKhachHang,
      tenKhachHang: $scope.hoaDonThanhToan.tenKhachHang,
      soDienThoaiKhachHang: $scope.hoaDonThanhToan.soDienThoaiKhachHang,
      diaChiKhachHang:
        $scope.hoaDonThanhToan.diaChiCuThe +
        ", " +
        $scope.hoaDonThanhToan.phuongXa +
        ", " +
        $scope.hoaDonThanhToan.quanHuyen +
        ", " +
        $scope.hoaDonThanhToan.tinhThanhPho,
      ngayThanhToan: new Date(),

      tongTien: $scope.tongTienThanhToan,
      phiShip: 30000,
    };
    console.log($scope.formHoaDon);
    $http.post(hoaDonAPI + "/addonline", $scope.formHoaDon).then(function () {
      $scope.getListHoaDon();
    });
  };

  $scope.getListHoaDon = function () {
    $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
      $scope.listHoaDon = response.data.content;
      var giohang = $scope.gioHangList;
      console.log("list hoa don", $scope.listHoaDon);
      if ($scope.maGiamGiaId === undefined) {
        // return;
      } else {
        $scope.addMaGiamGia = {
          tongTien: $scope.tongGiaTri,
          tongTienSauKhiGiam: $scope.tongTienThanhToan - 30000,
          hoaDonId: $scope.listHoaDon[0].id,
          maGiamGiaId: $scope.maGiamGiaId,
        };
        console.log("mã giảm giá", $scope.addMaGiamGia);
        $http.post(maGiamGiaChiTietAPI + "/add", $scope.addMaGiamGia);
      }
      for (var i = 0; i < giohang.length; i++) {
        console.log(giohang[i]);
        formHoaDonChiTiet = {
          idHoaDon: $scope.listHoaDon[0].id,
          idSanPhamChiTiet: $scope.gioHangList[i].idSanPhamChiTiet,
          donGia: parseInt($scope.gioHangList[i].donGiaSp),
          thanhTien: parseInt($scope.gioHangList[i].donGia.replace(",", "")),
          soLuong: $scope.gioHangList[i].soLuong,
        };
        console.log(formHoaDonChiTiet);

        $http
          .post(hoaDonChiTietAPI + "/add", formHoaDonChiTiet)
          .then(function () {
            console.log("success");
            //$route.path("don-hang");
          });
      }
      $http
        .delete(gioHangAPI + "/xoakh/" + $scope.idKhachHang)
        .then(function (response) {
          console.log("Xóa gio hang thành công:", response.data);
          //$route.reload();
        });
      setTimeout(function () {
        console.log($scope.gioHangList);
        $location.path("/don-hang");
      }, $scope.gioHangList.length * 3);
    });
    //add ma giam gia
  };

  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $scope.detailKhachHang = {
    id: "",
    hinhAnh: "",
    tenKhachHang: "",
    soDienThoai: "",
    email: "",
    gioiTinh: "",
  };
  $scope.formHoaDonChiTiet = {
    idHoaDon: "",
    idSanPhamChiTiet: "",
    soLuong: 1,
    donGia: "",
    thanhTien: "",
  };
  $scope.formDiaChi = {
    tinhThanhPho: "",

    quanHuyen: "",
    phuongXa: "",
  };
  $scope.formHoaDon = {
    soNha: "",
    tenThanhPho: "",
    tenQuanHuyen: "",
    tenPhuongXa: "",
  };
  $scope.addMaGiamGia = {};
  $scope.getCity = function () {
    const api = api_giaoHang + "?depth=1";
    axios.get(api).then((response) => {
      $scope.cityOptions = response.data;
    });
  };
  $scope.toggleAPI = function (event, type) {
    if (type === "ThanhPho") {
      $scope.showDropDownThanhPho = !$scope.showDropDownThanhPho;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownQuanHuyen = false;
    } else if (type === "QuanHuyen") {
      $scope.showDropDownQuanHuyen = !$scope.showDropDownQuanHuyen;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownThanhPho = false;
    } else if (type === "PhuongXa") {
      $scope.showDropDownPhuongXa = !$scope.showDropDownPhuongXa;
      $scope.showDropDownQuanHuyen = false;
      $scope.showDropDownThanhPho = false;
    }
    event.stopPropagation();
  };
  $scope.selectOptionThanhPho = function (option) {
    $scope.hoaDonThanhToan.tinhThanhPho = option;
    let selectedCityCode = "";
    $scope.cityOptions.find((city) => {
      if (city.name === option) {
        selectedCityCode = city.code;
      }
    });
    if (selectedCityCode) {
      const api = api_giaoHang + "p/" + selectedCityCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.districtOptions = response?.data.districts;
        console.log($scope.districtOptions);
      });
    }
    $scope.hoaDonThanhToan.quanHuyen = null;
    $scope.hoaDonThanhToan.phuongXa = null;

    $scope.showDropDownThanhPho = false;
    $scope.showDropDownQuanHuyen = false;
  };
  $scope.selectOptionQuanHuyen = function (option) {
    $scope.hoaDonThanhToan.quanHuyen = option;
    let selectedDistrictCode = "";
    $scope.districtOptions.find((district) => {
      if (district.name === option) {
        selectedDistrictCode = district.code;
      }
    });
    console.log(selectedDistrictCode);
    if (selectedDistrictCode) {
      const api = api_giaoHang + "d/" + selectedDistrictCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.wardOptions = response?.data.wards;
      });
    }
    $scope.hoaDonThanhToan.phuongXa = null;
    $scope.showDropDownQuanHuyen = false;
    $scope.showDropDownPhuongXa = false;
  };
  $scope.selectOptionPhuongXa = async function (option) {
    $scope.hoaDonThanhToan.phuongXa = option;
    $scope.showDropDownPhuongXa = false;
    var headers = {
      "Content-Type": "application/json",
      token: "6b9dba70-8881-11ee-af43-6ead57e9219a",
      shop_id: "4714252",
    };

    var config = {
      headers: headers,
    };
  };

  $scope.toggleVoucher = function (event) {
    $scope.showDropDownVoucher = !$scope.showDropDownVoucher;

    event.stopPropagation();
  };

  document.addEventListener("click", function (event) {
    var dropdownContainer = document.querySelector(".dropdown-container");

    if (!dropdownContainer.contains(event.target)) {
      $scope.$apply(function () {
        $scope.showDropDownVoucher = false;
        $scope.showDropDownThanhPho = false;
        $scope.showDropDownQuanHuyen = false;
        $scope.showDropDownPhuongXa = false;
      });
    }
  });
  $scope.getCity();

  function detailKhachHang(idKhachHang) {
    return $http
      .get(khachHangAPI + "/detail/" + idKhachHang)
      .then(function (response) {
        return response?.data;
      });
  }
  function detailDiaChi(idKhachHang) {
    return $http
      .get(diaChiAPI + "/detail/" + idKhachHang)
      .then(function (response) {
        console.log(response.data);
        return response?.data;
      });
  }
  $scope.addKhachHang = function (e, idKhachHang) {
    e.preventDefault();
    let diaChiMacDinh = "";
    detailKhachHang(idKhachHang).then(function (detailKhachHang) {
      $scope.hoaDonThanhToan.idKhachHang = detailKhachHang.id;
      $scope.hoaDonThanhToan.tenKhachHang = detailKhachHang.hoTen;
      $scope.hoaDonThanhToan.soDienThoaiKhachHang = detailKhachHang.soDienThoai;
    });
    detailDiaChi(idKhachHang).then(function (detailDiaChi) {
      if (detailDiaChi) {
        diaChiMacDinh = detailDiaChi.find((diaChi) => {
          return diaChi.diaChiMacDinh === true;
        });
      }
      $scope.hoaDonThanhToan.diaChiCuThe = diaChiMacDinh.diaChiCuThe;
      $scope.hoaDonThanhToan.tinhThanhPho = diaChiMacDinh.tinhThanhPho;
      $scope.hoaDonThanhToan.quanHuyen = diaChiMacDinh.quanHuyen;
      $scope.hoaDonThanhToan.phuongXa = diaChiMacDinh.phuongXa;
      $scope.hoaDonThanhToan.diaChiKhachHang =
        $scope.hoaDonThanhToan.diaChiCuThe +
        ", " +
        $scope.hoaDonThanhToan.phuongXa +
        ", " +
        $scope.hoaDonThanhToan.quanHuyen +
        ", " +
        $scope.hoaDonThanhToan.tinhThanhPho;
    });
  };
};
