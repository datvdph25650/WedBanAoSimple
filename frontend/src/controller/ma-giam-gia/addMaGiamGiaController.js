window.addMaGiamGiaController = function (
  $http,
  $scope,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  let storedUserData = localStorage.getItem("loggedInAdmin");
  $scope.storedUser = JSON.parse(storedUserData);
  $scope.randoom = "MG" + Math.floor(Math.random() * 10000) + 1;

  $scope.maGiamGiaSave = {
    id: "",
    ma: $scope.randoom,
    tenKM: "",
    hinhThucGiam: "0",
    trangThai: "1",
    soLuong: "",
    giaTriDonToiThieu: "",
    giaTriGiam: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    nguoiTao: $scope.storedUser.hoTen,
    ngayTao: new Date(),
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
  $scope.add = function (event) {
    event.preventDefault();

    let ten = $scope.maGiamGiaSave.tenKM;
    let tt = $scope.maGiamGiaSave.giaTriDonToiThieu;
    let gtg = $scope.maGiamGiaSave.giaTriGiam;
    let ht = $scope.maGiamGiaSave.hinhThucGiam;
    let sl = $scope.maGiamGiaSave.soLuong;
    let bd = $scope.maGiamGiaSave.ngayBatDau;
    let kt = $scope.maGiamGiaSave.ngayKetThuc;
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
    if (check) {
      $http.post(magiamgiaAPI + "/add", $scope.maGiamGiaSave).then(function () {
        $rootScope.message = "Thêm thành công";
        $location.path("/ma-giam-gia/hien-thi");
      });
    }
  };
};
