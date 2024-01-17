window.addTayAoController = function ($http, $scope, $location, $rootScope) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.randoom = "TA" + Math.floor(Math.random() * 10000) + 1;
  $scope.formTayAo = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };

  $scope.add = function (e) {
    e.preventDefault();
    let isDuplicate = false;
    if ($scope.formTayAo.ten == "") {
      $scope.message = "Tên tay áo không được trống";
      $scope.errorProgress();
      toastBootstrap.show();
    } else {
      $http.get(tayAoAPI + "/get-all").then(function (response) {
        $scope.listTayAo = response?.data;
        $scope.listTayAo.forEach((tayAo) => {
          if (tayAo.ten === $scope.formTayAo.ten) {
            $scope.message = "Tên tay áo không được trùng";
            $scope.errorProgress();
            toastBootstrap.show();
            isDuplicate = true;
          }
        });
        if (!isDuplicate) {
          $http.post(tayAoAPI + "/add", $scope.formTayAo).then(function () {
            $rootScope.message = "Thêm thành công";
            $location.path("/tay-ao/hien-thi");
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
