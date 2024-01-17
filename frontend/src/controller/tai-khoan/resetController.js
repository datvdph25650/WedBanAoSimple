window.resetController = function ($http, $scope, $rootScope, $location) {
  $scope.resetPassword = function () {
    var token = getParameterByName("token");

    if ($scope.newPassword !== $scope.confirmPassword) {
      $scope.errorMessage = "Mật khẩu không giống";
      return;
    }

    $http
      .post(taiKhoanAPI + "/reset-password?token=" + token, {
        newPassword: $scope.newPassword,
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("Đã đổi mật khẩu thành công");
          $location.path("/login");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("Mật khẩu đã được đổi");
      });
  };

  function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
};
