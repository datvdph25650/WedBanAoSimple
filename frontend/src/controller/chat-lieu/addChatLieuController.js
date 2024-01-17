window.addChatLieuController = function ($http, $scope, $location, $rootScope) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.randoom = "CL" + Math.floor(Math.random() * 10000) + 1;
  var storedUserName = localStorage.getItem("loggedInUser");
  $scope.storedUser = JSON.parse(storedUserData);

  $scope.formChatLieu = {
    ma: $scope.randoom,
    ten: "",
    ngayTao: new Date(),
    nguoiTao: $scope.storedUser.hoTen,
    daXoa: false,
  };

  $scope.add = function (e) {
    e.preventDefault();
    let isDuplicate = false;
    if ($scope.formChatLieu.ten == "") {
      toastBootstrap.show();
      $scope.message = "Tên chất liệu không được trống";
      $scope.errorProgress();
    } else {
      $http.get(chatLieuAPI + "/get-all").then(function (response) {
        $scope.listChatLieu = response?.data;
        $scope.listChatLieu.forEach((chatLieu) => {
          if (chatLieu.ten === $scope.formChatLieu.ten) {
            isDuplicate = true;
            toastBootstrap.show();
            $scope.message = "Tên chất liệu không được trùng";
            $scope.errorProgress();
          }
        });
        if (!isDuplicate) {
          $http
            .post(chatLieuAPI + "/add", $scope.formChatLieu)
            .then(function () {
              $rootScope.message = "Thêm thành công";
              $location.path("/chat-lieu/hien-thi");
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
