app.controller('nseController', function($scope, $http, $filter, $window, ) {
 /*combo box value*/
 $scope.values = ['1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];
 $scope.selectedNumber = $scope.values[0];
 $scope.nseStocks = nsestock.stockdetails;
 $scope.Folder_Path = "app/scripts/data/nse/futures/";
 $scope.Folder_Path_Month = "app/scripts/data/nse/futures/expiry/"
 $scope.title1 = "27-06-2019";
 $scope.title2 = "25-07-2019";
 $scope.title3 = "29-08-2019";
 $scope.resistance_RL = "RED";
 $scope.resistance_RH = "GREEN";
 $scope.range_RL = "BLUE";
 $scope.range_RH = "ORANGE";
 $scope.support_RL = "YELLOW";
 $scope.support_RH = "PINK";
 $scope.per_input = "3"
 $scope.Percentage_Value = ($scope.per_input / 100);
 console.log("------->Percentage_Value" + $scope.Percentage_Value);
 $scope.windowPop = function() {
  $window.open("#/table");
 };
 /*bt detoils*/
 // var btUrl="app/scripts/data/nse/trend/bt.json";

 var otUrl = "app/scripts/data/nse/trend/ot.json";
 var stUrl = "app/scripts/data/nse/trend/st.json";

 $http.get(otUrl).
 success(function(data, status, headers, config) {
  $scope.otList = data;
//  console.log($scope.otList);
 }).
 error(function(data, status, headers, config) {
  // log error
 });

 $http.get(stUrl).
 success(function(data, status, headers, config) {
  $scope.stList = data;
  //console.log($scope.stList);
 }).
 error(function(data, status, headers, config) {
  // log error
 });

 $http.get(stUrl).
 success(function(data, status, headers, config) {
  $scope.btList = data;
//  console.log($scope.btList);
 }).
 error(function(data, status, headers, config) {
  // log error
 });
 /*fetchStockDetails*/

 $scope.fetchStockDetails = function($item, $model, $label, $event) {
  $scope.StockName = $item.name;
  $scope.Stock_Code = $item.code;
  $scope.prepareChart($item.code, $item.name);
  $scope.prepareChart1($item.code, $item.name);
  $scope.prepareChart2($item.code, $item.name);
  $("#tabs").tabs({
   active: 0
  });
  $("#tabs3").tabs({
   active: 2
  });
  $("#tabs4").tabs({
   active: 2
  });
  $("#tabs5").tabs({
   active: 2
  });
 };
 Highcharts.setOptions({
  time: {
   timezone: 'Asia/Kolkata'
  },
  plotOptions: {
   series: {
    turboThreshold: 100000 //set it to a larger threshold, it is by default to 1000
   }
 }
 });


 $scope.prepareChart = function(stockid) {
  $scope.stockid = stockid;
  var PUrl = "app/scripts/data/nse/peers/" + $scope.stockid + ".json";
  var Exp1Url1m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_1Min.json";
  var Exp1Url3m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_3Min.json";
  var Exp1Url5m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_5Min.json";
  var Exp1Url10m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_10Min.json";
  var Exp1Url15m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_15Min.json";
  var Exp1Url30m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_30Min.json";
  var Exp1Url60m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_60Min.json";
  var Exp1Url120m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_120Min.json";
  var Exp1Url240m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_240Min.json";

  $('#container1').html(" ");$('#container2').html(" ");$('#container3').html(" ");$('#container4').html(" ");
  $('#container5').html(" ");$('#container6').html(" ");$('#container7').html(" ");$('#container8').html(" ");$('#container9').html(" ");



//  $('#container1').html(" ");
  $('.highcharts-data-table').html(" ");
  /*Future Charts-*/


  $.getJSON(Exp1Url1m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });

   var super_trend = new Array();
   $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
   });

   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container1', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
    /* mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
     enabled: true,
     align: 'center',
           verticalAlign: 'top',
           floating: true,
           x: 0,
           y: 15

   },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "1Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
     ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
    });

  $http.get(PUrl).
  success(function(data, status, headers, config) {
   $scope.peersdata = data;
   console.log($scope.peersdata);
  }).
  error(function(data, status, headers, config) {});

  /* exp13min*/
  $.getJSON(Exp1Url3m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });

   var super_trend = new Array();
 $.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
 });

   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container2', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
    /* mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
     enabled: true,
     align: 'center',
           verticalAlign: 'top',
           floating: true,
           x: 0,
           y: 15

   },
     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "3Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
      ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
  });
  /* exp15min*/
  $.getJSON(Exp1Url5m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });
   var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});

   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container3', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
    /* mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
         enabled: true,
         align: 'center',
               verticalAlign: 'top',
               floating: true,
               x: 0,
               y: 15

       },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "5Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
   name: "RMV_TrendLine",
   id: "supertrend", // opening value +5% value value
   data: super_trend,
   showInLegend: true,
//   visible: false,
   color: "pink",
   visible: false,
  }

     ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
  });
  /* exp10min*/
  $.getJSON(Exp1Url10m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });

   var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});

   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container4', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
    /* mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
         enabled: true,
         align: 'center',
               verticalAlign: 'top',
               floating: true,
               x: 0,
               y: 15

       },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "10Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }

     ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
  });
  /* exp15min*/
  $.getJSON(Exp1Url15m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });
   var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});
   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container5', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
     /*mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
      enabled: true,
      align: 'center',
            verticalAlign: 'top',
            floating: true,
            x: 0,
            y: 15

    },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "15Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
   ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
  });
  /* exp30min*/
  $.getJSON(Exp1Url30m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });

   var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container6', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
    /* mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "30Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
   name: "RMV_TrendLine",
   id: "supertrend", // opening value +5% value value
   data: super_trend,
   showInLegend: true,
//   visible: false,
   color: "pink",
   visible: false,
  }
     ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
  });
  /* exp160min*/
  $.getJSON(Exp1Url60m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });
   var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });
   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container7', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
     /*mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "60Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
      name: "RMV_TrendLine",
      id: "supertrend", // opening value +5% value value
      data: super_trend,
      showInLegend: true,
   //   visible: false,
      color: "pink",
      visible: false,
     }
     ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
  });
  /* exp1120min*/
  $.getJSON(Exp1Url120m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });
   var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container8', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
    /* mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "15Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },

  {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }

     ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);
    });
  });
  /* exp1240min*/

  $.getJSON(Exp1Url240m, function(data) {
   $scope.stockdata = data;
   var candleData = new Array();
   $.map(data, function(obj, i) {
    candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
   });

   var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

   var data_Resistane_low = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_low.push([parseFloat(obj.open)]);
   });
   var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
   var data_RL = new Array();
   $.map(data, function(obj, i) {
    data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
   });
   var data_Resistane_high = new Array();
   $.map(data, function(obj, i) {
    data_Resistane_high.push([parseFloat(obj.close)]);
   });
   var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
   var data_RH = new Array();
   $.map(data, function(obj, i) {
    data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
   });
   var data_Range_low = new Array();
   $.map(data, function(obj, i) {
    data_Range_low.push([parseFloat(obj.high)]);
   });
   var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_RA_L = new Array();
   $.map(data, function(obj, i) {
    data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
   });
   var data_Range_high = new Array();
   $.map(data, function(obj, i) {
    data_Range_high.push([parseFloat(obj.low)]);
   });
   var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
   var data_RA_H = new Array();
   $.map(data, function(obj, i) {
    data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
   });
   var data_Support_low = new Array();
   $.map(data, function(obj, i) {
    data_Support_low.push([parseFloat(obj.high)]);
   });
   var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
   var data_S_L = new Array();
   $.map(data, function(obj, i) {
    data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
   });
   var data_Support_high = new Array();
   $.map(data, function(obj, i) {
    data_Support_high.push([parseFloat(obj.low)]);
   });
   var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
   var data_S_H = new Array();
   $.map(data, function(obj, i) {
    data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
   });
   dataC = Highcharts.map(candleData, function(config) {
    return {
     x: config[0],
     open: config[1],
     high: config[2],
     low: config[3],
     close: config[4],
     color: config[5]
    };
   });
   // create the chart
   var chart = Highcharts.stockChart('container9', {
     tooltip: {
      followTouchMove: true,
      shared: true
     },
     xAxis: {
      crosshair: true,
     },
    /* mapNavigation: {
      enabled: true,
      enableButtons: false
    },*/
     rangeSelector: {
      enabled: true, //range selector
      inputEnabled: false,
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15M'
       },
       {
        type: 'day',
        count: 1,
        text: '1D'
       },
       {
        type: 'all',
        count: 1,
        text: 'All'
       }
      ],
      selected: 1
     },
     title: {
      text: $scope.stockid + ': EXP DATE :' + $scope.title1
     },
     legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

     yAxis: [{
      title: {
       text: 'OHLC'
      },
      //alignTicks: true,
      //height: 200,
      // lineWidth: 2,
      crosshair: {
       label: {
        enabled: true,
        format: '{value:.2f}'
       },
      },
      labels: {
       align: 'left',
       format: '{value:.2f}',
       y: 6,
       x: 2
      }
     }],
     /*charts**/
     series: [{
       type: 'candlestick',
       name: "240Min", // opening value +5% value value
       data: dataC,
       showInLegend: false,
       dataGrouping: {
        groupPixelWidth: 1
       }
      },
      {
       name: "RE_L", // opening value +5% value value
       data: data_RL,
       visible: false,
       color: $scope.resistance_RL
      },
      {
       name: "RE_H", // opening value +5% value value
       data: data_RH,
       visible: false,
       color: $scope.resistance_RH
      },
      {
       name: "RA_L", // opening value +5% value value
       data: data_RA_L,
       visible: false,
       color: $scope.range_RL
      },
      {
       name: "RA_H", // opening value +5% value value
       data: data_RA_H,
       visible: false,
       color: $scope.range_RH
      },
      {
       name: "S_L", // opening value +5% value value
       data: data_S_L,
       visible: false,
       color: $scope.support_RH
      },
      {
       name: "S_H", // opening value +5% value value
       data: data_S_H,
       visible: false,
       color: $scope.support_RL
     },
     {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
     ]
    },
    function(chart) {
     // apply the date pickers
     setTimeout(function() {
      $('input.highcharts-range-selector').datepicker();
     }, 0);

    });
  });





};//end prepareChart


 /*PREPARE CHARTS-----------------------------*/


 $scope.prepareChart1 = function(data) {
  $("#tabs").tabs({
    activate: function(event, ui) {

    $scope.stockid = data;
    //  console.log($scope.stockid);
    var PUrl = "app/scripts/data/nse/peers/" + $scope.stockid + ".json";
    var Exp2Url1m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_1Min.json";
    var Exp2Url3m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_3Min.json";
    var Exp2Url5m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_5Min.json";
    var Exp2Url10m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_10Min.json";
    var Exp2Url15m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_15Min.json";
    var Exp2Url30m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_30Min.json";
    var Exp2Url60m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_60Min.json";
    var Exp2Url120m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_120Min.json";
    var Exp2Url240m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_240Min.json";
    $('#container11').html(" ");$('#container12').html(" ");$('#container13').html(" ");$('#container14').html(" ");
    $('#container15').html(" ");$('#container16').html(" ");$('#container17').html(" ");$('#container18').html(" ");$('#container19').html(" ");


    $('.highcharts-data-table').html(" ");


    /*exp11min*/
    $.getJSON(Exp2Url1m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var super_trend = new Array();
      $.map(data, function(obj, i) {
       super_trend.push([obj.x, parseFloat(obj.open)]);
      });

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container11', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "1Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });

    /* exp13min*/
    $.getJSON(Exp2Url3m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });


     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container12', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
           enabled: true,
           align: 'center',
                 verticalAlign: 'top',
                 floating: true,
                 x: 0,
                 y: 15

         },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "3Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp25min*/
    $.getJSON(Exp2Url5m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container13', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
    /*   mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "5Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp110min*/
    $.getJSON(Exp2Url10m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var super_trend = new Array();
      $.map(data, function(obj, i) {
       super_trend.push([obj.x, parseFloat(obj.open)]);
      });


     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container14', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "10Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp115min*/
    $.getJSON(Exp2Url15m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container15', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
      enabled: true,
      align: 'center',
            verticalAlign: 'top',
            floating: true,
            x: 0,
            y: 15

    },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "15Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp230min*/
    $.getJSON(Exp2Url30m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container16', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "30Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp260min*/
    $.getJSON(Exp2Url60m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container17', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "60Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp2120min*/
    $.getJSON(Exp2Url120m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container18', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "15Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp2240min*/

    $.getJSON(Exp2Url240m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container19', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title2
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "240Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });


   }
  });
}; //end prepa1 function





 $scope.prepareChart2 = function(data) {
  $("#tabs").tabs({
   beforeActivate:function(event, ui) {
    $scope.stockid = data;
    //  console.log($scope.stockid);
    var PUrl = "app/scripts/data/nse/peers/" + $scope.stockid + ".json";

    var Exp3Url1m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_1Min.json";
    var Exp3Url3m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_3Min.json";
    var Exp3Url5m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_5Min.json";
    var Exp3Url10m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_10Min.json";
    var Exp3Url15m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_15Min.json";
    var Exp3Url30m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_30Min.json";
    var Exp3Url60m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_60Min.json";
    var Exp3Url120m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_120Min.json";
    var Exp3Url240m = $scope.Folder_Path + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_240Min.json";

    $('#container21').html(" ");$('#container22').html(" ");$('#container23').html(" ");$('#container24').html(" ");
    $('#container25').html(" ");$('#container26').html(" ");$('#container27').html(" ");$('#container28').html(" ");$('#container29').html(" ");




    /*exp31min*/
    $.getJSON(Exp3Url1m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container21', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
         enabled: true,
         align: 'center',
               verticalAlign: 'top',
               floating: true,
               x: 0,
               y: 15

       },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "1Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp13min*/
    $.getJSON(Exp3Url3m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});



     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container22', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
         enabled: true,
         align: 'center',
               verticalAlign: 'top',
               floating: true,
               x: 0,
               y: 15

       },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "3Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp35min*/
    $.getJSON(Exp3Url5m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container23', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
    /*   mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "5Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp30min*/
    $.getJSON(Exp3Url10m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var super_trend = new Array();
      $.map(data, function(obj, i) {
       super_trend.push([obj.x, parseFloat(obj.open)]);
      });


     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container24', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
    /*   mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "10Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp35min*/
    $.getJSON(Exp3Url15m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container25', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "15Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp330min*/
    $.getJSON(Exp3Url30m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});


     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container26', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "30Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
        name: "RMV_TrendLine",
        id: "supertrend", // opening value +5% value value
        data: super_trend,
        showInLegend: true,
     //   visible: false,
        color: "pink",
        visible: false,
       }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp360min*/
    $.getJSON(Exp3Url60m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
   $.map(data, function(obj, i) {
    super_trend.push([obj.x, parseFloat(obj.open)]);
   });


     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container27', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "60Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp3120min*/
    $.getJSON(Exp3Url120m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });


     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container28', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "15Min", // opening value +5% value value
         showInLegend: false,
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp3240min*/

    $.getJSON(Exp3Url240m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });

     var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container29', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
      /* mapNavigation: {
        enabled: true,
        enableButtons: false
      },*/
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.stockid + ': EXP DATE :' + $scope.title3
       },
       legend: {
       enabled: true,
       align: 'center',
             verticalAlign: 'top',
             floating: true,
             x: 0,
             y: 15

     },

       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "240Min", // opening value +5% value value
         data: dataC,
         showInLegend: false,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
       },
       {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });


   }
  });
 }; //preaparchart3


 ////////static chart//
 $scope.DefaultTitle="ACC"

 var PUrl1 = "app/scripts/data/nse/peers/" + $scope.DefaultTitle + ".json";
 var Exp1Url1m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_1Min.json";
 var Exp1Url3m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_3Min.json";
 var Exp1Url5m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_5Min.json";
 var Exp1Url10m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_10Min.json";
 var Exp1Url15m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_15Min.json";
 var Exp1Url30m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_30Min.json";
 var Exp1Url60m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_60Min.json";
 var Exp1Url120m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_120Min.json";
 var Exp1Url240m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title1 + "_240Min.json";


 $.getJSON(Exp1Url1m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container1', {
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    mapNavigation: {
     enabled: true,
     enableButtons: false
    },
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
          enabled: true,
          align: 'center',
                verticalAlign: 'top',
                floating: true,
                x: 0,
                y: 15

        },

    yAxis: [{
     title: {
      text: 'OHLC'
     },

     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "1Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });
 });

 /* exp13min*/
 $.getJSON(Exp1Url3m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });


  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container2', {
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    mapNavigation: {
     enabled: true,
     enableButtons: false
    },
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

    yAxis: [{
     title: {
      text: 'OHLC'
     },

     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "3Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },

    {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });
 });
 /* exp15min*/
 $.getJSON(Exp1Url5m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });


  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container3', {
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    mapNavigation: {
     enabled: true,
     enableButtons: false
    },
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

    yAxis: [{
     title: {
      text: 'OHLC'
     },

     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "5Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });
 });
 /* exp10min*/
 $.getJSON(Exp1Url10m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });


  var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container4', {



  //zoomType: 'xy',
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },

    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: true,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
          enabled: true,
          align: 'center',
                verticalAlign: 'top',
                floating: true,
                x: 0,
                y: 15

        },

    yAxis: [{
     title: {
      text: 'OHLC'
    },

     ////alignTicks: true,
     //height: 200,
     // lineWidth: 2,
     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "10Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }

    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });

 });
 /* exp15min*/
 $.getJSON(Exp1Url15m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });


  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container5', {

   tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    /*mapNavigation: {
     enabled: true,
     enableButtons: false
   },*/
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
      enabled: true,
      align: 'center',
            verticalAlign: 'top',
            floating: true,
            x: 0,
            y: 15

    },


    yAxis: [{
     title: {
      text: 'OHLC'
     },
     //alignTicks: true,
     //height: 200,
     // lineWidth: 2,
     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "15Min", // opening value +5% value value
      data: dataC,
     showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });


 });
 /* exp30min*/
 $.getJSON(Exp1Url30m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });


  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container6', {
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    mapNavigation: {
     enabled: true,
     enableButtons: false
    },
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

    yAxis: [{
     title: {
      text: 'OHLC'
     },
     //alignTicks: true,
     //height: 200,
     // lineWidth: 2,
     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "30Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });
 });
 /* exp160min*/
 $.getJSON(Exp1Url60m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container7', {
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    mapNavigation: {
     enabled: true,
     enableButtons: false
    },
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

    yAxis: [{
     title: {
      text: 'OHLC'
     },
     //alignTicks: true,
     //height: 200,
     // lineWidth: 2,
     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "60Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });
 });
 /* exp1120min*/
 $.getJSON(Exp1Url120m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container8', {
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    mapNavigation: {
     enabled: true,
     enableButtons: false
    },
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },
    yAxis: [{
     title: {
      text: 'OHLC'
     },
     //alignTicks: true,
     //height: 200,
     // lineWidth: 2,
     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "120Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });
 });
 /* exp1240min*/

 $.getJSON(Exp1Url240m, function(data) {
  $scope.stockdata = data;
  var candleData = new Array();
  $.map(data, function(obj, i) {
   candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
  });

  var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

  var data_Resistane_low = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_low.push([parseFloat(obj.open)]);
  });
  var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
  var data_RL = new Array();
  $.map(data, function(obj, i) {
   data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
  });
  var data_Resistane_high = new Array();
  $.map(data, function(obj, i) {
   data_Resistane_high.push([parseFloat(obj.close)]);
  });
  var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
  var data_RH = new Array();
  $.map(data, function(obj, i) {
   data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
  });
  var data_Range_low = new Array();
  $.map(data, function(obj, i) {
   data_Range_low.push([parseFloat(obj.high)]);
  });
  var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_RA_L = new Array();
  $.map(data, function(obj, i) {
   data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
  });
  var data_Range_high = new Array();
  $.map(data, function(obj, i) {
   data_Range_high.push([parseFloat(obj.low)]);
  });
  var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
  var data_RA_H = new Array();
  $.map(data, function(obj, i) {
   data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
  });
  var data_Support_low = new Array();
  $.map(data, function(obj, i) {
   data_Support_low.push([parseFloat(obj.high)]);
  });
  var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
  var data_S_L = new Array();
  $.map(data, function(obj, i) {
   data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
  });
  var data_Support_high = new Array();
  $.map(data, function(obj, i) {
   data_Support_high.push([parseFloat(obj.low)]);
  });
  var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
  var data_S_H = new Array();
  $.map(data, function(obj, i) {
   data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
  });
  dataC = Highcharts.map(candleData, function(config) {
   return {
    x: config[0],
    open: config[1],
    high: config[2],
    low: config[3],
    close: config[4],
    color: config[5]
   };
  });
  // create the chart
  var chart = Highcharts.stockChart('container9', {
    tooltip: {
     followTouchMove: true,
     shared: true
    },
    xAxis: {
     crosshair: true,
    },
    mapNavigation: {
     enabled: true,
     enableButtons: false
    },
    rangeSelector: {
     enabled: true, //range selector
     inputEnabled: false,
     buttons: [{
       type: 'minute',
       count: 15,
       text: '15M'
      },
      {
       type: 'day',
       count: 1,
       text: '1D'
      },
      {
       type: 'all',
       count: 1,
       text: 'All'
      }
     ],
     selected: 1
    },
    title: {
     text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
    },
    legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

    yAxis: [{
     title: {
      text: 'OHLC'
     },
     //alignTicks: true,
     //height: 200,
     // lineWidth: 2,
     crosshair: {
      label: {
       enabled: true,
       format: '{value:.2f}'
      },
     },
     labels: {
      align: 'left',
      format: '{value:.2f}',
      y: 6,
      x: 2
     }
    }],
    /*charts**/
    series: [{
      type: 'candlestick',
      name: "240Min", // opening value +5% value value
      data: dataC,
      showInLegend: false,
      dataGrouping: {
       groupPixelWidth: 1
      }
     },
     {
      name: "RE_L", // opening value +5% value value
      data: data_RL,
      visible: false,
      color: $scope.resistance_RL
     },
     {
      name: "RE_H", // opening value +5% value value
      data: data_RH,
      visible: false,
      color: $scope.resistance_RH
     },
     {
      name: "RA_L", // opening value +5% value value
      data: data_RA_L,
      visible: false,
      color: $scope.range_RL
     },
     {
      name: "RA_H", // opening value +5% value value
      data: data_RA_H,
      visible: false,
      color: $scope.range_RH
     },
     {
      name: "S_L", // opening value +5% value value
      data: data_S_L,
      visible: false,
      color: $scope.support_RH
     },
     {
      name: "S_H", // opening value +5% value value
      data: data_S_H,
      visible: false,
      color: $scope.support_RL
    },
    {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }

    ]
   },
   function(chart) {
    // apply the date pickers
    setTimeout(function() {
     $('input.highcharts-range-selector').datepicker();
    }, 0);
   });
 });



/*static exp2 with tab sunction*/

 $(function() {
  $("#tabs").tabs({
   activate: function(event, ui) {

     $scope.DefaultTitle="ACC"

     //var PUrl = "app/scripts/data/nse/peers/" + $scope.DefaultTitle + ".json";
     var Exp2Url1m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_1Min.json";
     var Exp2Url3m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_3Min.json";
     var Exp2Url5m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_5Min.json";
     var Exp2Url10m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_10Min.json";
     var Exp2Url15m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_15Min.json";
     var Exp2Url30m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_30Min.json";
     var Exp2Url60m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_60Min.json";
     var Exp2Url120m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_120Min.json";
     var Exp2Url240m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title2 + "_240Min.json";


     $.getJSON(Exp2Url1m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });
      var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });


      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container11', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
      enabled: true,
      align: 'center',
            verticalAlign: 'top',
            floating: true,
            x: 0,
            y: 15

    },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "1Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
   name: "RMV_TrendLine",
   id: "supertrend", // opening value +5% value value
   data: super_trend,
   showInLegend: true,
//   visible: false,
   color: "pink",
   visible: false,
  }

        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });

     /* exp13min*/
     $.getJSON(Exp2Url3m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });

      var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });


      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container12', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "3Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }

        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });
     /* exp15min*/
     $.getJSON(Exp2Url5m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });
      var super_trend = new Array();
        $.map(data, function(obj, i) {
         super_trend.push([obj.x, parseFloat(obj.open)]);
        });


      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container13', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "5Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });
     /* exp10min*/
     $.getJSON(Exp2Url10m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });

      var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container14', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "10Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });
     /* exp15min*/
     $.getJSON(Exp2Url15m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });

      var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});

      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container15', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "15Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
   name: "RMV_TrendLine",
   id: "supertrend", // opening value +5% value value
   data: super_trend,
   showInLegend: true,
//   visible: false,
   color: "pink",
   visible: false,
  }
        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });
     /* exp30min*/
     $.getJSON(Exp2Url30m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });

      var super_trend = new Array();
  $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
  });

      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container16', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "30Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
    name: "RMV_TrendLine",
    id: "supertrend", // opening value +5% value value
    data: super_trend,
    showInLegend: true,
 //   visible: false,
    color: "pink",
    visible: false,
   }
        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });
     /* exp160min*/
     $.getJSON(Exp2Url60m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });

      var super_trend = new Array();
     $.map(data, function(obj, i) {
   super_trend.push([obj.x, parseFloat(obj.open)]);
    });

      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container17', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
      enabled: true,
      align: 'center',
            verticalAlign: 'top',
            floating: true,
            x: 0,
            y: 15

    },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "60Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }
        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });
     /* exp1120min*/
     $.getJSON(Exp2Url120m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });

      var super_trend = new Array();
 $.map(data, function(obj, i) {
  super_trend.push([obj.x, parseFloat(obj.open)]);
 });

      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container18', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },
        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "15Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },
        {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }

        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });
     /* exp1240min*/

     $.getJSON(Exp2Url240m, function(data) {
      $scope.stockdata = data;
      var candleData = new Array();
      $.map(data, function(obj, i) {
       candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
      });

      var super_trend = new Array();
$.map(data, function(obj, i) {
 super_trend.push([obj.x, parseFloat(obj.open)]);
});
      var data_Resistane_low = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_low.push([parseFloat(obj.open)]);
      });
      var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
      var data_RL = new Array();
      $.map(data, function(obj, i) {
       data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
      });
      var data_Resistane_high = new Array();
      $.map(data, function(obj, i) {
       data_Resistane_high.push([parseFloat(obj.close)]);
      });
      var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
      var data_RH = new Array();
      $.map(data, function(obj, i) {
       data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
      });
      var data_Range_low = new Array();
      $.map(data, function(obj, i) {
       data_Range_low.push([parseFloat(obj.high)]);
      });
      var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_RA_L = new Array();
      $.map(data, function(obj, i) {
       data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
      });
      var data_Range_high = new Array();
      $.map(data, function(obj, i) {
       data_Range_high.push([parseFloat(obj.low)]);
      });
      var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
      var data_RA_H = new Array();
      $.map(data, function(obj, i) {
       data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
      });
      var data_Support_low = new Array();
      $.map(data, function(obj, i) {
       data_Support_low.push([parseFloat(obj.high)]);
      });
      var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
      var data_S_L = new Array();
      $.map(data, function(obj, i) {
       data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
      });
      var data_Support_high = new Array();
      $.map(data, function(obj, i) {
       data_Support_high.push([parseFloat(obj.low)]);
      });
      var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
      var data_S_H = new Array();
      $.map(data, function(obj, i) {
       data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
      });
      dataC = Highcharts.map(candleData, function(config) {
       return {
        x: config[0],
        open: config[1],
        high: config[2],
        low: config[3],
        close: config[4],
        color: config[5]
       };
      });
      // create the chart
      var chart = Highcharts.stockChart('container19', {
        tooltip: {
         followTouchMove: true,
         shared: true
        },
        xAxis: {
         crosshair: true,
        },
        mapNavigation: {
         enabled: true,
         enableButtons: false
        },
        rangeSelector: {
         enabled: true, //range selector
         inputEnabled: false,
         buttons: [{
           type: 'minute',
           count: 15,
           text: '15M'
          },
          {
           type: 'day',
           count: 1,
           text: '1D'
          },
          {
           type: 'all',
           count: 1,
           text: 'All'
          }
         ],
         selected: 1
        },
        title: {
         text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
        },
        legend: {
        enabled: true,
        align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 15

      },

        yAxis: [{
         title: {
          text: 'OHLC'
         },
         //alignTicks: true,
         //height: 200,
         // lineWidth: 2,
         crosshair: {
          label: {
           enabled: true,
           format: '{value:.2f}'
          },
         },
         labels: {
          align: 'left',
          format: '{value:.2f}',
          y: 6,
          x: 2
         }
        }],
        /*charts**/
        series: [{
          type: 'candlestick',
          name: "240Min", // opening value +5% value value
          data: dataC,
          showInLegend: false,
          dataGrouping: {
           groupPixelWidth: 1
          }
         },
         {
          name: "RE_L", // opening value +5% value value
          data: data_RL,
          visible: false,
          color: $scope.resistance_RL
         },
         {
          name: "RE_H", // opening value +5% value value
          data: data_RH,
          visible: false,
          color: $scope.resistance_RH
         },
         {
          name: "RA_L", // opening value +5% value value
          data: data_RA_L,
          visible: false,
          color: $scope.range_RL
         },
         {
          name: "RA_H", // opening value +5% value value
          data: data_RA_H,
          visible: false,
          color: $scope.range_RH
         },
         {
          name: "S_L", // opening value +5% value value
          data: data_S_L,
          visible: false,
          color: $scope.support_RH
         },
         {
          name: "S_H", // opening value +5% value value
          data: data_S_H,
          visible: false,
          color: $scope.support_RL
        },

  {
     name: "RMV_TrendLine",
     id: "supertrend", // opening value +5% value value
     data: super_trend,
     showInLegend: true,
  //   visible: false,
     color: "pink",
     visible: false,
    }

        ]
       },
       function(chart) {
        // apply the date pickers
        setTimeout(function() {
         $('input.highcharts-range-selector').datepicker();
        }, 0);
       });
     });

   }
  });
});//function tab1  close



$(function() {
 $("#tabs").tabs({
  beforeActivate: function(event, ui) {


    $scope.DefaultTitle="ACC"

    //var PUrl = "app/scripts/data/nse/peers/" + $scope.DefaultTitle + ".json";
    var Exp3Url1m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_1Min.json";
    var Exp3Url3m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_3Min.json";
    var Exp3Url5m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_5Min.json";
    var Exp3Url10m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_10Min.json";
    var Exp3Url15m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_15Min.json";
    var Exp3Url30m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_30Min.json";
    var Exp3Url60m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_60Min.json";
    var Exp3Url120m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_120Min.json";
    var Exp3Url240m = $scope.Folder_Path + $scope.DefaultTitle + "_NSE_FUTURES_" + $scope.title3 + "_240Min.json";


    $.getJSON(Exp3Url1m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container21', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "1Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });

    /* exp13min*/
    $.getJSON(Exp3Url3m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container22', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "3Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp15min*/
    $.getJSON(Exp3Url5m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container23', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "5Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp10min*/
    $.getJSON(Exp3Url10m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container24', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "10Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp15min*/
    $.getJSON(Exp3Url15m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container25', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "15Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp30min*/
    $.getJSON(Exp3Url30m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container26', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "30Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp160min*/
    $.getJSON(Exp3Url60m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container27', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "60Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp1120min*/
    $.getJSON(Exp3Url120m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container28', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "15Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });
    /* exp1240min*/

    $.getJSON(Exp3Url240m, function(data) {
     $scope.stockdata = data;
     var candleData = new Array();
     $.map(data, function(obj, i) {
      candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
     });
     var data_Resistane_low = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_low.push([parseFloat(obj.open)]);
     });
     var last_Resistance_lowvalue = data_Resistane_low[data_Resistane_low.length - 1];
     var data_RL = new Array();
     $.map(data, function(obj, i) {
      data_RL.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue) + ($scope.Percentage_Value)]);
     });
     var data_Resistane_high = new Array();
     $.map(data, function(obj, i) {
      data_Resistane_high.push([parseFloat(obj.close)]);
     });
     var last_Resistance_highvalue = data_Resistane_high[data_Resistane_high.length - 1];
     var data_RH = new Array();
     $.map(data, function(obj, i) {
      data_RH.push([parseFloat(obj.x), parseFloat(last_Resistance_highvalue)]);
     });
     var data_Range_low = new Array();
     $.map(data, function(obj, i) {
      data_Range_low.push([parseFloat(obj.high)]);
     });
     var last_Range_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_RA_L = new Array();
     $.map(data, function(obj, i) {
      data_RA_L.push([parseFloat(obj.x), parseFloat(last_Resistance_lowvalue)]);
     });
     var data_Range_high = new Array();
     $.map(data, function(obj, i) {
      data_Range_high.push([parseFloat(obj.low)]);
     });
     var last_Range_highvalue = data_Resistane_high[data_Range_high.length - 1];
     var data_RA_H = new Array();
     $.map(data, function(obj, i) {
      data_RA_H.push([parseFloat(obj.x), parseFloat(last_Range_highvalue)]);
     });
     var data_Support_low = new Array();
     $.map(data, function(obj, i) {
      data_Support_low.push([parseFloat(obj.high)]);
     });
     var last_Support_lowvalue = data_Range_low[data_Range_low.length - 1];
     var data_S_L = new Array();
     $.map(data, function(obj, i) {
      data_S_L.push([parseFloat(obj.x), parseFloat(last_Support_lowvalue)]);
     });
     var data_Support_high = new Array();
     $.map(data, function(obj, i) {
      data_Support_high.push([parseFloat(obj.low)]);
     });
     var last_Support_highvalue = data_Resistane_high[data_Support_high.length - 1];
     var data_S_H = new Array();
     $.map(data, function(obj, i) {
      data_S_H.push([parseFloat(obj.x), parseFloat(last_Support_highvalue)]);
     });
     dataC = Highcharts.map(candleData, function(config) {
      return {
       x: config[0],
       open: config[1],
       high: config[2],
       low: config[3],
       close: config[4],
       color: config[5]
      };
     });
     // create the chart
     var chart = Highcharts.stockChart('container29', {
       tooltip: {
        followTouchMove: true,
        shared: true
       },
       xAxis: {
        crosshair: true,
       },
       mapNavigation: {
        enabled: true,
        enableButtons: false
       },
       rangeSelector: {
        enabled: true, //range selector
        inputEnabled: false,
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15M'
         },
         {
          type: 'day',
          count: 1,
          text: '1D'
         },
         {
          type: 'all',
          count: 1,
          text: 'All'
         }
        ],
        selected: 1
       },
       title: {
        text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title3
       },
       legend: {
        enabled: true
       },
       yAxis: [{
        title: {
         text: 'OHLC'
        },
        //alignTicks: true,
        //height: 200,
        // lineWidth: 2,
        crosshair: {
         label: {
          enabled: true,
          format: '{value:.2f}'
         },
        },
        labels: {
         align: 'left',
         format: '{value:.2f}',
         y: 6,
         x: 2
        }
       }],
       /*charts**/
       series: [{
         type: 'candlestick',
         name: "240Min", // opening value +5% value value
         data: dataC,
         dataGrouping: {
          groupPixelWidth: 1
         }
        },
        {
         name: "RE_L", // opening value +5% value value
         data: data_RL,
         visible: false,
         color: $scope.resistance_RL
        },
        {
         name: "RE_H", // opening value +5% value value
         data: data_RH,
         visible: false,
         color: $scope.resistance_RH
        },
        {
         name: "RA_L", // opening value +5% value value
         data: data_RA_L,
         visible: false,
         color: $scope.range_RL
        },
        {
         name: "RA_H", // opening value +5% value value
         data: data_RA_H,
         visible: false,
         color: $scope.range_RH
        },
        {
         name: "S_L", // opening value +5% value value
         data: data_S_L,
         visible: false,
         color: $scope.support_RH
        },
        {
         name: "S_H", // opening value +5% value value
         data: data_S_H,
         visible: false,
         color: $scope.support_RL
        }
       ]
      },
      function(chart) {
       // apply the date pickers
       setTimeout(function() {
        $('input.highcharts-range-selector').datepicker();
       }, 0);
      });
    });


  }
 });
});//function tab3  close





 $http.get(PUrl1).
 success(function(data, status, headers, config) {
  $scope.peersdata = data;
  console.log($scope.peersdata);
 }).
 error(function(data, status, headers, config) {
  // log error
 });
});
