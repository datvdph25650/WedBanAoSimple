window.forgetController = function ($http, $scope, $rootScope, $location) {
  $scope.forgotPassword = function () {
    $http
      .post(taiKhoanAPI + "/forgot-password", { email: $scope.email })
      .then(function (response) {
        if (response.status === 200) {
          alert("Vui lòng kiểm tra email");

          $location.path("/trang-chu");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("Email không tồn tại trong hệ thống");
      });
  };
};
