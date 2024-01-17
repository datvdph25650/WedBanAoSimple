window.maGiamGiaChiTietController = function ($http, $scope, $routeParams) {
  $scope.listMaGiamGiaChiTiet = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.detailProduct = {
    id: "",
    dongia: "",
    dongiasaugiam: "",
    idma: "",
    hoaDon: "",
  };

  $scope.getMaGiamGiaChiTiet = function () {
    $http
      .get(
        maGiamGiaChiTietAPI +
          "/hien-thi/" +
          $routeParams.id +
          "?pageNo=" +
          $scope.currentPage
      )
      .then(function (response) {
        if (response.status == 200) {
          $scope.listMaGiamGiaChiTiet = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        }
      });
  };
  $scope.getMaGiamGiaChiTiet();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getMaGiamGiaChiTiet();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getMaGiamGiaChiTiet();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getMaGiamGiaChiTiet();
    }
  };
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
};
