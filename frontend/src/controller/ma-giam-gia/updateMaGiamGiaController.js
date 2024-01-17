window.updateMaGiamGiaController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  let storedUserData = localStorage.getItem("loggedInAdmin");
  $scope.storedUser = JSON.parse(storedUserData);
  let check = true;
  $scope.detailMaGiamGia = {
    id: "",
    ma: "",
    tenKM: "",
    hinhThucGiam: "",
    soLuong: "",
    giaTriDonToiThieu: "",
    giaTriGiam: "",
    ngayBatDau: "",
    ngayKetThuc: "",
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
  function showError(message) {
    $scope.errorProgress();
    $scope.message = message;
    toastBootstrap.show();
    check = false;
  }
  $http
    .get(magiamgiaAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        response.data.ngayBatDau = new Date(
          response.data.ngayBatDau.split("+")[0].split(".")[0]
        );
        console.log(response.data);

        response.data.ngayKetThuc = new Date(
          response.data.ngayKetThuc.split("+")[0].split(".")[0]
        );
        // if (
        //   response.data.ngayBatDau.getHours() < 5 ||
        //   (response.data.ngayBatDau.getHours() > 12 &&
        //     response.data.ngayBatDau.getHours() < 17)
        // ) {
        //   response.data.ngayBatDau.setHours(
        //     response.data.ngayBatDau.getHours() + 12 - 5
        //   );
        // } else {
        //   response.data.ngayBatDau.setHours(
        //     response.data.ngayBatDau.getHours() - 5
        //   );
        // }
        // if (
        //   response.data.ngayKetThuc.getHours() < 5 ||
        //   (response.data.ngayKetThuc.getHours() > 12 &&
        //     response.data.ngayKetThuc.getHours() < 17)
        // ) {
        //   response.data.ngayKetThuc.setHours(
        //     response.data.ngayKetThuc.getHours() + 12 - 5
        //   );
        // } else {
        //   response.data.ngayKetThuc.setHours(
        //     response.data.ngayKetThuc.getHours() - 5
        //   );
        // }
        $scope.detailMaGiamGia = response.data;
      }
    });

  $scope.update = function (event) {
    let ten = $scope.detailMaGiamGia.tenKM;
    let tt = $scope.detailMaGiamGia.giaTriDonToiThieu;
    let gtg = $scope.detailMaGiamGia.giaTriGiam;
    let ht = $scope.detailMaGiamGia.hinhThucGiam;
    let sl = $scope.detailMaGiamGia.soLuong;
    let bd = $scope.detailMaGiamGia.ngayBatDau;
    let kt = $scope.detailMaGiamGia.ngayKetThuc;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const regex = /[^0-9a-zA-Z]/;
    if (bd.length === 0) {
      showError("Ngày bắt đầu không được trống");
    } else {
      let unixBD = Date.parse(bd);
      var dateBD = new Date(unixBD);
      var curr = new Date();

      if (isNaN(dateBD.getTime())) {
        showError("Ngày bắt đầu không hợp lệ");
      } else if (dateBD <= curr) {
        showError("Thời gian bắt đầu lớn hơn thời gian hiện tại");
      } else if (kt.length === 0) {
        showError("Ngày kết thúc không được trống");
      } else {
        let unixKT = Date.parse(kt);
        var dateKT = new Date(unixKT);

        if (isNaN(dateKT.getTime())) {
          showError("Ngày kết thúc không hợp lệ");
        } else if (dateKT <= dateBD) {
          showError("Ngày kết thúc lớn hơn ngày bắt đầu");
        } else {
          check = true;
        }
      }
    }

    if (ten.length == 0) {
      showError("Tên không được trống");
    } else if (ten.length > 100 || specialChars.test(ten)) {
      showError("Tên sai định dạng");
    } else if (sl.length == 0) {
      showError("Số lượng không được trống");
    } else if (parseInt(sl) <= 0) {
      showError("Số lượng không được nhỏ hơn 0");
    } else if (parseInt(sl) != parseFloat(sl)) {
      showError("Số lượng phải là số tự nhiên");
    } else if (parseInt(ht) == 0) {
      if (tt.length == 0) {
        showError("Giá trị tối thiểu không được trống");
      } else if (gtg.length == 0) {
        showError("Giá trị giảm không được trống");
      } else if (parseInt(gtg) < 0) {
        showError("Giá trị giảm không được nhỏ hơn 0");
      } else if (
        parseInt(gtg) > parseInt(tt) ||
        parseInt(gtg) != parseFloat(gtg)
      ) {
        showError("Giá trị giảm phải nhỏ hơn hoặc bằng giá trị giảm tối thiểu");
      }
    } else if (parseInt(ht) != 0) {
      if (tt.length == 0) {
        showError("Giá trị tối thiểu không được trống");
      } else if (gtg.length == 0) {
        showError("Giá trị giảm không được trống");
      } else if (parseFloat(gtg) < 0 || parseFloat(gtg) > 100) {
        showError("Giá trị giảm nằm trong khoảng từ 0 -> 100 %");
      }
    } else {
      check = true;
    }
    console.log($scope.detailMaGiamGia);
    if (check) {
      $scope.maGiamGiaUpdate = {
        tenKM: $scope.detailMaGiamGia.tenKM,
        hinhThucGiam: $scope.detailMaGiamGia.hinhThucGiam,
        soLuong: $scope.detailMaGiamGia.soLuong,
        giaTriDonToiThieu: $scope.detailMaGiamGia.giaTriDonToiThieu,
        giaTriGiam: $scope.detailMaGiamGia.giaTriGiam,
        ngayBatDau: $scope.detailMaGiamGia.ngayBatDau,
        ngayKetThuc: $scope.detailMaGiamGia.ngayKetThuc,
        ngaySua: new Date(),
        nguoiSua: $scope.storedUser.hoTen,
      };
      $http
        .put(
          magiamgiaAPI + "/update/" + $routeParams.id,
          $scope.maGiamGiaUpdate
        )
        .then(function () {
          $rootScope.message = "Cập nhật thành công";
          $location.path("/ma-giam-gia/hien-thi");
        });
    }
  };
};
