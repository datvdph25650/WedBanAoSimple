window.addNhanVienController = function ($http, $scope, $rootScope, $location) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.randoom = "NV" + Math.floor(Math.random() * 10000) + 1;
  $scope.listNhanVien = [];
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
  $scope.formNhanVien = {
    ma: $scope.randoom,
    hoTen: "",
    email: "",
    gioiTinh: "true",
    ngaySinh: "",
    anhDaiDien: "",
    soDienThoai: "",
    matKhau: $scope.matkhau,
    diaChiCuThe: "",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    ngayTao: new Date(),
    daXoa: false,
    tenChucVu: "Nhân viên",
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
  $scope.getNhanVien = function () {
    $http.get(nhanVienAPI + "/get-all").then(function (response) {
      $scope.listNhanVien = response?.data;
    });
  };
  $scope.getNhanVien();
  $scope.addNhanVien = function (event) {
    event.preventDefault();
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.formNhanVien.anhDaiDien = image.name;
    }
    let anhDaiDien = $scope.formNhanVien.anhDaiDien;
    let hoTen = $scope.formNhanVien.hoTen;
    let ngaySinh = $scope.formNhanVien.ngaySinh;
    let email = $scope.formNhanVien.email;
    let soDienThoai = $scope.formNhanVien.soDienThoai;
    let diaChiCuThe = $scope.formNhanVien.diaChiCuThe;
    let tinhThanhPho = $scope.formNhanVien.tinhThanhPho;
    let phuongXa = $scope.formNhanVien.phuongXa;
    let quanHuyen = $scope.formNhanVien.quanHuyen;
    var sdtTonTai = $scope.listNhanVien.some(function (item) {
      return item.soDienThoai === soDienThoai;
    });
    var emailTonTai = $scope.listNhanVien.some(function (item) {
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
      $http.post(nhanVienAPI + "/add", $scope.formNhanVien).then(function () {
        $location.path("/nhan-vien/hien-thi");
        $rootScope.message = "Thêm nhân viên thành công";
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
      $scope.formNhanVien.tinhThanhPho = $("#city option:selected").text();
      $scope.formNhanVien.quanHuyen = $("#district option:selected").text();
      $scope.formNhanVien.phuongXa = $("#ward option:selected").text();
    }
  };
};
