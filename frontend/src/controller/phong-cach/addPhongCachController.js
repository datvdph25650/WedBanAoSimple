window.addPhongCachController = function (
  $http,
  $scope,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.randoom = "PC" + Math.floor(Math.random() * 10000) + 1;

  $scope.formPhongCach = {
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
    if ($scope.formPhongCach.ten == "") {
      $scope.message = "Tên phong cách không được trống";
      $scope.errorProgress();
      toastBootstrap.show();
    } else {
      $http.get(phongCachAPI + "/get-all").then(function (response) {
        $scope.listPhongCach = response?.data;
        $scope.listPhongCach.forEach((phongCach) => {
          if (phongCach.ten === $scope.formPhongCach.ten) {
            isDuplicate = true;
            $scope.message = "Tên phong cách không được trùng";
            $scope.errorProgress();
            toastBootstrap.show();
          }
        });
        if (!isDuplicate) {
          $http
            .post(phongCachAPI + "/add", $scope.formPhongCach)
            .then(function () {
              $rootScope.message = "Thêm thành công";
              $location.path("/phong-cach/hien-thi");
            });
        }
      });
    }
  };
};
