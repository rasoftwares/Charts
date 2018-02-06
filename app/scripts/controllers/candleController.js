  app.controller('candleController', function($scope,$http){

  $scope.Stocks = stock.stockdetails;

  $scope.fetchStockDetails = function ($item, $model, $label, $event){
  $scope.StockName = $item.name;
  $scope.Stock_Code= $item.code;
  $scope.prepareChart($item.code);
  //console.log($item.code);
  };


 $scope.prepareChart = function(data) {
//console.log(data);
 //$(function() {

  var stockid = data;
  //console.log(stockid);
  var Url ="app/scripts/data/" + stockid +".json";


  $.getJSON(Url, function (data) {

//    console.log(data);
    var datap = new Array();
    $.map(data, function(obj, i) {
    datap.push([obj.x, parseInt(obj.upper)]);
    });
  //  console.log(datap);

    var dataL = new Array();
    $.map(data, function(obj, i) {
    //  console.log(data);
    dataL.push([obj.x, parseInt(obj.lower)]);
    });
  //  console.log(dataL);

     /*data point for candlestick*/
     var candleData = new Array();
      $.map(data, function(obj, i) {
    //  console.log(candleData);
      candleData.push([obj.x, parseInt(obj.open),parseInt(obj.high),parseInt(obj.low),parseInt(obj.close),(obj.color)]);
      });
    //  console.log(candleData);


     dataC = Highcharts.map(candleData, function (config) {
    // console.log(data);
         return {
             x: config[0],//date
             open: config[1],//open
             high: config[2],//high
             low: config[3],//low
             close: config[4],//close
             color: config[5]//color
           };
     });
  //   console.log(dataC);

     var groupingUnits = [[
       'week',                         // unit name
       [1]                             // allowed multiples
     ], [
       'month',
       [1, 2, 3, 4, 6]
     ]];

     // create the chart
     var chart = Highcharts.stockChart('container', {
        /*selection box*/
        rangeSelector: {
             buttons: [
               {
                 type: 'minute',
                 count: 15,
                 text: '15M'
               },
               {
                 type: 'week',
                 count: 1,
                 text: '1W'
             },
             {
                 type: 'month',
                 count: 1,
                 text: '1M'
             },
             {
                 type: 'year',
                 count: 1,
                 text: '1Y'
             },

             {
                 type: 'all',
                 count: 1,
                 text: 'All'
             }],
               selected: 1
           },

           /*title: {
               text: 'STOCK PRICE'
           },*/
                legend: {
                        enabled: true
                    },

           yAxis: [{
               title: {
                   text: 'OHLC'
               },
               height: 200,
               lineWidth: 2
           }

            /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/],

      /*charts**/
           series: [{


               type: 'spline',
               name: 'UpperValue', // closing value -5% up value
               data: datap,
               dataGrouping: {
             units: groupingUnits
               }
           },
         {
               type: 'candlestick',
               name: 'CANDLESTICK',
               data: dataC,
               dataGrouping: {
             units: groupingUnits
               }
           }, {
             type: 'line',
             name: "LowValue",// opening value +5% value value
             data: dataL,
             dataGrouping: {
               units: groupingUnits
             }
          /* },
           {
             type: 'area',
             name: 'AREA',
             data: data,
             dataGrouping: {
               units: groupingUnits
             }

                /*   {
               type: 'column',
               name: 'Volume',
               data: volume,
               yAxis: 1,
               dataGrouping: {
             units: groupingUnits
           }*/

         }]
 });


 });







//});
};
  });
