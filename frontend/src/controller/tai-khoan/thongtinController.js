window.thongtinController = function (
  $http,
  $scope,
  $rootScope,
  $httpParamSerializerJQLike,
  $window
) {
  $http
    .get(khachHangAPI + "/detail/" + $rootScope.idKhachHang)
    .then(function (response) {
      $scope.detailKhachHang = response?.data;
      $scope.detailKhachHang.ngaySinh = new Date(response.data.ngaySinh);
    });
  $scope.showForm = false;

  $scope.toggleFormVisibility = function () {
    $scope.showForm = !$scope.showForm;
  };

  $scope.confirmChangePassword = function () {
    // Your existing function logic here
  };
  $scope.confirmChangePassword = function () {
    $scope.data = $httpParamSerializerJQLike({
      email: $rootScope.email,
      currentPassword: $scope.currentPassword,
      newPassword: $scope.newPassword,
    });
    console.log($rootScope.email);

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(taiKhoanAPI + "/change-password", $scope.data, config)
      .then(function (response) {
        console.log(response.data);
        if (response.data.message === "Password has been changed") {
          // Handle success, update UI or show a success message

          alert("Đã đổi mật khẩu thành công");
          $window.location.reload();
        } else {
          // Handle other cases
        }
      })
      .catch(function (error) {
        alert("Lỗi đổi mật khẩu");

        // Handle error, update UI or show an error message
      });
  };

  $scope.updateKhachHang = function (event) {
    event.preventDefault();
    let check = true;
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.detailKhachHang.anhDaiDien = image.name;
      console.log(image.name);
    }
    $scope.khachHangUpdate = {
      hoTen: $scope.detailKhachHang.hoTen,
      email: $scope.detailKhachHang.email,
      gioiTinh: $scope.detailKhachHang.gioiTinh,
      matKhau: $scope.detailKhachHang.matKhau,
      ngaySinh: $scope.detailKhachHang.ngaySinh,
      anhDaiDien: $scope.detailKhachHang.anhDaiDien,
      soDienThoai: $scope.detailKhachHang.soDienThoai,
      ngaySua: new Date(),
      daXoa: $scope.detailKhachHang.daXoa,
    };
    if (check) {
      $http
        .put(
          khachHangAPI + "/update/" + $rootScope.idKhachHang,
          $scope.khachHangUpdate
        )
        .then(function () {
          alert("Cập nhật thành công");
        });
    }
  };
};
