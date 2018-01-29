app.controller('candleController', function($scope,$http){

  $scope.Stocks = [
    {
      "code": "500031",
      "name": "Reliance"
    },
    {
      "code": "500032",
      "name": "Infosys"
    },
    {
      "code": "500033",
      "name": "TCS"
    },
    {
      "code": "500034",
      "name": "PNB"
    },
    {
      "code": "500035",
      "name": "SBI"
    }
  ];


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

  $.getJSON(Url,function(data) {


   var startDate = new Date(data[data.length - 1][0]), // Get year of last data point
      minRate = 1000,
      maxRate = 800,
      startPeriod,
      date,
      rate,
      index;

  startDate.setMonth(startDate.getMonth() - 3); // a quarter of a year before last data point
  startPeriod = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

  for (index = data.length - 1; index >= 0; index = index - 1) {
      date = data[index][0]; // data[i][0] is date
      rate = data[index][1]; // data[i][1] is exchange rate
      if (date < startPeriod) {
          break; // stop measuring highs and lows
      }
      if (rate > maxRate) {
          maxRate = rate;
      }
      if (rate < minRate) {
          minRate = rate;
      }
  }
   // split the data set into ohlc and volume
   var ohlc = [],
     volume = [],
     hdata=[],
     dataLength = data.length;

   for (i = 0; i < dataLength; i++) {
     ohlc.push([
       data[i][0], // the date
       data[i][1], // open
       data[i][2], // high
       data[i][3], // low
       data[i][4] // close
     ]);

     volume.push([
       data[i][0], // the date
       data[i][5] // the volume
     ]);

     hdata.push([
     data[i][3], // low
     ])
   }

   // set the allowed units for data grouping
   var groupingUnits = [[
     'week',                         // unit name
     [1]                             // allowed multiples
   ], [
     'month',
     [1, 2, 3, 4, 6]
   ]];

   // create the chart
   $('#container').highcharts('StockChart', {


 //vertical line:
    xAxis: {

       plotLines: [{
           color: '#FF0000',
           width: 2,
           value: Date.UTC(2018, 0, 4),
           tickInterval: 24 * 3600 * 1000

         }]
   },

   series: [{
       data: ohlc,
        pointStart: Date.UTC(2018, 0, 1)
   }],


/*selection box*/
    rangeSelector: {
         buttons: [
           {
               type: 'day',
               count: 1,
               text: '1D'
           },{
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
           selected: 4
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
           name: 'SPLINE',
           data: ohlc,
           dataGrouping: {
         units: groupingUnits
           }
       },
     {
           type: 'candlestick',
           name: 'CANDLESTICK',
           data: ohlc,
           dataGrouping: {
         units: groupingUnits
           }
       }, {
         type: 'line',
         name: 'LINE',
         data: ohlc,
         dataGrouping: {
           units: groupingUnits
         }
       },
       {
         type: 'area',
         name: 'AREA',
         data: ohlc,
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

     }],

         plotLines: [{
             color: 'red',
             width: 2,
             value: 100,
             label: {
                 text: 'Plot line',
                 align: 'left',
                 x: -10
             }
         }]

   });
 });

});
};

});
