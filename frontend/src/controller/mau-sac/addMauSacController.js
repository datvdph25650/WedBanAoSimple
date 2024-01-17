window.addMauSacController = function ($http, $scope, $location, $rootScope) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.formMauSac = {
    ma: "",
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.add = function (e) {
    e.preventDefault();
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);
    if ($scope.formMauSac.ma === "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn 1 màu";
      $scope.errorProgress();
      return;
    }
    callColorApi(color).then(function (tenMauSac) {
      $scope.formMauSac.ten = tenMauSac;
      $http.get(mauSacAPI + "/get-all").then(function (response) {
        $scope.listMauSac = response?.data;
        let isDuplicate = $scope.listMauSac.some(
          (mauSac) => mauSac.ten === tenMauSac
        );
        if (isDuplicate) {
          toastBootstrap.show();
          $scope.message = "Tên màu sắc không được trùng";
          $scope.errorProgress();
        } else {
          $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function () {
            $rootScope.message = "Thêm thành công";
            $location.path("/mau-sac/hien-thi");
          });
        }
      });
    });
  };

  function callColorApi(color) {
    return $http.get(api_url + "/id?hex=" + color).then(function (response) {
      return response.data.name.value;
    });
  }

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
