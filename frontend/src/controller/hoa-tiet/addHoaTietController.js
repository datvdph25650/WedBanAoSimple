window.addHoaTietController = function ($http, $scope, $location, $rootScope) {
  const toastLiveExample = document.getElementById("liveToast");

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $scope.randoom = "HT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formHoaTiet = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.errorProgress = function () {
    let elem = document.getElementById("error");
    let width = 100;
    let id = setInterval(frame, 10);

    function frame() {
      if (width <= 0) {
        clearInterval(id);
      } else {
        width--;
        elem.style.width = width + "%";
      }
    }
  };
  $scope.add = function (e) {
    e.preventDefault();
    let isDuplicate = false;
    if ($scope.formHoaTiet.ten == "") {
      $scope.message = "Tên họa tiết không được trống";
      $scope.errorProgress();
      toastBootstrap.show();
    } else {
      $http.get(hoaTietAPI + "/get-all").then(function (response) {
        $scope.listHoaTiet = response?.data;
        $scope.listHoaTiet.forEach((hoaTiet) => {
          if (hoaTiet.ten === $scope.formHoaTiet.ten) {
            isDuplicate = true;
            $scope.message = "Tên họa tiết không được trùng";
            $scope.errorProgress();
            toastBootstrap.show();
          }
        });
        if (!isDuplicate) {
          $http.post(hoaTietAPI + "/add", $scope.formHoaTiet).then(function () {
            $rootScope.message = "Thêm thành công";
            $location.path("/hoa-tiet/hien-thi");
          });
        }
      });
    }
  };
};
