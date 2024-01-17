window.updateMauSacController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $scope.formMauSac = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http.get(mauSacAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formMauSac = response.data;
    }
  });

  $scope.update = function () {
    let isDuplicate = false;
    $scope.newListMauSac = [];
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);
    $http.get(api_url + "/id?hex=" + color).then(function (response) {
      $scope.formMauSac.ten = response.data.name.value;
      $http.get(mauSacAPI + "/get-all").then(function (response) {
        $scope.listMauSac = response?.data;
        $http
          .get(mauSacAPI + "/detail/" + $routeParams.id)
          .then(function (response) {
            if (response.status == 200) {
              $scope.detailMauSac = response?.data;
              $scope.newListMauSac = $scope.listMauSac.filter(
                (mauSac) => mauSac.ten !== $scope.detailMauSac.ten
              );
              $scope.newListMauSac.forEach((mauSac) => {
                if (mauSac.ten === $scope.formMauSac.ten) {
                  isDuplicate = true;
                }
              });
              if (!isDuplicate) {
                $scope.updateMauSac = {
                  ma: $scope.formMauSac.ma,
                  ten: $scope.formMauSac.ten,
                  ngaySua: new Date(),
                  daXoa: $scope.formMauSac.daXoa,
                };
                $http
                  .put(
                    mauSacAPI + "/update/" + $routeParams.id,
                    $scope.updateMauSac
                  )
                  .then(function () {
                    $rootScope.message = "Cập nhật thành công";
                    $location.path("/mau-sac/hien-thi");
                  });
              } else {
                $scope.message = "Màu sắc không được trùng";
                toastBootstrap.show();
                $scope.errorProgress();
              }
            }
          });
      });
    });
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
