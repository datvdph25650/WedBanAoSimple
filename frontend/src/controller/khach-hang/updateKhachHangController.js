window.updateKhachHangController = function ($http, $scope, $routeParams) {
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.detailAdress = [];
  $scope.NewAdress = false;
  $scope.showDropDownThanhPho = false;
  $scope.showDropDownQuanHuyen = false;
  $scope.showDropDownPhuongXa = false;
  $scope.form_dc = {
    diaChiMacDinh: "",
    diaChiCuThe: "",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    tenKhachHang: "",
    soDienThoai: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $http
    .get(khachHangAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailKhachHang = response?.data;
      $scope.detailKhachHang.ngaySinh = new Date(response.data.ngaySinh);
      console.log($scope.detailKhachHang);
    });
  $scope.detailAdress = function () {
    $http
      .get(diaChiAPI + "/detail/" + $routeParams.id)
      .then(function (response) {
        $scope.detailAdress = response?.data;
      });
  };
  $scope.detailAdress();

  $scope.updateKhachHang = function (event) {
    event.preventDefault();
    let check = true;
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.detailKhachHang.anhDaiDien = image.name;
      console.log(image.name);
    }
    $scope.khachHangUpdate = {
      hoTen: $scope.detailKhachHang.hoTen,
      email: $scope.detailKhachHang.email,
      gioiTinh: $scope.detailKhachHang.gioiTinh,
      ngaySinh: $scope.detailKhachHang.ngaySinh,
      anhDaiDien: $scope.detailKhachHang.anhDaiDien,
      soDienThoai: $scope.detailKhachHang.soDienThoai,
      ngaySua: new Date(),
      daXoa: $scope.detailKhachHang.daXoa,
    };
    if (check) {
      $http
        .put(
          khachHangAPI + "/update/" + $routeParams.id,
          $scope.khachHangUpdate
        )
        .then(function () {
          alert("Cập nhật thành công");
        });
    }
  };

  $scope.addDiaChi = function () {
    if (
      $scope.form_dc.tinhThanhPho != "" &&
      $scope.form_dc.quanHuyen != "" &&
      $scope.form_dc.tenKhachHang != "" &&
      $scope.form_dc.soDienThoai != "" &&
      $scope.form_dc.phuongXa != "" &&
      $scope.form_dc.diaChiCuThe != ""
    ) {
      $http
        .post(diaChiAPI + "/add/" + $routeParams.id, $scope.form_dc)
        .then(function () {
          alert("them thanh cong");
          $http
            .get(diaChiAPI + "/detail/" + $routeParams.id)
            .then(function (response) {
              $scope.detailAdress = response?.data;
            });
        });
      $scope.detailAdress.find((diaChi) => {
        if ($scope.form_dc.diaChiMacDinh == true) {
          $http
            .put(diaChiAPI + "/update-ma-dinh/" + diaChi.id, diaChi)
            .then(function () {});
        }
      });
      $scope.form_dc = null;
    } else {
      alert("them that bai");
    }
  };
  $scope.updateDiaChi = function (index, event, idDiaChi) {
    event.preventDefault();
    $scope.updateDC = {
      diaChiMacDinh: $scope.detailAdress[index].diaChiMacDinh,
      diaChiCuThe: $scope.detailAdress[index].diaChiCuThe,
      tinhThanhPho: $scope.detailAdress[index].tinhThanhPho,
      tenKhachHang: $scope.detailAdress[index].tenKhachHang,
      soDienThoai: $scope.detailAdress[index].soDienThoai,
      quanHuyen: $scope.detailAdress[index].quanHuyen,
      phuongXa: $scope.detailAdress[index].phuongXa,
      ngaySua: new Date(),
    };
    $http
      .put(diaChiAPI + "/update/" + idDiaChi, $scope.updateDC)
      .then(function () {
        alert("cap nhat thanh cong");
      });
    $scope.detailAdress.find((diaChi) => {
      if ($scope.updateDC.diaChiMacDinh == true) {
        $http
          .put(diaChiAPI + "/update-ma-dinh/" + diaChi.id, diaChi)
          .then(function () {});
      }
    });
  };
  $scope.getCity = function () {
    const api = api_giaoHang + "?depth=1";
    axios.get(api).then((response) => {
      $scope.cityOptions = response.data;
    });
  };
  $scope.getCity();

  $scope.toggleDropdownNewAdress = function (event, index) {
    $scope.detailAdress.forEach(function (item, i) {
      if (i !== index) {
        item.isDropdownOpen = false;
      }
    });
    $scope.newAdress = !$scope.newAdress;
    event.stopPropagation();
  };
  $scope.toggleDropdown = function (event, index) {
    let diaChi = $scope.detailAdress[index];
    let selectedCityCode = "";
    let selectedDistrictCode = "";
    $scope.cityOptions.find((city) => {
      if (city.name === diaChi.tinhThanhPho) {
        selectedCityCode = city.code;
      }
    });
    if (selectedCityCode) {
      const api = api_giaoHang + "p/" + selectedCityCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.districtOptions = response?.data.districts;
        $scope.districtOptions.find((district) => {
          if (district.name === diaChi.quanHuyen) {
            selectedDistrictCode = district.code;
            if (selectedDistrictCode) {
              const api =
                api_giaoHang + "d/" + selectedDistrictCode + "?depth=2";
              axios.get(api).then(function (response) {
                $scope.wardOptions = response?.data.wards;
              });
            }
          }
        });
      });
    }

    $scope.detailAdress.forEach(function (item, i) {
      if (i !== index) {
        item.isDropdownOpen = false;
      }
    });

    $scope.detailAdress[index].isDropdownOpen =
      !$scope.detailAdress[index].isDropdownOpen;
    $scope.newAdress = false;
    event.stopPropagation();
  };

  $scope.toggleAPI = function (event, type) {
    // Mở hoặc đóng dropdown tương ứng
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
  $scope.selectOptionThanhPho = function (index, option) {
    let diaChi = $scope.detailAdress[index];
    diaChi.tinhThanhPho = option;
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
      });
    }
    diaChi.quanHuyen = null;
    diaChi.phuongXa = null;

    $scope.showDropDownThanhPho = false;
    $scope.showDropDownQuanHuyen = false;
  };
  $scope.selectOptionQuanHuyen = function (index, option) {
    let diaChi = $scope.detailAdress[index];
    diaChi.quanHuyen = option;
    let selectedDistrictCode = "";
    $scope.districtOptions.find((district) => {
      if (district.name === option) {
        selectedDistrictCode = district.code;
      }
    });
    if (selectedDistrictCode) {
      const api = api_giaoHang + "d/" + selectedDistrictCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.wardOptions = response?.data.wards;
      });
    }
    diaChi.phuongXa = null;
    $scope.showDropDownQuanHuyen = false;
    $scope.showDropDownPhuongXa = false;
  };
  $scope.selectOptionPhuongXa = function (index, option) {
    let diaChi = $scope.detailAdress[index];
    diaChi.phuongXa = option;
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

  const host = "https://provinces.open-api.vn/api/";
  var callAPI = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data, "city");
    });
  };
  callAPI("https://provinces.open-api.vn/api/?depth=1");
  var callApiDistrict = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data.districts, "district");
    });
  };
  var callApiWard = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data.wards, "ward");
    });
  };

  var renderData = (array, select) => {
    let row = ' <option disable value="">Mời chọn</option>';
    array.forEach((element) => {
      row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  $("#city").change(() => {
    callApiDistrict(
      host + "p/" + $("#city").find(":selected").data("id") + "?depth=2"
    );
    printResult();
  });
  $("#district").change(() => {
    callApiWard(
      host + "d/" + $("#district").find(":selected").data("id") + "?depth=2"
    );
    printResult();
  });
  $("#ward").change(() => {
    printResult();
  });

  var printResult = () => {
    if (
      $("#district").find(":selected").data("id") != "" &&
      $("#city").find(":selected").data("id") != "" &&
      $("#ward").find(":selected").data("id") != ""
    ) {
      $scope.form_dc.tinhThanhPho = $("#city option:selected").text();
      $scope.form_dc.quanHuyen = $("#district option:selected").text();
      $scope.form_dc.phuongXa = $("#ward option:selected").text();
    }
  };
};
