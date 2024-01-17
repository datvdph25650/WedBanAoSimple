window.updateTayAoController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.formTayAo = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http.get(tayAoAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formTayAo = response?.data;
    }
  });
  $scope.errorProgress = function () {
    let elem = document.getElementById("error");
    let width = 100;
    let id = setInterval(frame, 10);

    function frame() {
      if (width <= 0) {
        newListTayAo;
        clearInterval(id);
      } else {
        width--;
        elem.style.width = width + "%";
      }
    }
  };
  $scope.update = function () {
    let isDuplicate = false;
    $scope.newListTayAo = [];

    if ($scope.formTayAo.ten === "") {
      $scope.message = "Tên tay áo không được trống";
      toastBootstrap.show();
      $scope.errorProgress();
    } else {
      $http.get(tayAoAPI + "/get-all").then(function (response) {
        $scope.listTayAo = response?.data;

        $http
          .get(tayAoAPI + "/detail/" + $routeParams.id)
          .then(function (responseDetail) {
            if (responseDetail.status === 200) {
              $scope.detailTayAo = responseDetail?.data;

              $scope.newListTayAo = $scope.listTayAo.filter(
                (tayAo) => tayAo.ten !== $scope.detailTayAo.ten
              );
              console.log($scope.newListTayAo);
              $scope.newListTayAo.forEach((tayAo) => {
                if (tayAo.ten === $scope.formTayAo.ten) {
                  isDuplicate = true;
                }
              });
              if (!isDuplicate) {
                $scope.updateTayAo = {
                  ten: $scope.formTayAo.ten,
                  ngaySua: new Date(),
                  daXoa: $scope.formTayAo.daXoa,
                };

                $http
                  .put(
                    tayAoAPI + "/update/" + $routeParams.id,
                    $scope.updateTayAo
                  )
                  .then(function () {
                    $rootScope.message = "Cập nhật thành công";
                    $location.path("/tay-ao/hien-thi");
                  });
              } else {
                $scope.message = "Tên tay áo không được trùng";
                toastBootstrap.show();
                $scope.errorProgress();
              }
            }
          });
      });
    }
  };
};
