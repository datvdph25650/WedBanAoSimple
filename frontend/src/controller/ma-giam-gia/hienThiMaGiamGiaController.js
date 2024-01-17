window.hienThiMaGiamGiaController = function (
  $http,
  $scope,
  $rootScope,
  $timeout
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.listMaGiamGia = [];
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.currentPage = 0;
  $scope.maxVisiblePages = 3;
  $scope.intervalId = "";
  $scope.message = $rootScope.message;
  $scope.selectOption = null;
  $scope.selectOptionHinhThuc = null;

  function scheduledTask() {
    $http
      .get(magiamgiaAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listMaGiamGia = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  }
  $scope.intervalId = setInterval(scheduledTask, 1000);
  $scope.getMa = function () {
    if ($scope.message !== undefined) {
      $scope.successProgress();
      toastBootstrap.show();
    }
    $http
      .get(magiamgiaAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listMaGiamGia = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
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
  if ($scope.message !== undefined) {
    $timeout(function () {
      $scope.message = undefined;
      $rootScope.message = undefined;
    }, 1000);
  }

  $scope.getMaTrangThai = function () {
    setTimeout(() => {
      clearInterval($scope.intervalId);
    });
    $scope.selectOption = null;

    if ($scope.selectOptionHinhThuc == null) {
      $http
        .get(magiamgiaAPI + "/hien-thi?pageNo=" + $scope.currentPage)
        .then(function (response) {
          $scope.listMaGiamGia = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    } else {
      $http
        .get(
          magiamgiaAPI +
            "/loc?pageNo=" +
            $scope.currentPage +
            "&trangThai=" +
            $scope.selectOption +
            "&hinhThuc=" +
            $scope.selectOptionHinhThuc
        )
        .then(function (response) {
          $scope.listMaGiamGia = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    }
  };
  $scope.getMaHinhThuc = function () {
    setTimeout(() => {
      clearInterval($scope.intervalId);
    });
    $scope.selectOptionHinhThuc = null;
    if ($scope.selectOption == null) {
      $http
        .get(magiamgiaAPI + "/hien-thi?pageNo=" + $scope.currentPage)
        .then(function (response) {
          $scope.listMaGiamGia = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    } else {
      $http
        .get(
          magiamgiaAPI +
            "/loc?pageNo=" +
            $scope.currentPage +
            "&trangThai=" +
            $scope.selectOption +
            "&hinhThuc=" +
            $scope.selectOptionHinhThuc
        )
        .then(function (response) {
          $scope.listMaGiamGia = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    }
  };
  $scope.loc = function () {
    setTimeout(() => {
      clearInterval($scope.intervalId);
    });
    $http
      .get(
        magiamgiaAPI +
          "/loc?pageNo=" +
          $scope.currentPage +
          "&trangThai=" +
          $scope.selectOption +
          "&hinhThuc=" +
          $scope.selectOptionHinhThuc
      )
      .then(function (response) {
        $scope.listMaGiamGia = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.search = function () {
    setTimeout(() => {
      clearInterval($scope.intervalId);
    });
    $http
      .get(
        magiamgiaAPI +
          "/search?pageNo=" +
          $scope.currentPage +
          "&keyWord=" +
          $scope.searchKeyword
      )
      .then(function (response) {
        $scope.listMaGiamGia = response.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.changePage = function (index) {
    if (index >= 0 && index < $scope.totalPages.length) {
      $scope.currentPage = index;
      if ($scope.selectOption !== undefined) {
        $scope.loc();
      } else if ($scope.searchKeyword !== undefined) {
        $scope.search();
      }
      $scope.getMa();
    }
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPages.length - 1) {
      $scope.currentPage++;
      if ($scope.selectOption != undefined) {
        $scope.loc();
      } else if ($scope.searchKeyword != undefined) {
        $scope.search();
      }
      $scope.getMa();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      if ($scope.selectOption != undefined) {
        $scope.loc();
      } else if ($scope.searchKeyword != undefined) {
        $scope.search();
      }
      $scope.getMa();
    }
  };
};
