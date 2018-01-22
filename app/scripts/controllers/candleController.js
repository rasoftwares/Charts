app.controller('candleController', function($scope){

//var color="red";
//var upcolor="yellow";

$.getJSON('app/scripts/data/sampledata.json', function (data) {

    // create the chart
    Highcharts.stockChart('container', {

    /*  plotOptions: {
             candlestick: {
                 color:color,
                 upColor: upcolor
             }
         }, rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },*/

        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Stock Price'
        },

        series: [{
            type: 'candlestick',
            name: 'Stock Price',
            data: data,
            dataGrouping: {
                units: [
                    [
                        'week', // unit name
                        [1] // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]
                ]
            }
        }]
    });
});


  });
