window.addHoaDonController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $timeout,
  $window
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  let storedUserData = localStorage.getItem("loggedInAdmin");
  $scope.storedUser = JSON.parse(storedUserData);
  $scope.listHoaDon = [];
  $scope.sizeAndQuantitys = [];
  $scope.listKichThuoc = [];
  $scope.totalPages = [];
  $scope.totalPagesHDCT = [];
  $scope.listMaGiamGia = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.listKhachHang = [];
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.visiblePages = [];
  $scope.detailDiaChi = [];
  $scope.districts = [];
  $scope.wards = [];
  $scope.sizes = [];
  $scope.colors = [];
  $scope.chonKhachHang = false;
  $scope.diaChiMacDinh = false;
  $scope.show = false;
  $scope.addSanPham = false;
  $scope.showDropDownVoucher = false;
  $scope.showDropDownThanhPho = false;
  $scope.showDropDownPhuongXa = false;
  $scope.showDropDownQuanHuyen = false;
  $scope.isSelected = false;
  $scope.tongTien = 0;
  $scope.giamGia = 0;
  $scope.tienHang = 0;
  $scope.phiVanChuyen = 0;
  $scope.currentPage = 0;
  $scope.currentPageHDCT = 0;
  $scope.maxVisiblePages = 3;
  $scope.searchHinhThucThanhToan = null;
  $scope.searchKeyword = null;
  $scope.searchMauSac = null;
  $scope.searchKichThuoc = null;
  $scope.customIndex = 0;
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
  $scope.hoaDonThanhToan = {
    idKhachHang: "",
    idNhanVien: "",
    tenKhachHang: "Khách lẻ",
    soDienThoaiKhachHang: "",
    diaChiKhachHang: "",
    diaChiCuThe: "",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    tongTien: "",
    phiVanChuyen: 0,
    ngayThanhToan: new Date(),
    trangThai: 1,
  };
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
    toastBootstrap.show();
    $scope.showError = true;
  }
  function showSuccess(message) {
    $scope.successProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = false;
  }
  $scope.getVisiblePages = function (totalPages, currentPage) {
    var range = $scope.maxVisiblePages;

    var numberTruncateLeft = currentPage - Math.floor(range / 2);
    var numberTruncateRight = currentPage + Math.floor(range / 2);

    var visiblePages = [];

    for (var pos = 1; pos <= totalPages; pos++) {
      var active = pos - 1 === currentPage ? "active" : "";

      if (totalPages >= 2 * range - 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          visiblePages.push({
            page: pos,
            active: active,
          });
        }
      } else {
        visiblePages.push({
          page: pos,
          active: active,
        });
      }
    }
    return visiblePages;
  };
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

  $scope.getListHoaDon = function () {
    $http.get(hoaDonAPI + "/get-list").then(function (response) {
      $scope.listHoaDon = response.data;
    });
  };
  $scope.getListHoaDon();
  $scope.getMaGiamGia = function () {
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
  $scope.addHoaDon = function (event) {
    event.preventDefault();
    $scope.randomHoaDon = "HD" + Math.floor(Math.random() * 10000) + 1;
    $scope.formHoaDon = {
      ma: $scope.randomHoaDon,
      ngayTao: new Date(),
      nguoiTao: $scope.storedUser.hoTen,
      trangThai: 5,
    };
    if ($scope.listHoaDon.length < 5) {
      $http
        .post(hoaDonAPI + "/add", $scope.formHoaDon)
        .then(function () {
          $scope.getListHoaDon();
        })
        .then(function () {
          return;
        });
      showSuccess("Tạo hóa đơn thành công");
    } else {
      showError("Chỉ tạo tối đa 5 hóa đơn");
    }
  };
  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        // $scope.visiblePages = getVisiblePages(
        //   $scope.totalPages,
        //   3,
        //   $scope.changePage
        // );
      });
  };
  $scope.getSanPhamChiTiet();
  $scope.changePage = function (index) {
    if (index >= 0 && index < $scope.totalPages.length) {
      $scope.currentPage = index;
      if ($scope.selectOption !== undefined) {
        $scope.loc();
        return;
      }
      if ($scope.searchKeyword !== undefined) {
        $scope.search();
        return;
      }
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.changePageHDCT = function (index) {
    if ($scope.currentPage < $scope.totalPagesHDCT.length - 1) {
      $scope.currentPageHDCT = index;
      $scope.getHoaDonChiTiet();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.nextPageHDCT = function () {
    let length = $scope.totalPagesHDCT.length;
    if ($scope.currentPageHDCT < length - 1) {
      $scope.currentPageHDCT++;
      $scope.getHoaDonChiTiet();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.previousPageHDCT = function () {
    if ($scope.currentPageHDCT > 0) {
      $scope.currentPageHDCT--;
      $scope.getHoaDonChiTiet();
    }
  };

  $scope.getHoaDonChiTiet = function () {
    $http
      .get(
        hoaDonChiTietAPI +
          "/hien-thi/" +
          $scope.maHoaDon +
          "?pageNo=" +
          $scope.currentPageHDCT
      )
      .then(function (response) {
        $scope.listHoaDonChiTiet = response?.data.content;
        $scope.customIndex = $scope.currentPageHDCT * response.data.size;
        $scope.totalPagesHDCT = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages(
          $scope.totalPagesHDCT.length,
          $scope.currentPageHDCT
        );
        $scope.calculateTotal();
        console.log($scope.visiblePages);
      });
  };
  function detailChiTietSanPham(idSanPhamChiTiet) {
    return $http
      .get(sanPhamChiTietAPI + "/detail/" + idSanPhamChiTiet)
      .then(function (response) {
        return response?.data;
      })
      .catch(function (error) {
        console.error("Error fetching product details:", error);
        throw error; // Chuyển tiếp lỗi để xử lý ở nơi gọi
      });
  }
  function detailChiTietSanPham(idSanPhamChiTiet) {
    return $http
      .get(sanPhamChiTietAPI + "/detail/" + idSanPhamChiTiet)
      .then(function (response) {
        return response?.data;
      })
      .catch(function (error) {
        console.error("Error fetching product details:", error);
        throw error; // Chuyển tiếp lỗi để xử lý ở nơi gọi
      });
  }
  $scope.addSanPhamChiTiet = function (idSanPhamChiTiet, index) {
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    $scope.formHoaDonChiTiet = {
      idHoaDon: $scope.formHoaDonChiTiet.idHoaDon,
      idSanPhamChiTiet: idSanPhamChiTiet,
      donGia: $scope.listSanPhamChiTiet[index].donGia,
      thanhTien: $scope.listSanPhamChiTiet[index].donGia,
      soLuong: 1,
    };
    detailChiTietSanPham(idSanPhamChiTiet).then(function (
      detailSanPhamChiTiet
    ) {
      if (matchingItem) {
        matchingItem.soLuong += 1;
        if (matchingItem.soLuong <= detailSanPhamChiTiet.soLuong) {
          $scope.hoaDonUpdate = {
            soLuong: matchingItem.soLuong,
            thanhTien: matchingItem.soLuong * detailSanPhamChiTiet.donGia,
          };
          $http
            .put(
              hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
              $scope.hoaDonUpdate
            )
            .then(function () {
              $scope.getHoaDonChiTiet();
              $scope.calculateTotal();
              showSuccess("Cập nhật thành công");
            });
        } else {
          $scope.listHoaDonChiTiet[index].soLuong =
            detailSanPhamChiTiet.soLuong;

          showError(
            "Chỉ còn " +
              detailSanPhamChiTiet.soLuong +
              " sản phẩm trong cửa hàng"
          );
          // matchingItem.soLuong = detailSanPhamChiTiet.soLuong;
        }
      } else {
        $http
          .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
          .then(function () {
            $scope.getHoaDonChiTiet();
            $scope.calculateTotal();
            showSuccess("Thêm sản phẩm mới thành công");
          });
      }
    });
  };

  $scope.calculateTotal = function () {
    $http
      .get(hoaDonChiTietAPI + "/tinh-tong/" + $scope.formHoaDonChiTiet.idHoaDon)
      .then(function (response) {
        $scope.listHoaDonChiTietTinhTong = response.data;
        $scope.tienHang = $scope.listHoaDonChiTietTinhTong.reduce(
          (total, item) => total + item.thanhTien,
          0
        );
        $scope.tongTien =
          $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
      });
  };

  $scope.changeSoLuong = function (idSanPhamChiTiet, index) {
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    detailChiTietSanPham(idSanPhamChiTiet).then(function (
      detailSanPhamChiTiet
    ) {
      if (matchingItem.soLuong <= 0) {
        console.log(matchingItem);
        var xacNhan = confirm(
          "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?"
        );
        if (xacNhan) {
          $http
            .delete(
              hoaDonChiTietAPI + "/delete/" + matchingItem.idHoaDonChiTiet
            )
            .then(function () {
              $scope.getHoaDonChiTiet();
            });
          return;
        } else {
          $scope.listHoaDonChiTiet[index].soLuong = 1;
          // showError("Số lượng không được nhỏ hơn 0");
        }
      } else if (matchingItem.soLuong <= detailSanPhamChiTiet.soLuong) {
        $scope.hoaDonUpdate = {
          soLuong: matchingItem.soLuong,
          thanhTien: matchingItem.soLuong * matchingItem.donGia,
        };

        $http
          .put(
            hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
            $scope.hoaDonUpdate
          )
          .then(function () {
            $scope.getHoaDonChiTiet();
            $scope.calculateTotal();
            showSuccess("Cập nhật thành công");
          });
      } else {
        $scope.listHoaDonChiTiet[index].soLuong = detailSanPhamChiTiet.soLuong;

        showError(
          "Chỉ còn " + detailSanPhamChiTiet.soLuong + " sản phẩm trong cửa hàng"
        );
      }
    });
  };
  $scope.xoaSanPhamGioHang = function (id) {
    $scope.idHoaDonChiTiet;
    $http.delete(hoaDonChiTietAPI + "/delete/" + id).then(function () {
      $scope.getHoaDonChiTiet();
    });
  };

  $scope.giaoHang = function () {
    $scope.show = !$scope.show;
    if ($scope.show === true) {
      $scope.tongTien = $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
    } else {
      $scope.tongTien = $scope.tienHang;
    }
  };
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
    $http
      .get(APIDistrict, config)
      .then(function (response) {
        $scope.districts = response.data.data;
        console.log($scope.districts);
        var foundDistrict = $scope.districts.find(function (district) {
          return district.DistrictName === $scope.hoaDonThanhToan.quanHuyen;
        });

        if (foundDistrict) {
          var district_id = foundDistrict.DistrictID;

          $http
            .get(APIWard + "?district_id=" + district_id, config)
            .then(function (response) {
              $scope.wards = response.data.data;

              var foundWard = $scope.wards.find(function (ward) {
                return ward.WardName === $scope.hoaDonThanhToan.phuongXa;
              });

              if (foundWard) {
                var wardCode = foundWard.WardCode;

                var requestData = {
                  service_type_id: 2,
                  to_district_id: district_id,
                  to_ward_code: wardCode,
                  height: 20,
                  length: 30,
                  weight: 3000,
                  width: 40,
                };

                $http
                  .post(APIPhiVanChuyen, requestData, config)
                  .then(function (response) {
                    console.log(response.data);
                    $scope.phiVanChuyen = response.data.data.total;
                    $scope.hoaDonThanhToan.phiVanChuyen = $scope.phiVanChuyen;
                    $scope.tongTien =
                      $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
                  });
              }
            });
        }
      })
      .catch(function (error) {
        console.error("An error occurred:", error);
      });
  };

  $scope.toggleVoucher = function (event) {
    $scope.showDropDownVoucher = !$scope.showDropDownVoucher;

    event.stopPropagation();
  };
  $scope.selectedVoucher = function (index, option) {
    $scope.maGiamGiaId = option.id;
    if ($scope.formHoaDonChiTiet.idHoaDon === "") {
      showError("Hãy chọn 1 hóa đơn để áp dụng mã giảm giá");
    } else if ($scope.tienHang < option.giaTriDonToiThieu) {
      showError("Chưa đủ giá trị đơn tối thiểu");
    } else {
      $scope.searchVoucher = option.ma;
      if (option.hinhThucGiam === 1) {
        $scope.giamGia = $scope.tienHang * (option.giaTriGiam / 100);
        $scope.tongTien =
          $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
      } else {
        $scope.giamGia = option.giaTriGiam;
        $scope.tongTien =
          $scope.tienHang + $scope.phiVanChuyen - option.giaTriGiam;
      }
    }

    $scope.showDropDownVoucher = false;
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

  $scope.thanhToan = function () {
    $scope.hoaDonThanhToan.tongTien = $scope.tongTien;
    let diaChiKhachHang =
      $scope.hoaDonThanhToan.diaChiCuThe +
      ", " +
      $scope.hoaDonThanhToan.phuongXa +
      ", " +
      $scope.hoaDonThanhToan.quanHuyen +
      ", " +
      $scope.hoaDonThanhToan.tinhThanhPho;
    if ($scope.formHoaDonChiTiet.idHoaDon === "") {
      showError("Chọn 1 hóa đơn để thanh toán");
    } else if ($scope.listHoaDonChiTiet.length === 0) {
      showError("Hóa đơn có ít nhất 1 sản phẩm để thanh toán");
    } else {
      if ($scope.hoaDonThanhToan.idKhachHang === "" && $scope.show == false) {
        $scope.hoaDonThanhToan.trangThai = 3;
        $scope.hoaDonThanhToan.diaChiKhachHang = null;
        $scope.hoaDonThanhToan.soDienThoaiKhachHang = null;

        console.log($scope.hoaDonThanhToan);
        //update hoa don
        $http
          .put(
            hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          //update so luong san pham
          .then(function () {
            $scope.listHoaDonChiTiet.forEach((hoaDonChiTiet) => {
              $scope.updateSoLuong = {
                soLuong: hoaDonChiTiet.soLuong,
                idSanPhamChiTiet: hoaDonChiTiet.idSanPhamChiTiet,
              };
              return $http.put(
                sanPhamChiTietAPI + "/update-so-luong",
                $scope.updateSoLuong
              );
            });
          })
          //add ma giam gia
          .then(function () {
            if ($scope.maGiamGiaId === undefined) {
              return;
            } else {
              $scope.addMaGiamGia = {
                tongTien: $scope.tienHang,
                tongTienSauKhiGiam: $scope.tienHang - $scope.giamGia,

                hoaDonId: $scope.formHoaDonChiTiet.idHoaDon,
                maGiamGiaId: $scope.maGiamGiaId,
              };
              return $http.post(
                maGiamGiaChiTietAPI + "/add",
                $scope.addMaGiamGia
              );
            }
          });

        $location.path("/hoa-don/hien-thi");
      } else if (
        $scope.hoaDonThanhToan.idKhachHang === "" &&
        $scope.show == true
      ) {
        $scope.hoaDonThanhToan.diaChiKhachHang = diaChiKhachHang;
        $scope.hoaDonThanhToan.phiVanChuyen = $scope.phiVanChuyen;
        console.log($scope.hoaDonThanhToan);
        if (
          $scope.hoaDonThanhToan.diaChiCuThe === "" ||
          $scope.hoaDonThanhToan.soDienThoaiKhachHang === "" ||
          $scope.hoaDonThanhToan.tinhThanhPho === "" ||
          $scope.hoaDonThanhToan.quanHuyen === "" ||
          $scope.hoaDonThanhToan.phuongXa === ""
        ) {
          showError("Hãy nhập địa chỉ khách hàng");
          $scope.hoaDonThanhToan.diaChiKhachHang = null;
          return;
        }
        //update hóa đơn
        $http
          .put(
            hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          //update so luong san pham
          .then(function () {
            $scope.listHoaDonChiTiet.forEach((hoaDonChiTiet) => {
              $scope.updateSoLuong = {
                soLuong: hoaDonChiTiet.soLuong,
                idSanPhamChiTiet: hoaDonChiTiet.idSanPhamChiTiet,
              };
              return $http.put(
                sanPhamChiTietAPI + "/update-so-luong",
                $scope.updateSoLuong
              );
            });
          })
          //add ma giam gia
          .then(function () {
            if ($scope.maGiamGiaId === undefined) {
              return;
            } else {
              $scope.addMaGiamGia = {
                tongTien: $scope.tienHang,
                tongTienSauKhiGiam: $scope.tienHang - $scope.giamGia,
                hoaDonId: $scope.formHoaDonChiTiet.idHoaDon,
                maGiamGiaId: $scope.maGiamGiaId,
              };
              return $http.post(
                maGiamGiaChiTietAPI + "/add",
                $scope.addMaGiamGia
              );
            }
          });
        // $location.path("/hoa-don/hien-thi");
      } else if (
        $scope.hoaDonThanhToan.idKhachHang !== "" &&
        $scope.show == false
      ) {
        $scope.hoaDonThanhToan.diaChiKhachHang = null;
        $scope.hoaDonThanhToan.soDienThoaiKhachHang = null;
        $scope.hoaDonThanhToan.trangThai = 3;
        console.log($scope.hoaDonThanhToan);
        $http
          .put(
            hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          //update so luong san pham
          .then(function () {
            $scope.listHoaDonChiTiet.forEach((hoaDonChiTiet) => {
              $scope.updateSoLuong = {
                soLuong: hoaDonChiTiet.soLuong,
                idSanPhamChiTiet: hoaDonChiTiet.idSanPhamChiTiet,
              };
              return $http.put(
                sanPhamChiTietAPI + "/update-so-luong",
                $scope.updateSoLuong
              );
            });
          })
          //add ma giam gia
          .then(function () {
            if ($scope.maGiamGiaId === undefined) {
              return;
            } else {
              $scope.addMaGiamGia = {
                tongTien: $scope.tienHang,
                tongTienSauKhiGiam: $scope.tienHang - $scope.giamGia,

                hoaDonId: $scope.formHoaDonChiTiet.idHoaDon,
                maGiamGiaId: $scope.maGiamGiaId,
              };
              return $http.post(
                maGiamGiaChiTietAPI + "/add",
                $scope.addMaGiamGia
              );
            }
          });
        // $location.path("/hoa-don/hien-thi");
      } else {
        $scope.hoaDonThanhToan.diaChiKhachHang = diaChiKhachHang;
        $scope.hoaDonThanhToan.phiVanChuyen = $scope.phiVanChuyen;
        $http
          .put(
            hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          //update so luong san pham
          .then(function () {
            $scope.listHoaDonChiTiet.forEach((hoaDonChiTiet) => {
              $scope.updateSoLuong = {
                soLuong: hoaDonChiTiet.soLuong,
                idSanPhamChiTiet: hoaDonChiTiet.idSanPhamChiTiet,
              };
              return $http.put(
                sanPhamChiTietAPI + "/update-so-luong",
                $scope.updateSoLuong
              );
            });
          })
          //add ma giam gia
          .then(function () {
            if ($scope.maGiamGiaId === undefined) {
              return;
            } else {
              $scope.addMaGiamGia = {
                tongTien: $scope.tienHang,
                tongTienSauKhiGiam: $scope.tienHang - $scope.giamGia,
                hoaDonId: $scope.formHoaDonChiTiet.idHoaDon,
                maGiamGiaId: $scope.maGiamGiaId,
              };
              return $http.post(
                maGiamGiaChiTietAPI + "/add",
                $scope.addMaGiamGia
              );
            }
          });
        $location.path("/hoa-don/hien-thi");
      }
    }
  };
  $scope.getKhachHangByTrangThai = function (e) {
    e.preventDefault();
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKhachHang = response?.data.content;
      });
  };
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
        return response?.data;
      });
  }

  $scope.addKhachHang = function (e, idKhachHang) {
    e.preventDefault();
    $scope.isSelected = !$scope.isSelected;

    $scope.chonKhachHang = true;
    let diaChiMacDinh = "";
    detailKhachHang(idKhachHang).then(function (detailKhachHang) {
      $scope.hoaDonThanhToan.idKhachHang = detailKhachHang.id;
    });
    detailDiaChi(idKhachHang).then(function (detailDiaChi) {
      if (detailDiaChi) {
        diaChiMacDinh = detailDiaChi.find((diaChi) => {
          return diaChi.diaChiMacDinh === true;
        });
        $scope.hoaDonThanhToan.tenKhachHang = diaChiMacDinh.tenKhachHang;
        $scope.hoaDonThanhToan.soDienThoaiKhachHang = diaChiMacDinh.soDienThoai;
        $scope.listDiaChi = detailDiaChi;
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
    var headers = {
      "Content-Type": "application/json",
      token: "6b9dba70-8881-11ee-af43-6ead57e9219a",
      shop_id: "4714252",
    };

    var config = {
      headers: headers,
    };
    $http
      .get(APIDistrict, config)
      .then(function (response) {
        $scope.districts = response.data.data;
        var foundDistrict = $scope.districts.find(function (district) {
          return district.DistrictName === $scope.hoaDonThanhToan.quanHuyen;
        });

        if (foundDistrict) {
          var district_id = foundDistrict.DistrictID;

          $http
            .get(APIWard + "?district_id=" + district_id, config)
            .then(function (response) {
              $scope.wards = response.data.data;

              var foundWard = $scope.wards.find(function (ward) {
                return ward.WardName === $scope.hoaDonThanhToan.phuongXa;
              });

              if (foundWard) {
                var wardCode = foundWard.WardCode;

                var requestData = {
                  service_type_id: 2,
                  to_district_id: district_id,
                  to_ward_code: wardCode,
                  height: 20,
                  length: 30,
                  weight: 3000,
                  width: 40,
                };

                $http
                  .post(APIPhiVanChuyen, requestData, config)
                  .then(function (response) {
                    $scope.phiVanChuyen = response.data.data.total;
                    $scope.hoaDonThanhToan.phiVanChuyen = $scope.phiVanChuyen;
                  });
              }
            });
        }
      })
      .catch(function (error) {
        console.error("An error occurred:", error);
      });
  };
  $scope.hinhThucThanhToan = function (hinhThuc) {
    $scope.searchHinhThucThanhToan = hinhThuc;
  };
  $scope.getMauSac = function () {
    $http.get(mauSacAPI + "/get-all").then(function (response) {
      $scope.listMauSac = response?.data;
    });
  };

  $scope.getMauSac();
  $scope.getKichThuoc = function () {
    $http.get(kichThuocAPI + "/get-all").then(function (response) {
      $scope.listKichThuoc = response?.data;
    });
  };

  $scope.getKichThuoc();
  function callSearchAPI() {
    var params = {
      pageNo: $scope.currentPage,
      key: $scope.searchKeyword,
    };

    if ($scope.colors) {
      params.mauSacIds = $scope.colors;
    }

    if ($scope.sizes) {
      params.kichThuocIds = $scope.sizes;
    }
    console.log(params);
    $http
      .get(sanPhamChiTietAPI + "/search", { params: params })
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        console.log($scope.listSanPhamChiTiet);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  }

  $scope.search = function () {
    callSearchAPI();
  };
  $scope.locSanPhamTheoKichThuoc = function (index) {
    $scope.listKichThuoc[index].checked = !$scope.listKichThuoc[index].checked;
    const size = $scope.listKichThuoc[index];

    if ($scope.listKichThuoc[index].checked) {
      $scope.sizes.push(angular.copy(size.id));
    } else {
      const indexOfItemToRemove = $scope.sizes.findIndex(
        (item) => item.id === size.id
      );
      if (indexOfItemToRemove === -1) {
        $scope.sizes.splice(indexOfItemToRemove, 1);
      }
    }
    callSearchAPI();
  };
  $scope.locSanPhamTheoMau = function (index) {
    $scope.listMauSac[index].checked = !$scope.listMauSac[index].checked;
    const color = $scope.listMauSac[index];

    if ($scope.listMauSac[index].checked) {
      $scope.colors.push(angular.copy(color.id));
    } else {
      const indexOfItemToRemove = $scope.colors.findIndex(
        (item) => item.id === color.id
      );
      if (indexOfItemToRemove === -1) {
        $scope.colors.splice(indexOfItemToRemove, 1);
      }
    }
    callSearchAPI();
  };
  $scope.thayDoiDiaChi = function (event, id) {
    detailDiaChi($scope.hoaDonThanhToan.idKhachHang).then(function (
      detailDiaChi
    ) {
      if (detailDiaChi) {
        diaChiMacDinh = detailDiaChi.find((diaChi) => {
          return diaChi.id === id;
        });
        $scope.hoaDonThanhToan.tenKhachHang = diaChiMacDinh.tenKhachHang;
        $scope.hoaDonThanhToan.soDienThoaiKhachHang = diaChiMacDinh.soDienThoai;
        $scope.listDiaChi = detailDiaChi;
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
  // function paginateList(list, maxItemsPerPage, currentPage) {
  //   const startIdx = (currentPage - 1) * maxItemsPerPage;
  //   const endIdx = startIdx + maxItemsPerPage;
  //   return list.slice(startIdx, endIdx);
  // }

  // const video = document.getElementById("scanner");

  // // Khởi tạo Instascan
  // const scanner = new Instascan.Scanner({ video: video });

  // // Bắt sự kiện quét mã QR thành công
  // scanner.addListener("scan", function (content) {
  //   console.log(content);
  //   scanner.stop();
  //   function closeModal() {
  //     $("#quetQR").modal("hide");
  //   }
  // });

  // // Bắt sự kiện khi có lỗi trong quá trình quét
  // scanner.addListener("error", function (error) {
  //   console.error(error);
  // });

  // // Bắt đầu quét
  // Instascan.Camera.getCameras().then(function (cameras) {
  //   if (cameras.length > 0) {
  //     scanner.start(cameras[0]);
  //   } else {
  //     console.error("No cameras found.");
  //   }
  // });
};
