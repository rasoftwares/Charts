app.controller('candleController', function($scope){

$(function() {
 $.getJSON('app/scripts/data/sampledata.json', function(data) {

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



   yAxis: {
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
   },
   series: [{
       data: hdata,

   }],
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

       title: {
           text: 'STOCK PRICE'
       },

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
});
