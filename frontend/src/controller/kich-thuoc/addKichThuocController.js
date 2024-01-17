window.addKichThuocController = function (
  $http,
  $scope,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.randoom = "KT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formKichThuoc = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.add = function (e) {
    e.preventDefault();
    let isDuplicate = false;
    if ($scope.formKichThuoc.ten === "") {
      $scope.message = "Tên kích thước không được trống";
      $scope.errorProgress();
      toastBootstrap.show();
    } else {
      $http.get(kichThuocAPI + "/get-all").then(function (reponse) {
        $scope.listKichThuoc = reponse?.data;
        $scope.listKichThuoc.forEach((kichThuoc) => {
          if (kichThuoc.ten === $scope.formKichThuoc.ten) {
            isDuplicate = true;
            $scope.message = "Tên kích thước không được trùng";
            $scope.errorProgress();
            toastBootstrap.show();
          }
        });
        if (!isDuplicate) {
          $http
            .post(kichThuocAPI + "/add", $scope.formKichThuoc)
            .then(function () {
              $rootScope.message = "Thêm thành công";
              $location.path("/kich-thuoc/hien-thi");
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
