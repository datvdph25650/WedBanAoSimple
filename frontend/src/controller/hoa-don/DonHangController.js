window.DonHangController = function (
  $http,
  $scope,
  $routeParams,
  $httpParamSerializerJQLike,
  $timeout,
  $location,
  $rootScope,
  $window
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  let storedUserData = localStorage.getItem("loggedInAdmin");
  $scope.storedUser = JSON.parse(storedUserData);
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.sizes = [];
  $scope.colors = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.maxVisiblePages = 3;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.totalPagesHDCT = [];
  $scope.currentPageHDCT = 0;
  $scope.customIndexHDCT = 0;
  $scope.customIndex = 0;
  $scope.tienHang = 0;
  $scope.giamGia = 0;
  $scope.phiVanChuyen = 0;
  $scope.listHoaDonChiTietTinhTong = [];
  $scope.updateTongTien = 0;

  $scope.detailHoaDon = {
    id: "",
    ma: "",
    tenKhachHang: "",
    ngayDatHang: "",
    loaiHoaDon: "",
    trangThai: Number,
  };
  $scope.formHoaDonChiTiet = {
    idHoaDon: "",
    idSanPhamChiTiet: "",
    soLuong: 1,
    donGia: "",
    thanhTien: "",
  };
  $scope.calculateTotal = function () {
    $http
      .get(hoaDonChiTietAPI + "/tinh-tong/" + $routeParams.id)
      .then(function (response) {
        $scope.listHoaDonChiTietTinhTong = response.data;

        $scope.tienHang = $scope.listHoaDonChiTietTinhTong.reduce(
          (total, item) => total + item.thanhTien,
          0
        );
      });
  };
  $scope.calculateTotal();
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
  $scope.getVisiblePages = function () {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages;
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

    var visiblePages = [];

    for (var pos = 1; pos <= totalPages; pos++) {
      var active = pos - 1 === curPage ? "active" : "";

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
  $scope.getData = function () {
    $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
      $scope.listHoaDon = response?.data.content;
      $scope.customIndex = $scope.currentPage * response.data.size;
      $scope.totalPages = new Array(response.data.totalPages);
      $scope.visiblePages = $scope.getVisiblePages();
    });
  };
  //detai hoa don
  $scope.getData();
  $scope.detailHD = function () {
    $http
      .get(hoaDonAPI + "/detail/" + $routeParams.id)
      .then(function (response) {
        if (response.status == 200) {
          $scope.detailHoaDon = response.data;
          if ($scope.detailHoaDon.khachHang !== null) {
            $scope.vai = $scope.detailHoaDon.khachHang.id;
          }
        }
        $scope.phiVanChuyen = $scope.detailHoaDon.phiShip;
      });
  };
  $scope.detailHD();

  $scope.detailMaGiamGia = function () {
    $http
      .get(maGiamGiaChiTietAPI + "/detail/" + $routeParams.id)
      .then(function (response) {
        if (response.status == 200) {
          $scope.detailMaGiamGiaChiTet = response?.data;
          if ($scope.detailMaGiamGiaChiTet) {
            $scope.giamGia =
              $scope.detailMaGiamGiaChiTet.donGia -
              $scope.detailMaGiamGiaChiTet.donGiaSauKhiGiam;
          } else {
            $scope.giamGia = 0;
          }
        }
      });
  };
  $scope.detailMaGiamGia();
  $scope.getHoaDonChiTiet = function () {
    $http
      .get(
        hoaDonChiTietAPI +
          "/detail/" +
          $routeParams.id +
          "?pageNo=" +
          $scope.currentPageHDCT
      )
      .then(function (response) {
        $scope.listHoaDonChiTiet = response?.data.content;
        console.log($scope.listHoaDonChiTiet);
        $scope.customIndexHDCT = $scope.currentPageHDCT * response.data.size;
        $scope.totalPagesHDCT = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
        $scope.calculateTotal();
      });
  };
  $scope.getHoaDonChiTiet();

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
    if ($scope.currentPage < $scope.totalPages.length - 1) {
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
    let length = $scope.totalPages.length;
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
  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        console.log($scope.listSanPhamChiTiet);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.getSanPhamChiTiet();
  $scope.addSanPhamChiTiet = function (idSanPhamChiTiet, index) {
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    $scope.formHoaDonChiTiet = {
      idHoaDon: $routeParams.id,
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
            })
            .then(function () {
              $http
                .get(hoaDonChiTietAPI + "/tinh-tong/" + $routeParams.id)
                .then(function (response) {
                  $scope.listHoaDonChiTietTinhTong = response.data;

                  $scope.tienHang = $scope.listHoaDonChiTietTinhTong.reduce(
                    (total, item) => total + item.thanhTien,
                    0
                  );
                  $http
                    .get(hoaDonAPI + "/detail/" + $routeParams.id)
                    .then(function (response) {
                      $scope.detailHoaDon = response.data;
                      $scope.phiVanChuyen = $scope.detailHoaDon.phiShip;
                    });

                  $scope.updateTongTien =
                    $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
                  return $http
                    .put(
                      hoaDonAPI + "/update-tong-tien/" + $routeParams.id,
                      $scope.updateTongTien
                    )
                    .then(function () {
                      $scope.detailHD();
                    });
                });
            })
            .then(function () {
              $window.location.reload();
            });
        } else {
          $scope.listHoaDonChiTiet[index].soLuong = matchingItem.soLuong;

          showError(
            "Chỉ còn " +
              detailSanPhamChiTiet.soLuong +
              " sản phẩm trong cửa hàng"
          );
        }
      } else {
        $http
          .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
          .then(function () {
            $scope.getHoaDonChiTiet();
            $scope.calculateTotal();
            showSuccess("Thêm sản phẩm mới thành công");
          })
          .then(function () {
            $http
              .get(hoaDonChiTietAPI + "/tinh-tong/" + $routeParams.id)
              .then(function (response) {
                $scope.listHoaDonChiTietTinhTong = response.data;

                $scope.tienHang = $scope.listHoaDonChiTietTinhTong.reduce(
                  (total, item) => total + item.thanhTien,
                  0
                );
                $http
                  .get(hoaDonAPI + "/detail/" + $routeParams.id)
                  .then(function (response) {
                    $scope.detailHoaDon = response.data;
                    $scope.phiVanChuyen = $scope.detailHoaDon.phiShip;
                  });

                $scope.updateTongTien =
                  $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
                return $http
                  .put(
                    hoaDonAPI + "/update-tong-tien/" + $routeParams.id,
                    $scope.updateTongTien
                  )
                  .then(function () {
                    $scope.detailHD();
                  });
              });
          });
      }
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
            showSuccess("Cập nhật thành công");
          })
          .then(function () {
            $http
              .get(hoaDonChiTietAPI + "/tinh-tong/" + $routeParams.id)
              .then(function (response) {
                $scope.listHoaDonChiTietTinhTong = response.data;

                $scope.tienHang = $scope.listHoaDonChiTietTinhTong.reduce(
                  (total, item) => total + item.thanhTien,
                  0
                );
                $http
                  .get(hoaDonAPI + "/detail/" + $routeParams.id)
                  .then(function (response) {
                    $scope.detailHoaDon = response.data;
                    $scope.phiVanChuyen = $scope.detailHoaDon.phiShip;
                  });
                console.log(
                  $scope.tienHang +
                    " " +
                    $scope.phiVanChuyen +
                    " " +
                    $scope.giamGia
                );
                $scope.updateTongTien =
                  $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
                return $http
                  .put(
                    hoaDonAPI + "/update-tong-tien/" + $routeParams.id,
                    $scope.updateTongTien
                  )
                  .then(function () {
                    $scope.detailHD();
                  });
              });
          });
      } else {
        matchingItem.soLuong = detailSanPhamChiTiet.soLuong;
        showError(
          "Chỉ còn " + detailSanPhamChiTiet.soLuong + " sản phẩm trong cửa hàng"
        );
      }
    });
  };
  $scope.xoaSanPhamGioHang = function (id) {
    $http
      .delete(hoaDonChiTietAPI + "/delete/" + id)
      .then(function () {
        showError("Xóa thành công ");
        $scope.getHoaDonChiTiet();
      })
      .then(function () {
        $http
          .get(hoaDonChiTietAPI + "/tinh-tong/" + $routeParams.id)
          .then(function (response) {
            $scope.listHoaDonChiTietTinhTong = response.data;

            $scope.tienHang = $scope.listHoaDonChiTietTinhTong.reduce(
              (total, item) => total + item.thanhTien,
              0
            );
            $http
              .get(hoaDonAPI + "/detail/" + $routeParams.id)
              .then(function (response) {
                $scope.detailHoaDon = response.data;
                $scope.phiVanChuyen = $scope.detailHoaDon.phiShip;
              });

            $scope.updateTongTien =
              $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
            $http
              .put(
                hoaDonAPI + "/update-tong-tien/" + $routeParams.id,
                $scope.updateTongTien
              )
              .then(function () {
                $scope.detailHD();
              });
          });
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
        $scope.visiblePages = $scope.getVisiblePages();
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
  $scope.update = function (id) {
    $http
      .put(hoaDonAPI + "/update/" + id, $scope.formHoaDon)
      .then(function (response) {
        $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
          $scope.listHoaDon = response.data;

          alert(response.data);
        });
      });
  };
  $scope.getListSuHoaDon = function () {
    $http
      .get(hoaDonAPI + "/lich-su/" + $routeParams.id)
      .then(function (response) {
        $scope.listlichsu = response.data;
        console.log("idhd", $scope.listlichsu);
      });
  };
  $scope.getListSuHoaDon();
  $scope.beautifyDate = function (date) {
    // Sử dụng Moment.js để định dạng ngày tháng
    return moment(date).format("hh:mm A, DD/MM/YYYY");
  };
  $scope.khongNhanHang = function () {
    $scope.hoaDonId = $routeParams.id;

    // Hiển thị hộp thoại xác nhận với thông báo và nút xác nhận/hủy
    var xacNhanHuy = confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");

    if (!xacNhanHuy) {
      // Nếu người dùng chọn "Hủy", không thực hiện bước tiếp theo
      return;
    }

    // Nếu người dùng chọn "OK", tiếp tục với lựa chọn hủy đơn hàng

    var danhSachLyDo = ["Khách không nhận"];

    // Hiển thị danh sách lựa chọn cho người dùng
    var noiDung = prompt(
      "Chọn lý do hủy đơn hàng:\n" + danhSachLyDo.join("\n")
    );

    // Kiểm tra nếu người dùng đã chọn một lựa chọn
    if (noiDung !== null && noiDung !== "") {
      // Người dùng đã chọn một lựa chọn, sử dụng lựa chọn đó
      console.log("Lý do khách hàng không nhận:", noiDung);
      // Thêm mã logic xử lý hủy đơn hàng tại đây
    } else {
      // Người dùng đã chọn 'Hủy' hoặc đóng prompt, không thực hiện bước tiếp theo
      console.log("Người dùng đã chọn Hủy hoặc đóng prompt.");
    }

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.vai,
      idDonHang: $scope.hoaDonId,
      noiDung: noiDung,
      nguoiTao: $scope.storedUser.hoTen,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/khong-nhan-hang", data, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        alert(" Thành công!");
        setTimeout(function () {
          window.location.reload();
        }, 1000);
        // Xử lý lỗi nếu có
      });
  };
  $scope.huyDonHang = function () {
    $scope.hoaDonId = $routeParams.id;

    // Hiển thị hộp thoại xác nhận với thông báo và nút xác nhận/hủy
    var xacNhanHuy = confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");

    if (!xacNhanHuy) {
      // Nếu người dùng chọn "Hủy", không thực hiện bước tiếp theo
      return;
    }

    // Nếu người dùng chọn "OK", tiếp tục với lựa chọn hủy đơn hàng

    var danhSachLyDo = ["Sai thông tin"];

    // Hiển thị danh sách lựa chọn cho người dùng
    var noiDung = prompt(
      "Chọn lý do hủy đơn hàng:\n" + danhSachLyDo.join("\n")
    );

    // Kiểm tra nếu người dùng đã chọn một lựa chọn
    if (noiDung !== null && noiDung !== "") {
      // Người dùng đã chọn một lựa chọn, sử dụng lựa chọn đó
      console.log("Lý do hủy đơn hàng:", noiDung);
      // Thêm mã logic xử lý hủy đơn hàng tại đây
    } else {
      // Người dùng đã chọn 'Hủy' hoặc đóng prompt, không thực hiện bước tiếp theo
      console.log("Người dùng đã chọn Hủy hoặc đóng prompt.");
    }

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.vai,
      idDonHang: $scope.hoaDonId,
      noiDung: noiDung,
      nguoiTao: $scope.storedUser.hoTen,
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
        setTimeout(function () {
          window.location.reload();
        }, 1000);
        // Xử lý lỗi nếu có
      });
  };
  $scope.daNhanHang = function (hang) {
    $scope.hoaDonId = $routeParams.id;

    console.log("Id hoadon", $scope.hoaDonId);
    console.log("Id hoadon", $scope.vai);

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.vai,
      idDonHang: $scope.hoaDonId,
      nguoiTao: $scope.storedUser.hoTen,
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
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };
  $scope.daXacNhan = function (detailHoaDon) {
    $scope.hoaDonId = $routeParams.id;

    console.log("Id hoadon", $scope.hoaDonId);
    console.log("Id hoadon", $scope.vai);

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.vai,
      idDonHang: $scope.hoaDonId,
      nguoiTao: $scope.storedUser.hoTen,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/da-xac-nhan", data, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        // $scope.exportToPDF();
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };
  $scope.xacNhanDonHang = function (detailHoaDon) {
    $scope.hoaDonId = $routeParams.id;

    console.log("Id hoadon", $scope.hoaDonId);
    console.log("Id hoadon", $scope.vai);

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.vai,
      idDonHang: $scope.hoaDonId,
      nguoiTao: $scope.storedUser.hoTen,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/xac-nhan-don-hang", data, config)
      .then(function (response) {})
      .catch(function () {
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };

  $scope.invoice = {
    ngayTaoDon: "",
    tenShop: "SIMPLE",
    diaChiShop: "Số nhà 56, Ngõ 2 Nguyên Xá, Bắc Từ Liêm, Hà Nội",
    tenNguoiGui: $scope.storedUser.hoTen,
    tenNguoiNhan: "Dat",
    soDienThoaiNhanHang: "0363446243",
    diaChiNhanHang: "Số nhà 56, Ngõ 2 Nguyên Xá, Bắc Từ Liêm, Hà Nội",
    sanPham: "Ao",
    soLuong: "3",
    tenThuHo: "30000",
  };

  // var jsPDF = window.jsPDF || window.jspdf;
  // $scope.exportToPDF = function () {
  //   // Tạo đối tượng jsPDF
  //   var doc = new jsPDF.default();

  //   // Section 1: Shop Information
  //   doc.setFontSize(16);
  //   doc.text("THÔNG TIN SHOP", 20, 20);
  //   doc.setFontSize(12);
  //   doc.text("Ngày tạo đơn: " + $scope.invoice.ngayTaoDon, 20, 30);
  //   doc.text("Shop: " + $scope.invoice.tenShop, 20, 40);
  //   doc.text("Địa chỉ shop: " + $scope.invoice.diaChiShop, 20, 50);
  //   doc.text("Người gửi: " + $scope.invoice.tenNguoiGui, 20, 60);
  //   doc.text("Số điện thoại: " + $scope.invoice.soDienThoaiNhanHang, 20, 70);

  //   // Section 2: Recipient Information
  //   doc.setFontSize(16);
  //   doc.text("THÔNG TIN NGƯỜI NHẬN", 20, 90);
  //   doc.setFontSize(12);
  //   doc.text("Người nhận: " + $scope.invoice.tenNguoiNhan, 20, 100);
  //   doc.text("Số điện thoại: " + $scope.invoice.soDienThoaiNhanHang, 20, 110);
  //   doc.text("Địa chỉ: " + $scope.invoice.diaChiNhanHang, 20, 120);
  //   doc.text("Sản phẩm: " + $scope.invoice.sanPham, 20, 130);
  //   doc.text("Số lượng: " + $scope.invoice.soLuong, 20, 140);
  //   doc.text("Thu hộ: " + $scope.invoice.tenThuHo, 20, 150);

  //   // Xuất file PDF
  //   doc.save("hoa-don.pdf");
};
