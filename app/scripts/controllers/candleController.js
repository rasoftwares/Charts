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
 $(function() {

  var stockid = data;
  //console.log(stockid);
  var Url ="app/scripts/data/" + stockid +".json";

  $.getJSON(Url, function (data) {

    //console.log(data);
    /*data pint for 5% up value /*/
    datap = Highcharts.map(data, function (config) {

          return {
              x: config[0],//date
              y: config[5], // opening value +5% value value
          };
      });
  /*data pint for 5% low value*/
    dataL = Highcharts.map(data, function (config) {

            return {
                x: config[0],//date
                y: config[6], // opening value -5% value value
            };
        });

  //  console.log(datap);

   /*data point for candlestick*/
    dataC = Highcharts.map(data, function (config) {
         return {
             x: config[0],//date
             open: config[1],//open
             high: config[2],//high
             low: config[3],//low
             close: config[4],//close
             color: config[7]//color
           };
     });

     //console.log(data);
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
             /*buttons: [
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
             }],*/
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
               name: 'LowValue', // closing value -5% up value
               data: dataL,
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
             name: "HighValue",// opening value +5% value value
             data: datap,
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







});
};
  });
