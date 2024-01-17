window.hienThiHoaDonController = function (
  $http,
  $scope,
  $location,
  $timeout,
  $window,
  $rootScope,
  $httpParamSerializerJQLike
) {
  $scope.listHoaDon = [];
  $scope.visiblePages = [];
  $scope.listLichSuHoaDon = [];
  $scope.filteredHoaDonList = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.totalPagesFilter = [];
  $scope.currentPageFilter = 0;
  $scope.maxVisiblePages = 3;
  $scope.phiVanChuyen = 0;
  $scope.giamGia = 0;
  $scope.total = 0;
  $scope.selectedTab = null;
  $scope.getData = function () {
    $http
      .get(hoaDonAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listHoaDon = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.total = $scope.totalPages.length;
        $scope.visiblePages = $scope.getVisiblePages(
          $scope.totalPages.length,
          $scope.currentPage
        );
      });
    console.log($scope.visiblePages);
  };
  $scope.getData();
  $scope.selectTab = function (tab) {
    $scope.selectedTab = tab;
    $scope.filterDataByTab(tab);
  };

  $scope.filterDataByTab = function (tab) {
    if (tab === null) {
      $scope.getData();
    } else {
      $http
        .get(
          hoaDonAPI +
            "/loc?pageNo=" +
            $scope.currentPageFilter +
            "&trangThai=" +
            tab
        )
        .then(function (response) {
          $scope.listHoaDon = response?.data.content;
          $scope.customIndex = $scope.currentPageFilter * response.data.size;
          $scope.totalPagesFilter = new Array(response.data.totalPages);
          $scope.total = $scope.totalPagesFilter.length;

          $scope.visiblePages = $scope.getVisiblePages(
            $scope.totalPagesFilter.length,
            $scope.currentPageFilter
          );
        });
    }
  };
  $scope.selectTab(null);
  $scope.isSelectedTab = function (tab) {
    return tab === $scope.selectedTab;
  };

  $scope.detail = function (id) {
    $http
      .get(hoaDonAPI + "/detail/" + id)
      .then(function (response) {
        if (response.status == 200) {
          $scope.formHoaDon = response.data;
        }
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  };
  $scope.changePage = function (index) {
    if (index >= 0) {
      if ($scope.selectedTab === null) {
        $scope.currentPage = index;
        $scope.filterDataByTab($scope.selectedTab);
      } else {
        $scope.currentPageFilter = index;
        $scope.filterDataByTab($scope.selectedTab);
      }
    }
  };

  $scope.nextPage = function () {
    if ($scope.selectedTab === null) {
      console.log("a");
      let length = $scope.totalPages.length;
      if ($scope.currentPage < length - 1) {
        $scope.currentPage++;
        $scope.filterDataByTab($scope.selectedTab);
      }
    } else {
      console.log("b");
      let length = $scope.totalPagesFilter.length;
      if ($scope.currentPageFilter < length - 1) {
        $scope.currentPageFilter++;
        $scope.filterDataByTab($scope.selectedTab);
      }
    }
  };

  $scope.previousPage = function () {
    if ($scope.selectedTab === null) {
      console.log("s");
      if ($scope.currentPage > 0) {
        $scope.currentPageFilter--;
        $scope.filterDataByTab($scope.selectedTab);
      }
    } else {
      console.log("b");
      if ($scope.currentPage > 0) {
        $scope.currentPageFilter--;
        $scope.filterDataByTab($scope.selectedTab);
      }
    }
  };

  $scope.update = function (id) {
    $http
      .put(hoaDonAPI + "/update/" + id, $scope.formHoaDon)
      .then(function (response) {
        $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
          $scope.listHoaDon = response.data;
        });
      });
  };
  $scope.lienHe = function () {
    var contactInfo =
      "Địa chỉ: Số nhà 56 Ngõ 2 Nguyên Xá Bắc Từ Liêm Hà Nội\nSố điện thoại: 0363446243";
    alert(contactInfo);
  };
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

  // $scope.getDonHangKhachHang = function () {
  //   // $scope.mergeDuplicateOrders = function (donHangList) {
  //   //   var mergedOrders = {}; // Đối tượng để gộp các đơn hàng
  //   //   var allOrders = []; // Mảng để hiển thị tất cả các đơn hàng

  //   //   for (var i = 0; i < donHangList.length; i++) {
  //   //     var donHang = donHangList[i];

  //   //     if (mergedOrders[donHang.hoaDonId]) {
  //   //       // Nếu đơn hàng đã tồn tại, cập nhật trạng thái và tổng tiền
  //   //       mergedOrders[donHang.hoaDonId].trangThai = donHang.trangThai; // Gộp trangThai
  //   //       mergedOrders[donHang.hoaDonId].tongTien = donHang.tongTien; // Gộp tổng tiền
  //   //       // Gộp sản phẩm vào danh sách sản phẩm của đơn hàng đã gộp
  //   //       mergedOrders[donHang.hoaDonId].products.push(donHang);
  //   //     } else {
  //   //       // Nếu đơn hàng chưa tồn tại, tạo một bản sao và thêm vào đối tượng đã gộp
  //   //       mergedOrders[donHang.hoaDonId] = {
  //   //         hoaDonId: donHang.hoaDonId,
  //   //         trangThai: donHang.trangThai,
  //   //         tongTien: donHang.tongTien,
  //   //         products: [donHang], // Tạo một mảng chứa sản phẩm của đơn hàng mới
  //   //       };
  //   //     }

  //   //     // Thêm đơn hàng vào mảng hiển thị tất cả các đơn hàng
  //   //     allOrders.push(donHang);
  //   //   }

  //   //   // Chuyển đối tượng gộp thành một mảng để hiển thị trong HTML
  //   //   $scope.donHangListMerged = Object.values(mergedOrders);
  //   //   $scope.allOrders = allOrders;
  //   // };

  //   // Gọi hàm gộp khi nhận được dữ liệu đơn hàng
  //   if (!$rootScope.idKhachHang) {
  //     console.error("idKhachHang is not set in $rootScope.");
  //     return;
  //   }

  //   $scope.idKhachHang = $rootScope.idKhachHang;
  //   console.log("id khach hang:", $rootScope.idKhachHang);
  //   $http
  //     .get(hoaDonAPI + "/hien-thiKh/" + $scope.idKhachHang)
  //     .then(function (response) {
  //       $scope.donHangList = response.data;
  //       $scope.mergeDuplicateOrders(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error("", error);
  //     });
  //   // $scope.statusMapping = {
  //   //   0: "Đơn hàng đang chờ xác nhận",
  //   //   1: "Đơn hàng đã xác nhận thành công",
  //   //   2: "Đơn hàng đang giao hàng",
  //   //   3: "Đơn hàng đã giao thành công",
  //   //   4: "Đơn hàng giao không thành công",
  //   //   5: "Đơn hàng đã hủy",
  //   //   // Thêm các ánh xạ khác nếu cần
  //   // };

  //   // $scope.getStatusColor = function (trangThai) {
  //   //   if (trangThai == 0) {
  //   //     return "color-cho-xac-nhan";
  //   //   } else if (trangThai == 1) {
  //   //     return "color-da-xac-nhan";
  //   //   } else if (trangThai == 2) {
  //   //     return "color-dang-giao-hang";
  //   //   } else if (trangThai == 3) {
  //   //     return "color-da-giao-thanh-cong";
  //   //   } else if (trangThai == 4) {
  //   //     return "color-giao-khong-thanh-cong";
  //   //   } else if (trangThai == 5) {
  //   //     return "color-da-huy";
  //   //   } else {
  //   //     return ""; // Nếu không phù hợp với bất kỳ trạng thái nào khác
  //   //   }
  //   // };
  // };
  $scope.selectedTabb = null;

  $scope.selectTabb = function (tabb) {
    $scope.selectedTabb = tabb;
    $scope.getLocHoaDon(tabb);
  };

  $scope.isSelectedTabb = function (tabb) {
    return tabb === $scope.selectedTabb;
  };
  $scope.getLocHoaDon = function (tabb) {
    $scope.mergeDuplicateOr = function (dh) {
      var mergedOrders = {}; // Đối tượng để gộp các đơn hàng
      var allOrders = []; // Mảng để hiển thị tất cả các đơn hàng
      // dh.filter(hoaDon=>{
      //   hoaDon.hoaDonId
      //   $scope.listHoaDonChiTietTinhTong
      // })
      for (var i = 0; i < dh.length; i++) {
        var donHang = dh[i];

        if (mergedOrders[donHang.hoaDonId]) {
          // Nếu đơn hàng đã tồn tại, cập nhật trạng thái và tổng tiền
          mergedOrders[donHang.hoaDonId].trangThai = donHang.trangThai; // Gộp trangThai
          mergedOrders[donHang.hoaDonId].tongTien = donHang.tongTien; // Gộp tổng tiền
          // Gộp sản phẩm vào danh sách sản phẩm của đơn hàng đã gộp
          mergedOrders[donHang.hoaDonId].products.push(donHang);
        } else {
          // Nếu đơn hàng chưa tồn tại, tạo một bản sao và thêm vào đối tượng đã gộp
          mergedOrders[donHang.hoaDonId] = {
            hoaDonId: donHang.hoaDonId,
            trangThai: donHang.trangThai,
            tongTien: donHang.tongTien,
            products: [donHang], // Tạo một mảng chứa sản phẩm của đơn hàng mới
          };
        }

        // Thêm đơn hàng vào mảng hiển thị tất cả các đơn hàng
        allOrders.push(donHang);
      }

      // Chuyển đối tượng gộp thành một mảng để hiển thị trong HTML
      $scope.donHangListMerged = Object.values(mergedOrders);
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
    if (tabb === null) {
      $http
        .get(hoaDonAPI + "/hien-thiKh/" + $scope.idKhachHang)
        .then(function (response) {
          $scope.dh = response.data;
          console.log($scope.dh);
          // $scope.dh.forEach((hoaDon) => {
          //   $http
          //     .get(hoaDonChiTietAPI + "/tinh-tong/" + hoaDon.hoaDonId)
          //     .then(function (response) {
          //       $scope.listHoaDonChiTietTinhTong = response.data;
          //       $scope.tienHang = $scope.listHoaDonChiTietTinhTong.reduce(
          //         (total, item) => total + item.thanhTien,
          //         0
          //       );
          //       $scope.tongTien =
          //         $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
          //       console.log("tong tien: " + $scope.tongTien);
          //     });
          // });

          $scope.mergeDuplicateOr(response.data);
        })
        .catch(function (error) {});
    } else {
      $http
        .get(
          hoaDonAPI +
            "/searchhd?id=" +
            $scope.idKhachHang +
            "&trangThai=" +
            tabb
        )
        .then(function (response) {
          $scope.dh = response.data;
          $scope.mergeDuplicateOr(response.data);
        })
        .catch(function (error) {});
    }
  };
  $scope.selectTabb(null);
  $scope.huyDonHang = function (hang) {
    // Hiển thị hộp thoại xác nhận với thông báo và nút xác nhận/hủy
    var xacNhanHuy = confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");

    if (!xacNhanHuy) {
      // Nếu người dùng chọn "Hủy", không thực hiện bước tiếp theo
      return;
    }

    // Nếu người dùng chọn "OK", tiếp tục với lựa chọn hủy đơn hàng

    var danhSachLyDo = [
      "Không muốn mua nữa",
      "Sai thông tin",
      "Đơn hàng được tạo do sự nhầm lẫn",
      "Sai địa chỉ",
    ];

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

    console.log("idKhachHang", $scope.hoTen);
    console.log("idDonHang", hang.hoaDonId);
    $rootScope.hangg = hang.hoaDonId;

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
        setTimeout(function () {
          window.location.reload();
        }, 1000);
        // Xử lý lỗi nếu có
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
        setTimeout(function () {
          window.location.reload();
        }, 1000);
        // Xử lý lỗi nếu có
      });
  };
  $scope.hienThiHoaDonTimeLine = function (hang) {
    $rootScope.hangg = hang.hoaDonId;
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
          } else {
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
};
