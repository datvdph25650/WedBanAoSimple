window.hienThiThongKeController = function ($http, $scope, $routeParams) {
  $scope.listThongKe = [];
  $scope.listThongKe1 = [];
  $scope.listThongKe2 = [];
  $scope.listThongKe3 = [];
  $scope.myChart = null;

  // Chuyển đổi định dạng tháng thành label mong muốn (tháng/năm)

  $scope.getdatamacdinh = function () {
    $http.get(thongKeAPI + "/hien-thi").then(function (response) {
      $scope.listThongKe = response.data;
      console.log($scope.listThongKe);
    });
    if ($scope.myChart) {
      $scope.myChart.destroy();
    }
    $http
      .get(thongKeAPI + "/hien-thi-3", {
        params: {
          startDate: $scope.startDate,
          endDate: $scope.endDate,
        },
      })
      .then(function (response) {
        $scope.listThongKe3 = response.data;
        console.log($scope.listThongKe3);

        // Cập nhật dữ liệu cho biểu đồ
        $scope.chartLabels = $scope.listThongKe3.map(function (item) {
          return moment(item.ngay).format("MM/DD/YYYY");
        });

        var ctx = document.getElementById("myChart").getContext("2d");
        $scope.myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: $scope.chartLabels,
            datasets: [
              {
                label: "Doanh thu",
                data: $scope.listThongKe3.map(function (item) {
                  return item.tongDoanhThu;
                }),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    $http
      .get(thongKeAPI + "/hien-thi-2")
      .then(function (response) {
        $scope.listThongKe2 = response.data;
        console.log($scope.listThongKe2);

        var trangThaiMapping = {
          0: "Chờ xác nhận",
          1: "Chờ giao hàng",
          2: "Đang giao hàng",
          3: "Đã nhận hàng",
          4: "Đã hủy",
        };

        var data = $scope.listThongKe2.map(function (item) {
          return item.tongSoHoaDon;
        });

        var labels = $scope.listThongKe2.map(function (item) {
          return trangThaiMapping[item.trangThai];
        });

        var colors = ["orange", "blue", "purple", "green", "red"];

        var ctx = document.getElementById("myPieChart").getContext("2d");

        var myPieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: colors,
              },
            ],
          },
          options: {
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((data) => {
                    sum += data;
                  });
                  let percentage = ((value * 100) / sum).toFixed(2) + "%";
                  return percentage;
                },
                color: "#fff",
              },
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function (
                    previousValue,
                    currentValue,
                    currentIndex,
                    array
                  ) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var percentage =
                    ((currentValue / total) * 100).toFixed(2) + "%";
                  return percentage;
                },
              },
            },
            legend: {
              display: false,
            },
          },
        });
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  };
  $scope.getdatamacdinh();
  $scope.getData = function () {
    $http.get(thongKeAPI + "/hien-thi").then(function (response) {
      $scope.listThongKe = response.data;
      console.log($scope.listThongKe);
    });
    if ($scope.myChart) {
      $scope.myChart.destroy();
    }
    $http
      .get(thongKeAPI + "/hien-thi-1", {
        params: {
          startDate: $scope.startDate,
          endDate: $scope.endDate,
        },
      })
      .then(function (response) {
        $scope.listThongKe1 = response.data;
        console.log($scope.listThongKe1);

        // Cập nhật dữ liệu cho biểu đồ
        $scope.chartLabels = $scope.listThongKe1.map(function (item) {
          return moment(item.ngay).format("MM/DD/YYYY");
        });

        var ctx = document.getElementById("myChart").getContext("2d");
        $scope.myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: $scope.chartLabels,
            datasets: [
              {
                label: "Doanh thu",
                data: $scope.listThongKe1.map(function (item) {
                  return item.tongDoanhThu;
                }),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    $http
      .get(thongKeAPI + "/hien-thi-2")
      .then(function (response) {
        $scope.listThongKe2 = response.data;
        console.log($scope.listThongKe2);

        var trangThaiMapping = {
          0: "Chờ xác nhận",
          1: "Chờ giao hàng",
          2: "Đang giao hàng",
          3: "Đã nhận hàng",
          4: "Đã hủy",
        };

        var data = $scope.listThongKe2.map(function (item) {
          return item.tongSoHoaDon;
        });

        var labels = $scope.listThongKe2.map(function (item) {
          return trangThaiMapping[item.trangThai];
        });

        var colors = ["red", "blue", "green", "orange", "purple"];

        var ctx = document.getElementById("myPieChart").getContext("2d");

        var myPieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: colors,
              },
            ],
          },
          options: {
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((data) => {
                    sum += data;
                  });
                  let percentage = ((value * 100) / sum).toFixed(2) + "%";
                  return percentage;
                },
                color: "#fff",
              },
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function (
                    previousValue,
                    currentValue,
                    currentIndex,
                    array
                  ) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var percentage =
                    ((currentValue / total) * 100).toFixed(2) + "%";
                  return percentage;
                },
              },
            },
            legend: {
              display: false,
            },
          },
        });
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  };
};
