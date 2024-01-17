// nhanvienloginController.js
angular.module("loginApp", []).controller("nhanVienController", [
  "$scope",
  "$http",
  "$window",
  function ($scope, $http, $window) {
    $scope.email = null;
    $scope.matKhau = null;

    $scope.nhanVienLogin = {};

    $scope.login = function () {
      $http
        .get(
          nhanVienAPI +
            "/login?email=" +
            $scope.email +
            "&matKhau=" +
            $scope.matKhau
        )
        .then(function (response) {
          if (response.status === 200) {
            $scope.nhanVienLogin = response?.data;

            if ($scope.nhanVienLogin) {
              $window.location.href = "/src/pages/admin.html#/admin";
              localStorage.setItem(
                "loggedInAdmin",
                JSON.stringify($scope.nhanVienLogin)
              );
            } else {
              alert("Email, số điện thoại hoặc mật khẩu không đúng");
            }
          }
        });
    };
  },
]);
