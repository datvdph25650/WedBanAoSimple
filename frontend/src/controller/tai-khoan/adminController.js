angular.module("myApp").controller("admin", [
  "$scope",
  "$window",
  "$http",
  function ($scope, $window, $http) {
    let storedUserData = localStorage.getItem("loggedInAdmin");
    $scope.storedUser = JSON.parse(storedUserData);

    if ($scope.storedUser === null) {
      $window.location.href = "/src/pages/login/dang-nhap.html";
    } else {
      $scope.role = $scope.storedUser.chucVu.ten;
    }
    $scope.logOut = function () {
      localStorage.removeItem("loggedInAdmin");
      $window.location.href = "/src/pages/login/dang-nhap.html";
    };
    $scope.thongBao = function () {
      $http.get(hoaDonAPI + "/thong-bao").then(function (response) {
        $scope.listHoaDon = response.data;
        // console.log(response.data);
        // $window.location.reload();
      });
    };
    $scope.thongBao();
    var interval = 5000; // 5000 milliseconds = 5 seconds
    setInterval(function () {
      $scope.$apply(function () {
        $scope.thongBao();
      });
    }, interval);
  },
]);
