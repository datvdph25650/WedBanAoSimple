var myApp = angular.module("myApp", ["ngRoute"]);
function checkAndRedirect($window) {
  let storedUserData = localStorage.getItem("loggedInAdmin");
  let storedUser = JSON.parse(storedUserData);
  console.log(storedUser);
  if (storedUser === null) {
    $window.location.href = "/src/pages/login/dang-nhap.html";
  } else {
    // var check = storedUser.chucVu.ten;
    // if (check === null) {
    //   $window.location.href = "/src/pages/login/dang-nhap.html";
    // }
  }
}
myApp.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/san-pham/hien-thi", {
      templateUrl: "san-pham/hien-thi-san-pham.html",
      controller: hienThiSanPhamController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/san-pham/add", {
      templateUrl: "san-pham/add-san-pham.html",
      controller: addSanPhamController,
    })
    .when("/san-pham/update/:id", {
      templateUrl: "san-pham/update-san-pham.html",
      controller: updateSanPhamController,
    })
    .when("/san-pham-chi-tiet/add", {
      templateUrl: "san-pham-chi-tiet/add-san-pham-chi-tiet.html",
      controller: addSanPhamChiTietController,
    })
    .when("/san-pham-chi-tiet/hien-thi/:id", {
      templateUrl: "san-pham-chi-tiet/hien-thi-san-pham-chi-tiet.html",
      controller: hienThiSanPhamChiTietController,
    })
    .when("/mau-sac/hien-thi", {
      templateUrl: "mau-sac/hien-thi-mau-sac.html",
      controller: hienThiMauSacController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/mau-sac/add", {
      templateUrl: "mau-sac/add-mau-sac.html",
      controller: addMauSacController,
    })
    .when("/mau-sac/update/:id", {
      templateUrl: "mau-sac/update-mau-sac.html",
      controller: updateMauSacController,
    })
    .when("/kich-thuoc/hien-thi", {
      templateUrl: "kich-thuoc/hien-thi-kich-thuoc.html",
      controller: hienThiKichThuocController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })

    .when("/kich-thuoc/add", {
      templateUrl: "kich-thuoc/add-kich-thuoc.html",
      controller: addKichThuocController,
    })
    .when("/kich-thuoc/update/:id", {
      templateUrl: "kich-thuoc/update-kich-thuoc.html",
      controller: updateKichThuocController,
    })
    .when("/chat-lieu/hien-thi", {
      templateUrl: "chat-lieu/hien-thi-chat-lieu.html",
      controller: hienThiChatLieuController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/chat-lieu/add", {
      templateUrl: "chat-lieu/add-chat-lieu.html",
      controller: addChatLieuController,
    })
    .when("/chat-lieu/update/:id", {
      templateUrl: "chat-lieu/update-chat-lieu.html",
      controller: updateChatLieuController,
    })
    .when("/hoa-tiet/hien-thi", {
      templateUrl: "hoa-tiet/hien-thi-hoa-tiet.html",
      controller: hienThiHoaTietController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/hoa-tiet/add", {
      templateUrl: "hoa-tiet/add-hoa-tiet.html",
      controller: addHoaTietController,
    })
    .when("/hoa-tiet/update/:id", {
      templateUrl: "hoa-tiet/update-hoa-tiet.html",
      controller: updateHoaTietController,
    })
    .when("/nhan-vien/hien-thi", {
      templateUrl: "nhan-vien/hien-thi-nhan-vien.html",
      controller: hienThiNhanVienController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/phong-cach/hien-thi", {
      templateUrl: "phong-cach/hien-thi-phong-cach.html",
      controller: hienThiPhongCachController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/phong-cach/add", {
      templateUrl: "phong-cach/add-phong-cach.html",
      controller: addPhongCachController,
    })
    .when("/phong-cach/update/:id", {
      templateUrl: "phong-cach/update-phong-cach.html",
      controller: updatePhongCachController,
    })
    .when("/co-ao/hien-thi", {
      templateUrl: "co-ao/hien-thi-co-ao.html",
      controller: hienThiCoAoController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/co-ao/add", {
      templateUrl: "co-ao/add-co-ao.html",
      controller: addCoAoController,
    })
    .when("/co-ao/update/:id", {
      templateUrl: "co-ao/update-co-ao.html",
      controller: updateCoAoController,
    })
    .when("/tay-ao/hien-thi", {
      templateUrl: "tay-ao/hien-thi-tay-ao.html",
      controller: hienThiTayAoController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/tay-ao/add", {
      templateUrl: "tay-ao/add-tay-ao.html",
      controller: addTayAoController,
    })
    .when("/tay-ao/update/:id", {
      templateUrl: "tay-ao/update-tay-ao.html",
      controller: updateTayAoController,
    })
    .when("/nhan-vien/add", {
      templateUrl: "nhan-vien/add-nhan-vien.html",
      controller: addNhanVienController,
    })
    .when("/nhan-vien/update/:id", {
      templateUrl: "nhan-vien/update-nhan-vien.html",
      controller: updateNhanVienController,
    })
    .when("/khach-hang/hien-thi", {
      templateUrl: "khach-hang/hien-thi-khach-hang.html",
      controller: hienThiKhachHangController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/khach-hang/add", {
      templateUrl: "khach-hang/add-khach-hang.html",
      controller: addKhachHangController,
    })

    .when("/hoa-don/hien-thi", {
      templateUrl: "hoa-don/hien-thi-hoa-don.html",
      controller: hienThiHoaDonController,
    })

    .when("/hoa-don/update/:id", {
      templateUrl: "hoa-don/hien-thi-don-hang.html",
      controller: DonHangController,
    })
    .when("/ma-giam-gia/hien-thi", {
      templateUrl: "ma-giam-gia/hien-thi-ma-giam-gia.html",
      controller: hienThiMaGiamGiaController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })

    .when("/ma-giam-gia/add", {
      templateUrl: "ma-giam-gia/add-ma-giam-gia.html",
      controller: addMaGiamGiaController,
    })
    .when("/loginAdmin", {
      templateUrl: "tai-khoan/login-nhan-vien.html",
    })
    .when("/ma-giam-gia/update/:id", {
      templateUrl: "ma-giam-gia/update-ma-giam-gia.html",
      controller: updateMaGiamGiaController,
    })
    .when("/ma-giam-gia-chi-tiet/detail/:id", {
      templateUrl: "ma-giam-gia-chi-tiet/ma-giam-gia-chi-tiet.html",
      controller: maGiamGiaChiTietController,
    })
    .when("/ban-hang/tai-quay", {
      templateUrl: "ban-hang-tai-quay/hien-thi.html",
      controller: addHoaDonController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })
    .when("/khach-hang/update/:id", {
      templateUrl: "khach-hang/update-khach-hang.html",
      controller: updateKhachHangController,
    })
    .when("/thong-ke/hien-thi", {
      templateUrl: "thong-ke/hien-thi-thong-ke.html",
      controller: hienThiThongKeController,
      resolve: {
        redirect: function ($window) {
          checkAndRedirect($window);
        },
      },
    })

    .otherwise({
      redirectTo: "/trang-chu",
    });
});
