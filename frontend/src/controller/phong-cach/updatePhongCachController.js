window.updatePhongCachController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  $scope.formPhongCach = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

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
  $http
    .get(phongCachAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formPhongCach = response.data;
      }
    });

  $scope.update = function (e, idPhongCach) {
    e.preventDefault();
    if ($scope.formPhongCach.ten === "") {
      toastBootstrap.show();
      $scope.errorProgress();
      $scope.message = "Tên phong cách không được để trống ";
      return;
    }
    $scope.updatePhongCach = {
      ten: $scope.formPhongCach.ten,
      ngaySua: new Date(),
      daXoa: $scope.formPhongCach.daXoa,
    };
    $http
      .put(phongCachAPI + "/update/" + idPhongCach, $scope.updatePhongCach)
      .then(function () {
        $rootScope.message = "Cập nhật thành công";
        $location.path("/phong-cach/hien-thi");
      });
  };
};
