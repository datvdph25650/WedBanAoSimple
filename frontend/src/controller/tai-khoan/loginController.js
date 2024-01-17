angular
  .module("myApp")
  .controller(
    "loginController",
    function ($http, $scope, $window, $route, $rootScope, $location, $timeout) {
      $scope.user = {
        email: "",
        matKhau: "",
      };

      $scope.list = {};
      $scope.isLoggedIn = false;
      $rootScope.trangthai = $scope.isLoggedIn;
      $scope.notification = ""; // Biến để chứa thông báo
      $scope.redirectToPage = function () {
        if ($scope.isLoggedIn) {
          // Nếu đã đăng nhập, xử lý logic cho trường hợp này
        } else {
          // Nếu chưa đăng nhập, chuyển hướng đến trang khác (ví dụ: #/login)
          $location.path("/login"); // Đảm bảo bạn đã inject $location vào controller của bạn
        }
      };
      $scope.isDropdownOpen = false;

      $scope.handleMouseEnter = function () {
        if ($scope.isLoggedIn) {
          // Xử lý logic hiển thị dropdown menu khi di chuột vào
          $scope.isDropdownOpen = true;
        }
      };

      $scope.handleMouseLeave = function () {
        var dropdown = document.querySelector(".dropdown-menu");
        if (dropdown && dropdown.contains(event.relatedTarget)) {
          // Chuột vẫn ở trong dropdown, không đặt $scope.isDropdownOpen = false;
        } else {
          // Chuột đã rời khỏi dropdown, đặt $scope.isDropdownOpen = false;
          $scope.isDropdownOpen = false;
        }
      };

      $scope.handleDropdownLeave = function () {
        // Xử lý khi di chuột ra khỏi vùng dropdown
        $scope.isDropdownOpen = false;
      };

      var storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        $scope.list = JSON.parse(storedUser);
        $scope.isLoggedIn = true;

        $rootScope.idKhachHang = $scope.list.id;
        $rootScope.ten = $scope.list.hoTen;
        $rootScope.email = $scope.list.email;
        $rootScope.sdt = $scope.list.soDienThoai;
        $rootScope.$on("dataFromGioHang", function (event, data) {
          $scope.dataFromGioHang = data;
          console.log("số lượng giỏ hàng :", $scope.dataFromGioHang);

          // Thêm thông báo vào biến notification
          $scope.notification = "Số lượng giỏ hàng đã được cập nhật.";
        });
      }

      $scope.login = function () {
        $http
          .post(taiKhoanAPI + "/login", $scope.user)
          .then(function (response) {
            if (response.status === 200) {
              $scope.list = response.data;
              $scope.isLoggedIn = true;
              $location.path("/trang-chu");
              $timeout(function () {
                $window.location.reload();
              }, 0);
              alert("Đăng nhập thành công");

              localStorage.setItem("loggedInUser", JSON.stringify($scope.list));
            } else {
              alert("Invalid credentials");
            }
          })
          .catch(function (error) {
            console.error(error);
            alert("Email và số điện thoại hoặc mật khẩu không đúng");
          });
      };

      $scope.logout = function () {
        localStorage.removeItem("loggedInUser");
        $scope.isLoggedIn = false;
        $location.path("/trang-chu");
        $timeout(function () {
          $window.location.reload();
        }, 0);
        alert("Đã đăng xuất");
      };
    }
  );
