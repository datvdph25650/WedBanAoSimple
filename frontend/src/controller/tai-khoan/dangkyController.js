window.dangkyController = function ($http, $scope, $rootScope, $location) {
  $scope.randoom = "KH" + Math.floor(Math.random() * 10000) + 1;

  $scope.form_kh = {
    ma: $scope.randoom,
    hoTen: "",
    email: "",
    soDienThoai: "",
    matKhau: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.singup = function (event) {
    $http
      .post(taiKhoanAPI + "/singup", $scope.form_kh)
      .then(function () {
        alert("Đăng ký thành công ");
        $location.path("/login");
      })
      .catch(function (errorResponse) {
        if (errorResponse && errorResponse.preventDefault) {
          errorResponse.preventDefault();
        }
        alert("Email hoắc số điện thoại đã tồn tại");
        $scope.show = true;
      });
  };
};
