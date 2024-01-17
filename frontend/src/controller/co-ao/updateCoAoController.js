window.updateCoAoController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $http.get(coAoAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formCoAo = response?.data;
    }
  });
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
  $scope.update = function () {
    let isDuplicate = false;
    $scope.newListCoAo = [];

    if ($scope.formCoAo.ten === "") {
      $scope.message = "Tên cổ áo không được trống";
      toastBootstrap.show();
      $scope.errorProgress();
    } else {
      $http.get(coAoAPI + "/get-all").then(function (response) {
        $scope.listCoAo = response?.data;

        $http
          .get(coAoAPI + "/detail/" + $routeParams.id)
          .then(function (responseDetail) {
            if (responseDetail.status === 200) {
              $scope.detailCoAo = responseDetail?.data;

              $scope.newListCoAo = $scope.listCoAo.filter(
                (coAo) => coAo.ten !== $scope.detailCoAo.ten
              );
              console.log($scope.newListCoAo);
              $scope.newListCoAo.forEach((coAo) => {
                if (coAo.ten === $scope.formCoAo.ten) {
                  isDuplicate = true;
                }
              });
              if (!isDuplicate) {
                $scope.updateCoAo = {
                  ten: $scope.formCoAo.ten,
                  ngaySua: new Date(),
                  daXoa: $scope.formCoAo.daXoa,
                };

                $http
                  .put(
                    coAoAPI + "/update/" + $routeParams.id,
                    $scope.updateCoAo
                  )
                  .then(function () {
                    $rootScope.message = "Cập nhật thành công";
                    $location.path("/co-ao/hien-thi");
                  });
              } else {
                $scope.message = "Tên cổ áo không được trùng";
                toastBootstrap.show();
                $scope.errorProgress();
              }
            }
          });
      });
    }
  };
};
