window.hienThiHoaDonChiTiet = function (
  $http,
  $scope,
  $routeParams,
  $rootScope
) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.getData = function () {
    $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
      $scope.listHoaDon = response.data;
    });
  };

  $http.get(hoaDonAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formHoaDon = response.data;
      $rootScope.idhoaD = $routeParams.id;
      console.log("response.data", $rootScope.idhoaD);
    }
  });
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
};
