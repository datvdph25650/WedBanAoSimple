window.hienThiKhachHangController = function (
  $http,
  $scope,
  $rootScope,
  $timeout
) {
  $scope.randoom = "KH" + Math.floor(Math.random() * 10000) + 1;

  $scope.listKhachHang = [];
  $scope.totalPages = [];
  $scope.searchKeyword = "";
  $scope.selectedOption = "";
  $scope.currentPage = 0;
  $scope.maxVisiblePages = 3;
  $scope.message = $rootScope.message;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
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
  $scope.getKhachHang = function () {
    if ($scope.message !== undefined) {
      $scope.successProgress();
      toastBootstrap.show();
    }
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKhachHang = response?.data.content;
        console.log($scope.listKhachHang);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  };
  $scope.getKhachHang();
  if ($scope.message !== undefined) {
    $timeout(function () {
      $rootScope.message = undefined;
      $scope.message = undefined;
    }, 1000);
  }
  function getVisiblePages() {
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
  }

  $scope.changePage = function (index) {
    if (index >= 0 && index < $scope.totalPages.length) {
      $scope.currentPage = index;
      if ($scope.selectOption !== undefined) {
        $scope.loc();
        return;
      }
      if ($scope.searchKeyword !== undefined) {
        $scope.search();
        return;
      }
      $scope.getKhachHang();
    }
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPages.length - 1) {
      $scope.currentPage++;
      if ($scope.selectOption !== undefined) {
        $scope.loc();
        return;
      }
      if ($scope.searchKeyword !== undefined) {
        $scope.search();
        return;
      }
      $scope.getKhachHang();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      if ($scope.selectOption !== undefined) {
        $scope.loc();
        return;
      }
      if ($scope.searchKeyword !== undefined) {
        $scope.search();
        return;
      }
      $scope.getKhachHang();
    }
  };
  $scope.search = function () {
    $http
      .get(
        khachHangAPI +
          "/search?pageNo=" +
          $scope.currentPage +
          "&keyWord=" +
          $scope.searchKeyword
      )
      .then(function (response) {
        $scope.listKhachHang = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  };
  $scope.loc = function () {
    $http
      .get(
        khachHangAPI +
          "/loc?pageNo=" +
          $scope.currentPage +
          "&trangThai=" +
          $scope.selectedOption
      )
      .then(function (response) {
        $scope.listKhachHang = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  };

  $scope.uploadExcel = function (files) {
    var reader = new FileReader();
    reader.onload = function () {
      var workbook = new ExcelJS.Workbook();
      workbook.xlsx.load(reader.result).then(function () {
        var worksheet = workbook.getWorksheet("Sheet 1");
        var data = [];

        worksheet.eachRow(function (row, index) {
          var gioiTinhText = row.getCell(3).text;
          var gioiTinh = gioiTinhText === "Nam" ? true : false;
          var soDienThoaiCell = row.getCell(4);

          if (index > 1) {
            data.push({
              ma: $scope.randoom,
              hoTen: row.getCell(1).text,
              ngaysinh:
                row.getCell(2).value instanceof Date
                  ? row.getCell(2).value
                  : null,
              gioiTinh: gioiTinh,
              soDienThoai: "0" + soDienThoaiCell,
              email: row.getCell(5).text,
              ngayTao: new Date(),
              daXoa: false,
            });
          }
        });

        data.forEach((khachHang) => {
          $http
            .post(khachHangAPI + "/import-excel", khachHang)
            .then(function () {
              $scope.successProgress();
              $scope.message = "Thêm khách hàng thành công";
              toastBootstrap.show();
              $scope.getKhachHang();
            })

            .catch(function (error) {
              console.error("Lỗi khi thêm khách hàng:", error);
            });
        });
      });
    };

    reader.readAsArrayBuffer(files[0]);
  };
  $scope.exportToExcel = function () {
    var workbook = new ExcelJS.Workbook();
    var sheet = workbook.addWorksheet("Sheet 1");

    var headerRow = sheet.addRow([
      "Tên khách hàng",
      "Ngày sinh",
      "Giới tính",
      "Số điện thoại",
      "Email",
    ]);
    headerRow.eachCell(function (cell, colNumber) {
      sheet.getColumn(colNumber).width = Math.max(
        sheet.getColumn(colNumber).width || 0,
        cell.value.toString().length + 2
      );
    });

    workbook.xlsx.writeBuffer().then(function (buffer) {
      var blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "danh-sach-khach-hang.xlsx";

      a.click();

      window.URL.revokeObjectURL(url);
    });
  };
};
