window.hienThiCoAoController = function ($http, $scope, $rootScope, $timeout) {
  $scope.listCoAo = [];
  $scope.totalPages = [];
  $scope.currentPage = 0;
  $scope.maxVisiblePages = 3;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $scope.message = $rootScope.message;
  $scope.successProgress = function () {
    let elem = document.getElementById("success");
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
  $scope.getCoAo = function () {
    if ($scope.message !== undefined) {
      $scope.successProgress();
      toastBootstrap.show();
    }
    $http
      .get(coAoAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listCoAo = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };

  $scope.getCoAo();
  if ($scope.message !== undefined) {
    $timeout(function () {
      $scope.message = undefined;
      $rootScope.message = undefined;
    }, 1000);
  }
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getCoAo();
    }
  };

  $scope.nextPage = function () {
    console.log($scope.message);

    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getCoAo();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getCoAo();
    }
  };
  $scope.getVisiblePages = function () {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages;
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

    var visiblePages = [];

    for (var pos = 1; pos <= totalPages; pos++) {
      var active = pos - 1 === curPage ? "active" : "";

      if (totalPages >= 2 * range - 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          visiblePages.push({
            page: pos,
            active: active,
          });
        }
      } else {
        visiblePages.push({
          page: pos,
          active: active,
        });
      }
    }
    return visiblePages;
  };
};
