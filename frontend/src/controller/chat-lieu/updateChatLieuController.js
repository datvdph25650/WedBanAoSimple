window.updateChatLieuController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
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
    .get(chatLieuAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formChatLieu = response?.data;
      }
    });

  $scope.update = function () {
    let isDuplicate = false;
    $scope.newListChatLieu = [];
    if ($scope.formChatLieu.ten == "") {
      toastBootstrap.show();
      $scope.message = "Tên chất liệu không được trống";
      $scope.errorProgress();
    } else {
      $http.get(chatLieuAPI + "/get-all").then(function (response) {
        $scope.listChatLieu = response?.data;

        $http
          .get(chatLieuAPI + "/detail/" + $routeParams.id)
          .then(function (responseDetail) {
            if (responseDetail.status === 200) {
              $scope.detailChatLieu = responseDetail?.data;

              $scope.newListChatLieu = $scope.listChatLieu.filter(
                (chatLieu) => chatLieu.ten !== $scope.detailChatLieu.ten
              );

              $scope.newListChatLieu.forEach((chatLieu) => {
                if (chatLieu.ten === $scope.formChatLieu.ten) {
                  isDuplicate = true;
                }
              });
              if (!isDuplicate) {
                $scope.updateChatLieu = {
                  ten: $scope.formChatLieu.ten,
                  ngaySua: new Date(),
                  daXoa: $scope.formChatLieu.daXoa,
                };
                $http
                  .put(
                    chatLieuAPI + "/update/" + $routeParams.id,
                    $scope.updateChatLieu
                  )
                  .then(function () {
                    $rootScope.message = "Cập nhật thành công";
                    $location.path("/chat-lieu/hien-thi");
                  });
              } else {
                $scope.message = "Tên chất liệu không được trùng";
                toastBootstrap.show();
                $scope.errorProgress();
              }
            }
          });
      });
    }
  };
};
