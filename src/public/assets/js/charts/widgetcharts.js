(function (jQuery) {
  "use strict";

//sparklinechart-1
if(jQuery('#sparklinechart-1').length){
  const options = {
    chart: {
        height: 40,
        type: 'area',
        sparkline: {
            enabled: true
        },
        group: 'sparklines',
  
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 3,
        curve: 'straight'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0,
            opacityFrom: 0,
            opacityTo: 0,
        }
    }, 
    series: [{
        name: 'series1',
        data: [60, 15, 50, 30, 70]
    }, ],
    colors: ['#07750b'],
  
    xaxis: {
        type: 'datetime',
        categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
    },
    tooltip: {
      enabled: false,
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    }
  };
  const chart = new ApexCharts(
      document.querySelector("#sparklinechart-1"),
      options
  );
  chart.render();
}

//sparklinechart-2
if(jQuery('#sparklinechart-2').length){
  const options = {
    chart: {
        height: 40,
        type: 'area',
        sparkline: {
            enabled: true
        },
        group: 'sparklines',
  
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 3,
        curve: 'straight'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0,
            opacityFrom: 0,
            opacityTo: 0,
        }
    }, 
    series: [{
        name: 'series1',
        data: [60, 15, 50, 30, 70]
    }, ],
    colors: ['#07750b'],
  
    xaxis: {
        type: 'datetime',
        categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
    },
    tooltip: {
      enabled: false,
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    }
  };
  const chart = new ApexCharts(
      document.querySelector("#sparklinechart-2"),
      options
  );
  chart.render();
}

//sparklinechart-3
if(jQuery('#sparklinechart-3').length){
  const options = {
    chart: {
        height: 40,
        type: 'area',
        sparkline: {
            enabled: true
        },
        group: 'sparklines',
  
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 3,
        curve: 'straight'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0,
            opacityFrom: 0,
            opacityTo: 0,
        }
    }, 
    series: [{
        name: 'series1',
        data: [60, 15, 50, 30, 70]
    }, ],
    colors: ['#d43418'],
  
    xaxis: {
        type: 'datetime',
        categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
    },
    tooltip: {
      enabled: false,
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    }
  };
  const chart = new ApexCharts(
      document.querySelector("#sparklinechart-3"),
      options
  );
  chart.render();
}

//sparklinechart-4
if(jQuery('#sparklinechart-4').length){
  const options = {
    chart: {
        height: 40,
        type: 'area',
        sparkline: {
            enabled: true
        },
        group: 'sparklines',
  
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 3,
        curve: 'straight'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0,
            opacityFrom: 0,
            opacityTo: 0,
        }
    }, 
    series: [{
        name: 'series1',
        data: [60, 15, 50, 30, 70]
    }, ],
    colors: ['#07750b'],
  
    xaxis: {
        type: 'datetime',
        categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
    },
    tooltip: {
      enabled: false,
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    }
  };
  const chart = new ApexCharts(
      document.querySelector("#sparklinechart-4"),
      options
  );
  chart.render();
}

//sparklinechart-5
if(jQuery('#sparklinechart-5').length){
  const options = {
    chart: {
        height: 40,
        type: 'area',
        sparkline: {
            enabled: true
        },
        group: 'sparklines',
  
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 3,
        curve: 'straight'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0,
            opacityFrom: 0,
            opacityTo: 0,
        }
    }, 
    series: [{
        name: 'series1',
        data: [60, 15, 50, 30, 70]
    }, ],
    colors: ['#d43418'],
  
    xaxis: {
        type: 'datetime',
        categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
    },
    tooltip: {
      enabled: false,
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    }
  };
  const chart = new ApexCharts(
      document.querySelector("#sparklinechart-5"),
      options
  );
  chart.render();
}

//chart-1
if(jQuery('#chart-1').length){
    const options = {
      chart: {
          height: 80,
          type: 'area',
          sparkline: {
              enabled: true
          },
          group: 'sparklines',
    
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          width: 3,
          curve: 'smooth'
      },
      fill: {
          type: 'gradient',
          gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.5,
              opacityTo: 0,
          }
      },
    
      series: [{
          name: 'series1',
          data: [60, 15, 50, 30, 70]
      }, ],
      colors: ['#FF971D'],
    
      xaxis: {
          type: 'datetime',
          categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
      },
      tooltip: {
          x: {
              format: 'dd/MM/yy HH:mm'
          },
      }
    };
    const chart = new ApexCharts(
        document.querySelector("#chart-1"),
        options
    );
    chart.render();
  }
  
  //chart-2
  if(jQuery('#chart-2').length){
    const options = {
      chart: {
          height: 80,
          type: 'area',
          sparkline: {
              enabled: true
          },
          group: 'sparklines',
    
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          width: 3,
          curve: 'smooth'
      },
      fill: {
          type: 'gradient',
          gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.5,
              opacityTo: 0,
          }
      },
      series: [{
          name: 'series1',
          data: [70, 40, 60, 30, 60]
      }, ],
      colors: ['#f16a1b'],
    
      xaxis: {
          type: 'datetime',
          categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
      },
      tooltip: {
          x: {
              format: 'dd/MM/yy HH:mm'
          },
      }
    };
    const chart = new ApexCharts(
        document.querySelector("#chart-2"),
        options
    );
  
    chart.render();
  }
  
  /*--------------Widget Chart 3----------------*/
  if(jQuery('#chart-3').length){
    const options = {
      chart: {
          height: 80,
          type: 'area',
          sparkline: {
              enabled: true
          },
          group: 'sparklines',
    
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          width: 3,
          curve: 'smooth'
      },
      fill: {
          type: 'gradient',
          gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.5,
              opacityTo: 0,
          }
      },
      series: [{
          name: 'series1',
          data: [60, 40, 60, 40, 70]
      }, ],
      colors: ['#1aa053'],
    
      xaxis: {
          type: 'datetime',
          categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
      },
      tooltip: {
          x: {
              format: 'dd/MM/yy HH:mm'
          },
      }
    };
    const chart = new ApexCharts(
        document.querySelector("#chart-3"),
        options
    );
    chart.render();
  }
  
  /*--------------Widget Chart 4----------------*/
  if(jQuery('#chart-4').length){
    const options = {
      chart: {
          height: 80,
          type: 'area',
          sparkline: {
              enabled: true
          },
          group: 'sparklines',
    
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          width: 3,
          curve: 'smooth'
      },
      fill: {
          type: 'gradient',
          gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.5,
              opacityTo: 0,
          }
      },
      series: [{
          name: 'series1',
          data: [75, 30, 60, 35, 60]
      }, ],
      colors: ['#c03221'],
    
      xaxis: {
          type: 'datetime',
          categories: ["1402-08-19T00:00:00", "1402-09-19T01:30:00", "1402-10-19T02:30:00", "1402-11-19T01:30:00", "1402-12-19T01:30:00"],
      },
      tooltip: {
          x: {
              format: 'dd/MM/yy HH:mm'
          },
      }
    };
    const chart = new ApexCharts(
        document.querySelector("#chart-4"),
        options
    );
    chart.render();
  }
  
  /*--------------Widget Box----------------*/
  
  if(jQuery('#iq-chart-box1').length){
    const options = {
      series: [{
        name: "کل فروش",
        data: [10, 10, 35, 10]
    }],
      colors: ["#FF971D"],
      chart: {
      height: 50,
      width: 100,
      type: 'line',
      sparkline: {
          enabled: true,
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
    
    xaxis: {
      categories: ['فروردین', 'اردیبهشت', 'خرداد'],
    },
    tooltip:{
      enabled: false,
    }
    };
    const chart = new ApexCharts(document.querySelector("#iq-chart-box1"), options);
    chart.render();
    const body = document.querySelector('body')
    if (body.classList.contains('dark')) {
      apexChartUpdate(chart, {
        dark: true
      })
    }
    document.addEventListener('ChangeColorMode', function (e) {
      apexChartUpdate(chart, e.detail)
    })
  }
  
  //box-chart-2
  if(jQuery('#iq-chart-box2').length){
    const options = {
      series: [{
        name: "فروش امروز",
        data: [10, 10, 35, 10]
    }],
      colors: ["#c03221"],
      chart: {
      height: 50,
      width: 100,
      type: 'line',
      sparkline: {
          enabled: true,
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
    
    xaxis: {
      categories: ['فروردین', 'اردیبهشت', 'خرداد'],
    },
    tooltip:{
      enabled: false,
    }
    
    };
    const chart = new ApexCharts(document.querySelector("#iq-chart-box2"), options);
    chart.render();
    const body = document.querySelector('body')
    if (body.classList.contains('dark')) {
      apexChartUpdate(chart, {
        dark: true
      })
    }
    document.addEventListener('ChangeColorMode', function (e) {
      apexChartUpdate(chart, e.detail)
    })
  }
  
  //box-chart-3
  
  if(jQuery('#iq-chart-box3').length){
    const options = {
      series: [{
        name: "کل کلاسون",
        data: [10, 10, 35, 10]
    }],
      colors: ["#1aa053"],
      chart: {
      height: 50,
      width: 100,
      type: 'line',
      sparkline: {
          enabled: true,
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
    
    xaxis: {
      categories: ['فروردین', 'اردیبهشت', 'خرداد'],
    },
    tooltip:{
      enabled: false,
    }
    };
  
    const chart = new ApexCharts(document.querySelector("#iq-chart-box3"), options);
    chart.render();
    const body = document.querySelector('body')
    if (body.classList.contains('dark')) {
      apexChartUpdate(chart, {
        dark: true
      })
    }
  
    document.addEventListener('ChangeColorMode', function (e) {
      apexChartUpdate(chart, e.detail)
    })
  }
  
  //box-chart-4
  
  if(jQuery('#iq-chart-box4').length){
    const options = {
      series: [{
        name: "سود کل",
        data: [10, 10, 35, 10]
    }],
      colors: ["#f16a1b"],
      chart: {
      height: 50,
      width: 100,
      type: 'line',
      sparkline: {
          enabled: true,
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
  
    xaxis: {
      categories: ['فروردین', 'اردیبهشت', 'خرداد'],
    },
    tooltip:{
      enabled: false,
    }
    };
  
    const chart = new ApexCharts(document.querySelector("#iq-chart-box4"), options);
    chart.render();
    const body = document.querySelector('body')
    if (body.classList.contains('dark')) {
      apexChartUpdate(chart, {
        dark: true
      })
    }
    document.addEventListener('ChangeColorMode', function (e) {
      apexChartUpdate(chart, e.detail)
    })
  }
  
  
  //extra-widget
  
  if($('#chart').length) {
    const options = {
      series: [{
      name: 'سود خالص',
      data: [44, 55, 57, 56, 61, 58,35,50,56]
    }, {
      name: 'درآمد',
      data: [76, 85, 101, 98, 87, 105,98,100,90]
    }, ],
      chart: {
      type: 'bar',
      height: 270,
      width:700,
      sparkline:{
        enabled:true
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        borderRadius: 10,
        
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 2,
      colors: ['transparent']
      
    },
    xaxis: {
      categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'],
    },
    yaxis: {
      title: {
        text: 'تومان'
      }
    },
    fill: {
      opacity: 1,
      colors: ['#fce3d2', '#f16a1b',]
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return " تومان " + val 
        }
      }
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width:250,
          },
        }
      }
    ]
    };
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
  //chart 2
  if($('#extrachart').length) {
    const options = {
      series: [{
      name: 'سود خالص',
      data: [44, 55, 57, 56, 61, 58]
    }, {
      name: 'درآمد',
      data: [76, 85, 101, 98, 87, 105]
    }, {
      name: 'جریان نقدی آزاد',
      data: [35, 41, 36, 26, 45, 48]
    }],
      chart: {
      type: 'bar',
      height: 250,
      sparkline:{
        enabled:true
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      curve: 'smooth',
      colors: ['transparent']
    },
    xaxis: {
      categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'],
    },
    yaxis: {
      title: {
        text: 'تومان'
      }
    },
    fill: {
      opacity: 1,
      colors:['#FF971D', '#c03221', '#f16a1b']
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return " تومان " + val 
        }
      }
    }
    };  
    const chart = new ApexCharts(document.querySelector("#extrachart"), options);
    chart.render();
  }
  /*-------------- Service Chart ----------------*/
  if (jQuery("#service-chart-01").length) {
    var options = {
      series: [{
      name: 'series1',
      data: [25, 30, 22, 29]
    }],
    colors: ["#FF971D"],
      chart: {
      height: 65,
      width: 140,
      type: 'area',
      sparkline: {
            enabled: true,
        }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["1402-09-19T00:00:00.000Z", "1402-09-19T01:30:00.000Z", "1402-09-19T02:30:00.000Z", "1402-09-19T03:30:00.000Z"]
    },
    tooltip: {
      enabled: false,
    },
    };
  
    var chart = new ApexCharts(document.querySelector("#service-chart-01"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  if (jQuery("#service-chart-02").length) {
    var options = {
      series: [{
      name: 'series1',
      data: [25, 23, 28, 26]
    }],
    colors: ["#c03221"],
      chart: {
      height: 65,
      width: 140,
      type: 'area',
      sparkline: {
            enabled: true,
        }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["1402-09-19T00:00:00.000Z", "1402-09-19T01:30:00.000Z", "1402-09-19T02:30:00.000Z", "1402-09-19T03:30:00.000Z"]
    },
    tooltip: {
      enabled: false,
    },
    };
  
    var chart = new ApexCharts(document.querySelector("#service-chart-02"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  if (jQuery("#service-chart-03").length) {
    var options = {
      series: [{
      name: 'series1',
      data: [25, 23, 28, 23]
    }],
    colors: ["#f16a1b"],
      chart: {
      height: 65,
      width: 140,
      type: 'area',
      sparkline: {
            enabled: true,
        }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["1402-09-19T00:00:00.000Z", "1402-09-19T01:30:00.000Z", "1402-09-19T02:30:00.000Z", "1402-09-19T03:30:00.000Z"]
    },
    tooltip: {
      enabled: false,
    },
    };
  
    var chart = new ApexCharts(document.querySelector("#service-chart-03"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  if (jQuery("#service-chart-04").length) {
    var options = {
      series: [{
      name: 'series1',
      data: [25, 27, 24, 26]
    }],
    colors: ["#1aa053"],
      chart: {
      height: 65,
      width: 140,
      type: 'area',
      sparkline: {
            enabled: true,
        }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["1402-09-19T00:00:00.000Z", "1402-09-19T01:30:00.000Z", "1402-09-19T02:30:00.000Z", "1402-09-19T03:30:00.000Z"]
    },
    tooltip: {
      enabled: false,
    },
    };
  
    var chart = new ApexCharts(document.querySelector("#service-chart-04"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  
  /*-------------- Ethernet Chart ----------------*/
  if (jQuery("#ethernet-chart-01").length) {
    var options = {
      series: [{
        name: "دسکتاپ ها",
        data: [5, 30, 6, 20, 5, 18, 10]
    }],
    colors: ['#FF971D'],
      chart: {
      height: 60,
      width: 100,
      type: 'line',
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['فر وردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
    },
    tooltip: {
      enabled: false,
    }
    };
  
    var chart = new ApexCharts(document.querySelector("#ethernet-chart-01"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  if (jQuery("#ethernet-chart-02").length) {
    var options = {
      series: [{
        name: "دسکتاپ ها",
        data: [5, 20, 4, 18, 3, 15, 10]
    }],
    colors: ['#1aa053'],
      chart: {
      height: 60,
      width: 100,
      type: 'line',
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['فر وردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
    },
    tooltip: {
      enabled: false,
    }
    };
  
    var chart = new ApexCharts(document.querySelector("#ethernet-chart-02"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  if (jQuery("#ethernet-chart-03").length) {
    var options = {
      series: [{
        name: "دسکتاپ ها",
        data: [5, 20, 6, 18, 5, 15, 4]
    }],
    colors: ['#c03221'],
      chart: {
      height: 60,
      width: 100,
      type: 'line',
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['فر وردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
    },
    tooltip: {
      enabled: false,
    }
    };
  
    var chart = new ApexCharts(document.querySelector("#ethernet-chart-03"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  if (jQuery("#ethernet-chart-04").length) {
    var options = {
      series: [{
        name: "دسکتاپ ها",
        data: [5, 15, 3, 20, 5, 18, 13]
    }],
    colors: ['#f16a1b'],
      chart: {
      height: 60,
      width: 100,
      type: 'line',
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      categories: ['فر وردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
    },
    tooltip: {
      enabled: false,
    }
    };
  
    var chart = new ApexCharts(document.querySelector("#ethernet-chart-04"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
  }
  
  /*-------------- Ethernet Chart End ----------------*/
  if (jQuery("#chart-9").length) {
    var options = {
      series: [{
      name: 'series1',
      data: [25, 27, 24, 26]
    }],
    colors: ["#1aa053"],
      chart: {
      height: 65,
      width: 140,
      type: 'area',
      sparkline: {
            enabled: true,
        }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["1402-09-19T00:00:00.000Z", "1402-09-19T01:30:00.000Z", "1402-09-19T02:30:00.000Z", "1402-09-19T03:30:00.000Z"]
    },
    tooltip: {
      enabled: false,
    },
    };
  
    var chart = new ApexCharts(document.querySelector("#chart-9"), options);
    chart.render();
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    apexChartUpdate(chart, {
      dark: true
    })
  }
  
  document.addEventListener('ChangeColorMode', function (e) {
    apexChartUpdate(chart, e.detail)
  })
}
  
})(jQuery)