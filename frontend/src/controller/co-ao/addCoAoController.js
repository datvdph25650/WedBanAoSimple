window.addCoAoController = function ($http, $scope, $location, $rootScope) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $scope.randoom = "CA" + Math.floor(Math.random() * 10000) + 1;
  $scope.listCoAo = [];
  $scope.formCoAo = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };

  $scope.add = function (e) {
    e.preventDefault();
    let isDuplicate = false;
    if ($scope.formCoAo.ten == "") {
      $scope.message = "Tên cổ áo không được trống";
      $scope.errorProgress();
      toastBootstrap.show();
    } else {
      $http.get(coAoAPI + "/get-all").then(function (response) {
        $scope.listCoAo = response?.data;
        $scope.listCoAo.forEach((coAo) => {
          if (coAo.ten === $scope.formCoAo.ten) {
            $scope.message = "Tên cổ áo không được trùng";
            $scope.errorProgress();
            toastBootstrap.show();
            isDuplicate = true;
          }
        });
        if (!isDuplicate) {
          $http.post(coAoAPI + "/add", $scope.formCoAo).then(function () {
            $rootScope.message = "Thêm thành công";
            $location.path("/co-ao/hien-thi");
          });
        }
      });
    }
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
};
