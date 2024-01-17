window.addSanPhamChiTietController = function (
  $http,
  $scope,
  $location,
  $rootScope
) {
  $scope.totalPages = [];
  $scope.products = [];
  $scope.productDetails = [];
  $scope.sizeAndQuantitys = [];
  $scope.colors = [];
  $scope.sizes = [];
  $scope.sizeAndColors = [];
  $scope.newSizeAndColors = [];
  $scope.selectedFiles = [];
  $scope.selectedMauSac = [];
  $scope.selectedKichThuoc = [];
  $scope.groupedProducts = {};
  $scope.listKichThuocTrangThai = [];
  $scope.currentPage = 0;
  $scope.randoomSanPham = "SP" + Math.floor(Math.random() * 10000) + 1;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  let storedUserData = localStorage.getItem("loggedInAdmin");
  $scope.storedUser = JSON.parse(storedUserData);
  $scope.product = {
    maSanPham: $scope.randoomSanPham,
    tenSanPham: "",
    moTa: "",
    idPhongCach: "",
    idChatLieu: "",
    idHoaTiet: "",
    idCoAo: "",
    idTayAo: "",
    idMauSac: "",
    daXoa: false,
  };
  $scope.getChatLieu = function (chatLieu) {
    $scope.product.idChatLieu = chatLieu.id;
    $scope.selectedChatLieu = chatLieu.ten;
  };
  $scope.getPhongCach = function (phongCach) {
    $scope.product.idPhongCach = phongCach.id;
    $scope.selectedPhongCach = phongCach.ten;
  };
  $scope.getHoaTiet = function (hoaTiet) {
    $scope.product.idHoaTiet = hoaTiet.id;
    $scope.selectedHoaTiet = hoaTiet.ten;
  };
  $scope.getCoAo = function (coAo) {
    $scope.product.idCoAo = coAo.id;
    $scope.selectedCoAo = coAo.ten;
  };
  $scope.getTayAo = function (tayAo) {
    $scope.product.idTayAo = tayAo.id;
    $scope.selectedTayAo = tayAo.ten;
  };

  $scope.displaySelectedMauSac = function (selectedMauSac) {
    if (selectedMauSac && selectedMauSac.length > 0) {
      return selectedMauSac.join(", ");
    } else {
      return "Chọn màu sắc";
    }
  };
  $scope.displaySelectedKichThuoc = function (selectedKichThuoc) {
    if (selectedKichThuoc && selectedKichThuoc.length > 0) {
      return selectedKichThuoc.join(", ");
    } else {
      return "Chọn kích thước";
    }
  };

  $scope.selectFile = function (tenMauSac, index) {
    var productImageInput = document.getElementById("product-image");

    var handleImageChangeCallback = function (event) {
      $scope.$apply(function () {
        $scope.handleImageChange(event, tenMauSac, index);
      });
    };

    productImageInput.addEventListener("change", handleImageChangeCallback);

    productImageInput.addEventListener(
      "change",
      function removeEventListenerCallback() {
        productImageInput.removeEventListener(
          "change",
          handleImageChangeCallback
        );
        productImageInput.removeEventListener(
          "change",
          removeEventListenerCallback
        );
      }
    );

    productImageInput.click();
  };

  $scope.handleImageChange = function (event, tenMauSac, index) {
    console.log("handleImageChange called");
    var file = event.target.files[0];

    if (file) {
      if ($scope.sizeAndColors.length > index) {
        var products = $scope.sizeAndColors.filter((sanPham) => {
          return sanPham.tenMauSac === tenMauSac;
        });
        products.forEach((product) => {
          product.urlImage = file.name;
        });
      }
      $scope.groupedProducts = $scope.sizeAndColors.reduce((acc, product) => {
        acc[product.tenMauSac] = acc[product.tenMauSac] || [];
        acc[product.tenMauSac].push(product);
        return acc;
      }, {});
      console.log($scope.groupedProducts);
    }
  };

  $scope.addKichThuoc = function (index) {
    const kichThuoc = $scope.listKichThuocTrangThai[index];
    kichThuoc.checked = !kichThuoc.checked;

    const size = kichThuoc.ten;
    const DEFAULT_SO_LUONG = 10;
    const DEFAULT_GIA = 100000;

    const newSizeAndQuantity = {
      tenKichThuoc: size,
      soLuong: DEFAULT_SO_LUONG,
      gia: DEFAULT_GIA,
      daXoa: false,
    };

    if (kichThuoc.checked) {
      $scope.sizeAndQuantitys.push(angular.copy(newSizeAndQuantity));
      $scope.selectedKichThuoc.push(size);

      const matchingSizeAndColors = $scope.sizeAndColors.filter(
        (item) => item.tenMauSac === kichThuoc.tenMauSac
      );
      if (matchingSizeAndColors.length > 0) {
        newSizeAndQuantity.urlImage = matchingSizeAndColors[0].urlImage;
      }
    } else {
      const indexToRemove = $scope.sizeAndQuantitys.findIndex(
        (item) => item.tenKichThuoc === size
      );

      if (indexToRemove !== -1) {
        $scope.sizeAndQuantitys.splice(indexToRemove, 1);
        $scope.selectedKichThuoc.splice(indexToRemove, 1);
        $scope.sizeAndColors = $scope.sizeAndColors.filter(
          (item) => item.tenKichThuoc !== size
        );
      }
    }

    $scope.sizeAndQuantitys.forEach((size) => {
      $scope.colors.forEach((color) => {
        const newSizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
          maMau: color.maMau,
          soLuong: size.soLuong,
          gia: size.gia,
          urlImage: null,
        };

        const matchingSizeAndColors = $scope.sizeAndColors.filter(
          (item) => item.tenMauSac === newSizeAndColor.tenMauSac
        );

        if (matchingSizeAndColors.length > 0) {
          newSizeAndColor.urlImage = matchingSizeAndColors[0].urlImage;
        }

        const existingIndex = $scope.sizeAndColors.findIndex(
          (item) =>
            item.tenKichThuoc === newSizeAndColor.tenKichThuoc &&
            item.tenMauSac === newSizeAndColor.tenMauSac
        );

        if (existingIndex !== -1) {
          // Nếu tồn tại, cập nhật thông tin
          $scope.sizeAndColors[existingIndex] = angular.copy(newSizeAndColor);
        } else {
          // Nếu không tồn tại, thêm mới
          $scope.sizeAndColors.push(angular.copy(newSizeAndColor));
        }
      });
    });

    $scope.groupedProducts = $scope.sizeAndColors.reduce((acc, product) => {
      acc[product.tenMauSac] = acc[product.tenMauSac] || [];
      acc[product.tenMauSac].push(product);
      return acc;
    }, {});
  };

  $scope.addMauSac = function (index) {
    const mauSac = $scope.listMauSacTrangThai[index];
    mauSac.checked = !mauSac.checked;

    const colorObject = {
      tenMauSac: mauSac.ten,
      maMau: mauSac.ma,
    };

    if (mauSac.checked) {
      $scope.colors.push(angular.copy(colorObject));
      $scope.selectedMauSac.push(mauSac.ten);
    } else {
      const indexToRemove = $scope.sizeAndQuantitys.findIndex(
        (item) => item.tenMauSac === mauSac
      );

      if (indexToRemove !== -1) {
        $scope.sizeAndQuantitys.splice(indexToRemove, 1);
        $scope.selectedMauSac.splice(indexToRemove, 1);
        $scope.sizeAndColors = $scope.sizeAndColors.filter(
          (item) => item.tenMauSac !== mauSac
        );
      }
    }

    $scope.sizeAndQuantitys.forEach((size) => {
      $scope.colors.forEach((color) => {
        const newSizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
          maMau: color.maMau,
          soLuong: size.soLuong,
          gia: size.gia,
          urlImage: null,
        };

        const existingIndex = $scope.sizeAndColors.findIndex(
          (item) =>
            item.tenKichThuoc === newSizeAndColor.tenKichThuoc &&
            item.tenMauSac === newSizeAndColor.tenMauSac
        );

        if (existingIndex !== -1) {
          // Nếu tồn tại, cập nhật thông tin
          $scope.sizeAndColors[existingIndex] = angular.copy(newSizeAndColor);
        } else {
          // Nếu không tồn tại, thêm mới
          $scope.sizeAndColors.push(angular.copy(newSizeAndColor));
        }
      });
    });

    console.log($scope.sizeAndColors);
    $scope.groupedProducts = $scope.sizeAndColors.reduce((acc, product) => {
      acc[product.tenMauSac] = acc[product.tenMauSac] || [];
      acc[product.tenMauSac].push(product);
      return acc;
    }, {});
  };

  $scope.renderMota = function () {
    if ($scope.product.tenSanPham) {
      $http
        .get(sanPhamAPI + "/find/" + $scope.product.tenSanPham)
        .then(function (response) {
          if (response?.data?.moTa) {
            $scope.product.moTa = response.data.moTa;
          } else {
            return;
          }
        });
    } else {
      $scope.product.moTa = null;
    }
  };
  $scope.removeSize = function (tenMauSac, indexcha, indexcon) {
    console.log(indexcha);
    console.log(indexcon);

    if (
      $scope.groupedProducts[tenMauSac] &&
      $scope.groupedProducts[tenMauSac].length > indexcon
    ) {
      $scope.groupedProducts[tenMauSac].splice(indexcon, 1);
    }

    if (
      !$scope.groupedProducts[tenMauSac] ||
      $scope.groupedProducts[tenMauSac].length <= 0
    ) {
      $scope.sizeAndColors = $scope.sizeAndColors.filter(
        (item) => item.tenMauSac !== tenMauSac
      );
      $scope.colors.splice(indexcha, 1);
      $scope.selectedMauSac.splice(indexcha, 1);
      if ($scope.selectedMauSac.length === 0) {
        $scope.selectedKichThuoc = [];
        $scope.getKichThuocTrangThai();
        $scope.getMauSacTrangThai();
      }
      $scope.groupedProducts = $scope.sizeAndColors.reduce((acc, product) => {
        acc[product.tenMauSac] = acc[product.tenMauSac] || [];
        acc[product.tenMauSac].push(product);
        return acc;
      }, {});
    }
  };
  $scope.addSanPhamChiTiet = function (event) {
    event.preventDefault();
    $scope.sizeAndColors.forEach((sizeAndColor) => {
      const existingProductDetail = $scope.productDetails.find(
        (detail) =>
          detail.tenKichThuoc === sizeAndColor.tenKichThuoc &&
          detail.tenMauSac === sizeAndColor.tenMauSac
      );

      if (existingProductDetail) {
        existingProductDetail.maSanPham = $scope.product.maSanPham;
        existingProductDetail.tenSanPham = $scope.product.tenSanPham;
        existingProductDetail.moTa = $scope.product.moTa;
        existingProductDetail.idPhongCach = $scope.product.idPhongCach;
        existingProductDetail.idChatLieu = $scope.product.idChatLieu;
        existingProductDetail.idHoaTiet = $scope.product.idHoaTiet;
        existingProductDetail.idCoAo = $scope.product.idCoAo;
        existingProductDetail.idTayAo = $scope.product.idTayAo;
        existingProductDetail.tenKichThuoc = sizeAndColor.tenKichThuoc;
        existingProductDetail.tenMauSac = sizeAndColor.tenMauSac;
        existingProductDetail.ngayTao = new Date();
        existingProductDetail.nguoiTao = $scope.storedUser.hoTen;
        existingProductDetail.daXoa = $scope.product.daXoa;
        existingProductDetail.soLuong = sizeAndColor.soLuong;
        existingProductDetail.donGia = sizeAndColor.gia;
        existingProductDetail.urlImage = sizeAndColor.urlImage;
      } else {
        // Nếu chưa tồn tại, tạo mới và thêm vào mảng
        const productDetail = {
          maSanPham: $scope.product.maSanPham,
          tenSanPham: $scope.product.tenSanPham,
          moTa: $scope.product.moTa,
          idPhongCach: $scope.product.idPhongCach,
          idChatLieu: $scope.product.idChatLieu,
          idHoaTiet: $scope.product.idHoaTiet,
          idCoAo: $scope.product.idCoAo,
          idTayAo: $scope.product.idTayAo,
          tenKichThuoc: sizeAndColor.tenKichThuoc,
          tenMauSac: sizeAndColor.tenMauSac,
          soLuong: sizeAndColor.soLuong,
          donGia: sizeAndColor.gia,
          urlImage: sizeAndColor.urlImage,
          ngayTao: new Date(),
          nguoiTao: $scope.storedUser.hoTen,
          daXoa: $scope.product.daXoa,
        };
        $scope.productDetails.push(productDetail);
      }
    });
    console.log($scope.productDetails);
    console.log($scope.productDetails);
    if ($scope.product.tenSanPham == "") {
      showError("Tên sản phẩm không được trống");
    } else if ($scope.product.moTa == "") {
      showError("Mô tả không được trống");
    } else if ($scope.product.idChatLieu == "") {
      showError("Hãy chọn chất liệu");
    } else if ($scope.product.idPhongCach == "") {
      showError("Hãy chọn phong cách");
    } else if ($scope.product.idHoaTiet == "") {
      showError("Hãy chọn họa tiết");
    } else if ($scope.product.idCoAo == "") {
      showError("Hãy chọn cổ áo");
    } else if ($scope.product.idTayAo == "") {
      showError("Hãy chọn tay áo");
    } else if ($scope.sizeAndColors.length === 0) {
      showError("Hãy chọn kích thước và màu sắc");
    } else {
      let hasNullUrlImage = false;

      $scope.sizeAndColors.forEach((product) => {
        if (product.urlImage === null) {
          hasNullUrlImage = true;
          showError("Hãy chọn hình ảnh cho sản phẩm màu " + product.tenMauSac);
        }
      });

      if (!hasNullUrlImage) {
        $http
          .post(sanPhamChiTietAPI + "/add", $scope.productDetails)
          .then(function () {
            $rootScope.message = "Thêm sản phẩm thành công";
            $rootScope.showError = true;
            $location.path("/san-pham/hien-thi");
          });
      }
    }
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
  function showError(message) {
    $scope.errorProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = false;
  }
  function showSuccess(message) {
    $scope.successProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = true;
  }
  $scope.getChatLieuTrangThai = function () {
    $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
      $scope.listChatLieuTrangThai = response.data;
    });
  };
  $scope.getChatLieuTrangThai();

  $scope.getSanPhamTrangThai = function () {
    $http.get(sanPhamAPI + "/trang-thai").then(function (response) {
      $scope.listSanPhamTrangThai = response.data;
    });
  };
  $scope.getSanPhamTrangThai();

  $scope.getHoaTietTrangThai = function () {
    $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
      $scope.listHoaTietTrangThai = response.data;
    });
  };
  $scope.getHoaTietTrangThai();

  $scope.getPhongCachTrangThai = function () {
    $http.get(phongCachAPI + "/trang-thai").then(function (response) {
      $scope.listPhongCachTrangThai = response.data;
    });
  };
  $scope.getPhongCachTrangThai();

  $scope.getKichThuocTrangThai = function () {
    $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
      $scope.listKichThuocTrangThai = response.data;
    });
  };
  $scope.getKichThuocTrangThai();

  $scope.getMauSacTrangThai = function () {
    $http.get(mauSacAPI + "/trang-thai").then(function (response) {
      $scope.listMauSacTrangThai = response.data;
    });
  };
  $scope.getMauSacTrangThai();

  $scope.getCoAoTrangThai = function () {
    $http.get(coAoAPI + "/trang-thai").then(function (response) {
      $scope.listCoAoTrangThai = response.data;
    });
  };
  $scope.getCoAoTrangThai();

  $scope.getTayAoTrangThai = function () {
    $http.get(tayAoAPI + "/trang-thai").then(function (response) {
      $scope.listTayAoTrangThai = response.data;
    });
  };
  $scope.getTayAoTrangThai();

  //add thuộc tính
  $scope.formChatLieu = {
    ten: "",
  };
  $scope.addChatLieu = function () {
    let isDuplicate = false;
    $scope.randoomCL = "CL" + Math.floor(Math.random() * 10000) + 1;
    $scope.chatLieuSave = {
      ma: $scope.randoomCL,
      ten: $scope.formChatLieu.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formChatLieu.ten === "") {
      showError("Tên chất liệu không được trống");
    } else {
      $http.get(chatLieuAPI + "/get-all").then(function (response) {
        $scope.listChatLieu = response?.data;
        $scope.listChatLieu.forEach((chatLieu) => {
          if (chatLieu.ten === $scope.formChatLieu.ten) {
            isDuplicate = true;
            showError("Tên chất liệu không được trùng");
          }
        });
        if (!isDuplicate) {
          $http
            .post(chatLieuAPI + "/add", $scope.chatLieuSave)
            .then(function () {
              $scope.formChatLieu = null;
              showSuccess("Thêm chất liệu mới thành công");
              $scope.getChatLieuTrangThai();
            });
        }
      });
    }
  };

  $scope.formPhongCach = {
    ten: "",
  };
  $scope.addPhongCach = function () {
    let isDuplicate = false;
    $scope.randoomPC = "PC" + Math.floor(Math.random() * 10000) + 1;
    $scope.phongCachSave = {
      ma: $scope.randoomPC,
      ten: $scope.formPhongCach.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formPhongCach.ten === "") {
      showError("Tên phong cách không được trống");
    } else {
      $http.get(phongCachAPI + "/get-all").then(function (response) {
        $scope.listPhongCach = response?.data;
        $scope.listPhongCach.forEach((phongCach) => {
          if (phongCach.ten === $scope.formPhongCach.ten) {
            isDuplicate = true;
            showError("Tên phong cách không được trùng");
          }
        });
        if (!isDuplicate) {
          $http
            .post(phongCachAPI + "/add", $scope.phongCachSave)
            .then(function () {
              $scope.getPhongCachTrangThai();
              $scope.formPhongCach = null;
              showSuccess("Thêm phong cách mới thành công");
            });
        }
      });
    }
  };
  $scope.formHoaTiet = {
    ten: "",
  };
  $scope.addHoaTiet = function () {
    let isDuplicate = false;
    $scope.randoomHT = "HT" + Math.floor(Math.random() * 10000) + 1;
    $scope.hoaTietSave = {
      ma: $scope.randoomHT,
      ten: $scope.formHoaTiet.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formHoaTiet.ten === "") {
      showError("Tên họa tiết không được trống");
    } else {
      $http.get(hoaTietAPI + "/get-all").then(function (response) {
        $scope.listHoaTiet = response?.data;
        $scope.listHoaTiet.forEach((hoaTiet) => {
          if (hoaTiet.ten === $scope.formHoaTiet.ten) {
            isDuplicate = true;
            showError("Tên họa tiết không được trùng");
          }
        });
        if (!isDuplicate) {
          $http.post(hoaTietAPI + "/add", $scope.hoaTietSave).then(function () {
            $scope.getHoaTietTrangThai();
            $scope.formHoaTiet = null;
            showSuccess("Thêm họa tiết mới thành công");
          });
        }
      });
    }
  };

  $scope.formCoAo = {
    ten: "",
  };
  $scope.addCoAo = function () {
    let isDuplicate = false;
    $scope.random = "CA" + Math.floor(Math.random() * 10000) + 1;
    $scope.coAoSave = {
      ma: $scope.random,
      ten: $scope.formCoAo.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formCoAo.ten === "") {
      showError("Tên cổ áo không được trống");
    } else {
      $http.get(coAoAPI + "/get-all").then(function (response) {
        $scope.listCoAo = response?.data;
        $scope.listCoAo.forEach((coAo) => {
          if (coAo.ten === $scope.formCoAo.ten) {
            isDuplicate = true;
            showError("Tên cổ áo không được trùng");
          }
        });
        if (!isDuplicate) {
          $http.post(coAoAPI + "/add", $scope.coAoSave).then(function () {
            $scope.getCoAoTrangThai();
            $scope.formCoAo = null;
            showSuccess("Thêm cổ áo mới thành công");
          });
        }
      });
    }
  };

  $scope.formTayAo = {
    ten: "",
  };
  $scope.addTayAo = function () {
    let isDuplicate = false;
    $scope.randoomTA = "TA" + Math.floor(Math.random() * 10000) + 1;

    $scope.tayAoSave = {
      ma: $scope.randoomTA,
      ten: $scope.formTayAo.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formTayAo.ten === "") {
      showError("Tên tay áo không được trống");
    } else {
      $http.get(tayAoAPI + "/get-all").then(function (response) {
        $scope.listTayAo = response?.data;
        $scope.listTayAo.forEach((tayAo) => {
          if (tayAo.ten === $scope.formTayAo.ten) {
            showError("Tên tay áo không được trùng");
            isDuplicate = true;
          }
        });
        if (!isDuplicate) {
          $http.post(tayAoAPI + "/add", $scope.tayAoSave).then(function () {
            $scope.getTayAoTrangThai();
            $scope.formTayAo = null;
            showSuccess("Thêm tay áo mới thành công");
          });
        }
      });
    }
  };

  $scope.formKichThuoc = {
    ten: "",
  };
  $scope.addNewKichThuoc = function () {
    $scope.randoomKT = "KT" + Math.floor(Math.random() * 10000) + 1;
    $scope.kichThuocSave = {
      ma: $scope.randoomKT,
      ten: $scope.formKichThuoc.ten.toUpperCase(),
      ngayTao: new Date(),
      daXoa: false,
    };

    if (!$scope.formKichThuoc.ten) {
      showError("Tên kích thước không được trống");
      return;
    }

    $http.get(kichThuocAPI + "/get-all").then(function (response) {
      $scope.listKichThuoc = response?.data;
      const isDuplicate = $scope.listKichThuoc.some(
        (kichThuoc) => kichThuoc.ten === $scope.formKichThuoc.ten
      );

      if (isDuplicate) {
        showError("Tên kích thước không được trùng");
      } else {
        $http
          .post(kichThuocAPI + "/add", $scope.kichThuocSave)
          .then(function () {
            $scope.selectedKichThuoc = [];
            $scope.sizeAndQuantitys = [];
            $scope.formKichThuoc = null;
            $scope.selectedMauSac = [];
            $scope.colors = [];
            $scope.sizeAndColors = [];
            $scope.formMauSac = null;
            $scope.groupedProducts = null;
            $scope.getKichThuocTrangThai();
            $scope.getMauSacTrangThai();
            showSuccess("Thêm kích thước mới thành công");
          });
      }
    });
  };

  function callColorApi(color) {
    return $http.get(api_url + "/id?hex=" + color).then(function (response) {
      return response.data.name.value;
    });
  }
  $scope.addNewMauSac = function () {
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);

    if (colorStr === "#000000") {
      showError("Mã màu sắc không được trống");
      return;
    }
    $scope.formMauSac = {
      ma: colorStr,
      ten: "",
      ngayTao: new Date(),
      daXoa: false,
    };
    callColorApi(color).then(function (tenMauSac) {
      $scope.formMauSac.ten = tenMauSac;
      $http.get(mauSacAPI + "/get-all").then(function (response) {
        $scope.listMauSac = response?.data;
        let isDuplicate = $scope.listMauSac.some(
          (mauSac) => mauSac.ten === tenMauSac
        );
        if (isDuplicate) {
          showError("Mã màu không được trùng");
        } else {
          $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function () {
            $scope.selectedKichThuoc = [];
            $scope.sizeAndQuantitys = [];
            $scope.formKichThuoc = null;
            $scope.selectedMauSac = [];
            $scope.colors = [];
            $scope.sizeAndColors = [];
            $scope.formMauSac = null;
            $scope.groupedProducts = null;
            $scope.getKichThuocTrangThai();
            $scope.getMauSacTrangThai();
            showSuccess("Thêm màu sắc mới thành công");
          });
        }
      });
    });
  };
};
