window.trangChuController = function ($scope, $http) {
  $scope.listSanPhamChiTiet = [];
  $scope.listSanPham = [];
  $scope.detailSanPham = {
    id: "",
    ten: "",
    moTa: "",
    daXoa: Boolean,
  };
  $scope.detailMauSac = {
    id: "",
    tenMauSac: "",
    daXoa: Boolean,
  };
  $scope.detailKichThuoc = {
    id: "",
    tenKichThuoc: "",
    daXoa: Boolean,
  };

  $scope.getTopBanChay = function () {
    $http.get(sanPhamChiTietAPI + "/ban-chay").then(function (response) {
      $scope.listTopSanPhamBanChay = response?.data;
      console.log($scope.listTopSanPhamBanChay);

      const groupedSanPham = {};
      const listTenSanPham = [];
      const soLuongSanPhamToiDa = 8;
      let soLuongDaLay = 0;

      for (let i = 0; i < $scope.listTopSanPhamBanChay.length; i++) {
        const sanPham = $scope.listTopSanPhamBanChay[i];
        const tenSanPham = sanPham.tenSanPham;

        if (
          !listTenSanPham.includes(tenSanPham) &&
          soLuongDaLay < soLuongSanPhamToiDa
        ) {
          listTenSanPham.push(tenSanPham);
          soLuongDaLay++;

          groupedSanPham[tenSanPham] = {
            ...sanPham,
            duongDan: [sanPham.duongDan],
            giaMin: sanPham.donGia,
            giaMax: sanPham.donGia,
          };
        } else {
          // Nếu sản phẩm đã có trong danh sách tên hoặc đã lấy đủ số lượng, bỏ qua
          continue;
        }
      }

      // Chuyển đổi object thành mảng
      $scope.listTopSanPhamBanChay = Object.values(groupedSanPham);

      console.log($scope.listTopSanPhamBanChay);
    });
  };

  $scope.detailSanPham = function (idSanPham) {
    // console.log(idSanPham);
    // $http
    //   .get(sanPhamChiTietAPI + "/detail/" + $routeParams.id)
    //   .then(function (response) {
    //     $scope.detailSanPhamChiTiet = response.data;
    //     console.log($scope.detailSanPhamChiTiet);
    //   });
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
  $scope.getTopSanPhamMoi = function () {
    $http.get(sanPhamChiTietAPI + "/trang-chu").then(function (response) {
      $scope.listTopSanPham = response?.data;
      console.log($scope.listTopSanPham);

      const groupedSanPham = {};
      const listTenSanPham = [];
      const soLuongSanPhamToiDa = 8;
      let soLuongDaLay = 0;

      for (let i = 0; i < $scope.listTopSanPham.length; i++) {
        const sanPham = $scope.listTopSanPham[i];
        const tenSanPham = sanPham.tenSanPham;

        if (
          !listTenSanPham.includes(tenSanPham) &&
          soLuongDaLay < soLuongSanPhamToiDa
        ) {
          listTenSanPham.push(tenSanPham);
          soLuongDaLay++;

          groupedSanPham[tenSanPham] = {
            ...sanPham,
            duongDan: [sanPham.duongDan],
            giaMin: sanPham.donGia,
            giaMax: sanPham.donGia,
          };
        } else {
          // Nếu sản phẩm đã có trong danh sách tên hoặc đã lấy đủ số lượng, bỏ qua
          continue;
        }
      }

      // Chuyển đổi object thành mảng
      $scope.listTopSanPham = Object.values(groupedSanPham);

      console.log($scope.listTopSanPham);
    });
  };
  $scope.getTopSanPhamMoi();
  $scope.getTopBanChay();
};
