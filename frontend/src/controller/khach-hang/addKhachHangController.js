window.addKhachHangController = function (
  $http,
  $scope,
  $rootScope,
  $location
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.randoom = "KH" + Math.floor(Math.random() * 10000) + 1;
  $scope.listKhachHang = [];
  let check = true;

  $scope.matkhau = generateRandomPassword();
  function generateRandomPassword() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    let password = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }
  $scope.form_kh = {
    ma: $scope.randoom,
    hoTen: "",
    email: "",
    gioiTinh: "true",
    ngaySinh: "",
    anhDaiDien: "",
    soDienThoai: "",
    matKhau: $scope.matkhau,
    diaChiCuThe: "",
    diaChiMacDinh: "true",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  function showError(message) {
    $scope.errorProgress();
    $scope.message = message;
    toastBootstrap.show();
    check = false;
  }
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
  $scope.getKhachHang = function () {
    $http.get(khachHangAPI + "/get-all").then(function (response) {
      $scope.listKhachHang = response?.data;
      console.log($scope.listKhachHang);
    });
  };
  $scope.getKhachHang();
  $scope.addKhachHang = function (event) {
    event.preventDefault();
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.form_kh.anhDaiDien = image.name;
    }
    let anhDaiDien = $scope.form_kh.anhDaiDien;
    let hoTen = $scope.form_kh.hoTen;
    let ngaySinh = $scope.form_kh.ngaySinh;
    let email = $scope.form_kh.email;
    let soDienThoai = $scope.form_kh.soDienThoai;
    let diaChiCuThe = $scope.form_kh.diaChiCuThe;
    let tinhThanhPho = $scope.form_kh.tinhThanhPho;
    let phuongXa = $scope.form_kh.phuongXa;
    let quanHuyen = $scope.form_kh.quanHuyen;
    var sdtTonTai = $scope.listKhachHang.some(function (item) {
      return item.soDienThoai === soDienThoai;
    });
    var emailTonTai = $scope.listKhachHang.some(function (item) {
      return item.email === email;
    });
    const onlyLetters =
      /^[a-zA-Z\s?áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵY\s]*$/;

    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const vietnamPhoneRegex =
      /^(?:\+84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/;

    if (
      hoTen.length === 0
      // !onlyLetters.test(hoten)
    ) {
      showError("Tên không được trống");
    } else if (hoTen.length > 50) {
      showError("Tên vượt quá số kí tự quy định");
    } else if (specialChars.test(hoTen)) {
      showError("Tên không được chứa kí tự đặc biệt");
    } else if (ngaySinh.length === 0) {
      showError("Ngày sinh không được trống");
    } else if (soDienThoai.length == 0) {
      showError("Số điện thoại không được trống ");
    } else if (sdtTonTai) {
      showError("Số điện thoại đã tồn tại");
    } else if (!vietnamPhoneRegex.test(soDienThoai)) {
      showError("Số điện thoại sai định dạng ");
    } else if (specialChars.test(soDienThoai)) {
      showError("Số điện thoại không được chưa các kí tự đặc biệt ");
    } else if (email.length === 0) {
      showError("Email không được trống");
    } else if (!emailRegex.test(email)) {
      showError("Email sai định dạng");
    } else if (emailTonTai) {
      showError("Email đã tồn tại");
    } else if (
      diaChiCuThe.length == 0
      // ||
      // diaChiCuThe.length > 51 ||
      // specialChars.test(diaChiCuThe)
    ) {
      showError("Địa chỉ cụ thể không được trống");
    } else if (tinhThanhPho === "") {
      showError("Tỉnh thành phố không được trống");
    } else if (quanHuyen === "") {
      showError("Quận huyện không được trống");
    } else if (phuongXa === "") {
      showError("Phường xã không được trống");
    } else {
      check = true;
    }
    if (check) {
      $http.post(khachHangAPI + "/add", $scope.form_kh).then(function () {
        $location.path("/khach-hang/hien-thi");
        $rootScope.message = "Thêm khách hàng thành công";
      });
    }
  };

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
    let row = ' <option disable value="">Chọn</option>';
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
      $scope.form_kh.tinhThanhPho = $("#city option:selected").text();
      $scope.form_kh.quanHuyen = $("#district option:selected").text();
      $scope.form_kh.phuongXa = $("#ward option:selected").text();
    }
  };
};
