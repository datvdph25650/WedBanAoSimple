window.hienThiSanPhamChiTietController = function (
  $scope,
  $http,
  $routeParams
) {
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  let storedUserData = localStorage.getItem("loggedInAdmin");
  $scope.storedUser = JSON.parse(storedUserData);
  $scope.detailSanPham = {
    id: "",
    ten: "",
    moTa: "",
    daXoa: Boolean,
  };
  $scope.getSanPhamChiTiet = function () {
    $http
      .get(
        sanPhamChiTietAPI +
          "/hien-thi/" +
          $routeParams.id +
          "?pageNo=" +
          $scope.currentPage
      )
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        console.log($scope.listSanPhamChiTiet);
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
    $http
      .get(sanPhamAPI + "/detail/" + $routeParams.id)
      .then(function (response) {
        $scope.detailSanPham = response.data;
      });
  };
  $scope.getSanPhamChiTiet();

  $scope.changePage = function (index) {
    $scope.currentPage = index;
    $scope.getSanPhamChiTiet();
  };
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.previousPage = function () {
    if ($scope.currentPage >= 0) {
      $scope.currentPage--;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.getVisiblePages = function () {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages; // Số trang tối đa để hiển thị
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

    // Tạo danh sách trang hiển thị
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
  $scope.updateSanPham = function (e, id) {
    e.preventDefault();
    $scope.sanPhamUpdate = {
      ten: $scope.detailSanPham.ten,
      moTa: $scope.detailSanPham.moTa,
      nguoiSua: $scope.storedUser.hoTen,
      ngaySua: new Date(),
      daXoa: $scope.detailSanPham.daXoa,
    };
    $http
      .put(sanPhamAPI + "/update/" + id, $scope.sanPhamUpdate)
      .then(function () {
        $scope.message = "Cập nhật sản phẩm thành công";
        $scope.getSanPhamChiTiet();
      });
  };
  $scope.detailSanPhamChiTietF = function (e, id) {
    e.preventDefault();
    $http.get(sanPhamChiTietAPI + "/detail/" + id).then(function (response) {
      $scope.detailSanPhamChiTiet = response.data;
      console.log($scope.detailSanPhamChiTiet);
    });
  };
  $scope.updateSanPhamChiTietF = function (e, id) {
    let productImages = document.getElementById("product-image");
    for (const file of productImages.files) {
      $scope.urlImage = file.name;
    }
    if ($scope.urlImage == "") {
      $scope.updateSanPhamChiTiet = {
        idHoaTiet: $scope.detailSanPhamChiTiet.hoaTiet.id,
        idPhongCach: $scope.detailSanPhamChiTiet.phongCach.id,
        idChatLieu: $scope.detailSanPhamChiTiet.chatLieu.id,
        idCoAo: $scope.detailSanPhamChiTiet.coAo.id,
        idTayAo: $scope.detailSanPhamChiTiet.tayAo.id,
        soLuong: $scope.detailSanPhamChiTiet.soLuong,
        donGia: $scope.detailSanPhamChiTiet.donGia,
        daXoa: $scope.detailSanPhamChiTiet.daXoa,
        urlImage: $scope.urlImage,
        nguoiSua: $scope.storedUser.hoTen,
        ngaySua: new Date(),
      };
      $http
        .put(sanPhamChiTietAPI + "/update/" + id, $scope.updateSanPhamChiTiet)
        .then(function () {
          $scope.getSanPhamChiTiet();
        });
    } else {
      $scope.updateSanPhamChiTiet = {
        idMauSac: $scope.detailSanPhamChiTiet.mauSac.id,
        idKichThuoc: $scope.detailSanPhamChiTiet.kichThuoc.id,
        idHoaTiet: $scope.detailSanPhamChiTiet.hoaTiet.id,
        idPhongCach: $scope.detailSanPhamChiTiet.phongCach.id,
        idChatLieu: $scope.detailSanPhamChiTiet.chatLieu.id,
        idCoAo: $scope.detailSanPhamChiTiet.coAo.id,
        idTayAo: $scope.detailSanPhamChiTiet.tayAo.id,
        soLuong: $scope.detailSanPhamChiTiet.soLuong,
        donGia: $scope.detailSanPhamChiTiet.donGia,
        daXoa: $scope.detailSanPhamChiTiet.daXoa,
        urlImage: $scope.urlImage,
        ngaySua: new Date(),
      };
      $http
        .put(sanPhamChiTietAPI + "/update/" + id, $scope.updateSanPhamChiTiet)
        .then(function () {
          $scope.getSanPhamChiTiet();
        });
    }
  };

  //get thuoc tinh san pham
  $scope.getChatLieuTrangThai = function () {
    $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
      $scope.listChatLieuTrangThai = response.data;
    });
  };
  $scope.getChatLieuTrangThai();

  $scope.getKichThuocTrangThai = function () {
    $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
      $scope.listKichThuocTrangThai = response.data;
    });
  };
  $scope.getKichThuocTrangThai();

  $scope.getMauSacTrangThai = function () {
    $http.get(mauSacAPI + "/trang-thai").then(function (response) {
      $scope.listMauSacTrangThai = response.data;
    });
  };
  $scope.getMauSacTrangThai();

  $scope.getHoaTietTrangThai = function () {
    $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
      $scope.listHoaTietTrangThai = response.data;
    });
  };
  $scope.getHoaTietTrangThai();

  $scope.getPhongCachTrangThai = function () {
    $http.get(phongCachAPI + "/trang-thai").then(function (response) {
      $scope.listPhongCachTrangThai = response.data;
    });
  };
  $scope.getPhongCachTrangThai();

  $scope.getKichThuocTrangThai = function () {
    $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
      $scope.listKichThuocTrangThai = response.data;
    });
  };
  $scope.getKichThuocTrangThai();

  $scope.getMauSacTrangThai = function () {
    $http.get(mauSacAPI + "/trang-thai").then(function (response) {
      $scope.listMauSacTrangThai = response.data;
    });
  };
  $scope.getMauSacTrangThai();

  $scope.getCoAoTrangThai = function () {
    $http.get(coAoAPI + "/trang-thai").then(function (response) {
      $scope.listCoAoTrangThai = response.data;
    });
  };
  $scope.getCoAoTrangThai();

  $scope.getTayAoTrangThai = function () {
    $http.get(tayAoAPI + "/trang-thai").then(function (response) {
      $scope.listTayAoTrangThai = response.data;
    });
  };
  $scope.getTayAoTrangThai();
};
