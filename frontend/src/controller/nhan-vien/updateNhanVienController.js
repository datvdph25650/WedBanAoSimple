window.updateNhanVienController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  $scope.showDropDownThanhPho = false;
  $scope.showDropDownPhuongXa = false;
  $scope.showDropDownQuanHuyen = false;
  $scope.districts = [];
  $scope.wards = [];
  $scope.cityOptions = [];
  $scope.formDiaChi = {
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
  };
  $scope.detailNhanVien = {};
  $http
    .get(nhanVienAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailNhanVien = response?.data;
      $scope.detailNhanVien.ngaySinh = new Date(response.data.ngaySinh);
    });

  $scope.update = function (event) {
    event.preventDefault();
    let check = true;
    const hinhanh = document.getElementById("product-image");
    console.log(hinhanh);
    for (const image of hinhanh.files) {
      $scope.detailNhanVien.anhDaiDien = image.name;
    }

    $scope.updateNhanVien = {
      hoTen: $scope.detailNhanVien.hoTen,
      email: $scope.detailNhanVien.email,
      gioiTinh: $scope.detailNhanVien.gioiTinh,
      soDienThoai: $scope.detailNhanVien.soDienThoai,
      ngaySinh: $scope.detailNhanVien.ngaySinh,
      daXoa: $scope.detailNhanVien.daXoa,
      anhDaiDien: $scope.detailNhanVien.anhDaiDien,
      ngaySua: new Date(),
      tinhThanhPho: $scope.detailNhanVien.tinhThanhPho,
      quanHuyen: $scope.detailNhanVien.quanHuyen,
      diaChiCuThe: $scope.detailNhanVien.diaChiCuThe,
      phuongXa: $scope.detailNhanVien.phuongXa,
    };

    if (check) {
      $http
        .put(nhanVienAPI + "/update/" + $routeParams.id, $scope.updateNhanVien)
        .then(function () {
          $rootScope.message = "Cập nhật thành công";
          $location.path("/nhan-vien/hien-thi");
        });
    }
  };
  $scope.getCity = function () {
    const api = api_giaoHang + "?depth=1";
    axios.get(api).then((response) => {
      $scope.cityOptions = response?.data;
    });
  };
  $scope.getCity();
  $scope.toggleAPI = function (event, type) {
    if (type === "ThanhPho") {
      $scope.showDropDownThanhPho = !$scope.showDropDownThanhPho;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownQuanHuyen = false;
    } else if (type === "QuanHuyen") {
      $scope.showDropDownQuanHuyen = !$scope.showDropDownQuanHuyen;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownThanhPho = false;
    } else if (type === "PhuongXa") {
      $scope.showDropDownPhuongXa = !$scope.showDropDownPhuongXa;
      $scope.showDropDownQuanHuyen = false;
      $scope.showDropDownThanhPho = false;
    }
    event.stopPropagation();
  };
  $scope.selectOptionThanhPho = function (option) {
    $scope.detailNhanVien.tinhThanhPho = option;

    let selectedCityCode = "";
    $scope.cityOptions.find((city) => {
      if (city.name === option) {
        selectedCityCode = city.code;
      }
    });
    if (selectedCityCode) {
      const api = api_giaoHang + "p/" + selectedCityCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.districtOptions = response?.data.districts;
        console.log($scope.districtOptions);
      });
    }
    $scope.formDiaChi.quanHuyen = null;
    $scope.formDiaChi.phuongXa = null;

    $scope.showDropDownThanhPho = false;
    $scope.showDropDownQuanHuyen = false;
  };
  $scope.selectOptionQuanHuyen = function (option) {
    $scope.detailNhanVien.quanHuyen = option;

    let selectedDistrictCode = "";
    $scope.districtOptions.find((district) => {
      if (district.name === option) {
        selectedDistrictCode = district.code;
      }
    });
    console.log(selectedDistrictCode);
    if (selectedDistrictCode) {
      const api = api_giaoHang + "d/" + selectedDistrictCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.wardOptions = response?.data.wards;
      });
    }
    $scope.formDiaChi.phuongXa = null;
    $scope.showDropDownQuanHuyen = false;
    $scope.showDropDownPhuongXa = false;
  };
  $scope.selectOptionPhuongXa = async function (option) {
    $scope.detailNhanVien.phuongXa = option;

    $scope.showDropDownPhuongXa = false;
  };
  document.addEventListener("click", function (event) {
    var dropdownContainer = document.querySelector(".dropdown-container");

    if (!dropdownContainer.contains(event.target)) {
      $scope.$apply(function () {
        $scope.showDropDownThanhPho = false;
        $scope.showDropDownQuanHuyen = false;
        $scope.showDropDownPhuongXa = false;
      });
    }
  });
};
