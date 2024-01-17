window.tatCaSpController = function ($scope, $http) {
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

  $scope.getTopSanTatCa = function () {
    $http.get(sanPhamChiTietAPI + "/trang-chu").then(function (response) {
      $scope.listTopSanPham = response?.data;
      console.log($scope.listTopSanPham);
      const groupedSanPham = {};
      $scope.listTopSanPham.forEach((sanPham) => {
        const tenSanPham = sanPham.tenSanPham;

        if (!groupedSanPham[tenSanPham]) {
          groupedSanPham[tenSanPham] = {
            ...sanPham,
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
          if (!groupedSanPham[tenSanPham].duongDan.includes(sanPham.duongDan)) {
            groupedSanPham[tenSanPham].duongDan.push(sanPham.duongDan);
          }
        }
      });

      // Chuyển đổi object thành mảng
      $scope.listTopSanPham = Object.values(groupedSanPham);

      console.log($scope.listTopSanPham);
    });
  };
  $scope.getTopSanTatCa();
  $scope.detailSanPham = function (idSanPham) {
    // console.log(idSanPham);
    // $http
    //   .get(sanPhamChiTietAPI + "/detail/" + $routeParams.id)
    //   .then(function (response) {
    //     $scope.detailSanPhamChiTiet = response.data;
    //     console.log($scope.detailSanPhamChiTiet);
    //   });
  };
  $scope.searchTen = function () {
    $http
      .get(sanPhamChiTietAPI + "/searchTen?key=" + $scope.searchKeyword)
      .then(function (response) {
        $scope.listTopSanPham = response?.data;
        console.log($scope.listTopSanPham);
        const groupedSanPham = {};
        $scope.listTopSanPham.forEach((sanPham) => {
          const tenSanPham = sanPham.tenSanPham;

          if (!groupedSanPham[tenSanPham]) {
            groupedSanPham[tenSanPham] = {
              ...sanPham,
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
              !groupedSanPham[tenSanPham].duongDan.includes(sanPham.duongDan)
            ) {
              groupedSanPham[tenSanPham].duongDan.push(sanPham.duongDan);
            }
          }
        });

        // Chuyển đổi object thành mảng
        $scope.listTopSanPham = Object.values(groupedSanPham);

        console.log($scope.listTopSanPham);
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
