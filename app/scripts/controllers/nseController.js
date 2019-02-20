app.controller('nseController', function($scope, $http, $filter, $window, ) {

    /*combo box value*/
    $scope.values = ['1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];
    $scope.selectedNumber = $scope.values[0];
    $scope.nseStocks = nsestock.stockdetails;
    $scope.title1 = "28-02-2019";
    $scope.title2 = "28-03-2019";
    $scope.title3 = "25-04-2019";




    

    /*bt detoils*/

    // var btUrl="app/scripts/data/nse/trend/bt.json";
    var otUrl = "app/scripts/data/nse/trend/ot.json";
    var stUrl = "app/scripts/data/nse/trend/st.json";

    /* $http.get(btUrl).
       success(function(data, status, headers, config) {
         $scope.btList = data;
         console.log($scope.btList);
       }).
       error(function(data, status, headers, config) {
         // log error
       });*/



    $http.get(otUrl).
    success(function(data, status, headers, config) {
        $scope.otList = data;
        console.log($scope.otList);
    }).
    error(function(data, status, headers, config) {
        // log error
    });

    $http.get(stUrl).
    success(function(data, status, headers, config) {
        $scope.stList = data;
        console.log($scope.stList);
    }).
    error(function(data, status, headers, config) {
        // log error
    });




    /*fetchStockDetails*/

    $scope.fetchStockDetails = function($item, $model, $label, $event) {
        $scope.StockName = $item.name;
        $scope.Stock_Code = $item.code;
        $scope.prepareChart($item.code, $item.name);
        //console.log($item.code);
    };

    /*  $scope.prepareChart1 = function(stockid) {

      var firbaseurl="https://stock-dc49f.firebaseio.com";
      var folders="/nse/futures/";
     // var filename "";
      var auth="uGibYeUL5cvO91MS9wbmOpH5kNgloVdX13fGtyBy";

      var Exp1Url1 = firbaseurl + folders + $scope.stockid +"/exp1.json?auth=" + auth;
      var Exp2Url1= firbaseurl + folders + $scope.stockid +"/exp2.json?auth=" + auth;
      var Exp3Url1= firbaseurl + folders + $scope.stockid +"/exp3.json?auth=" + auth;
      var Url ="app/scripts/data/nse/" + $scope.stockid +".json";
     // var FuUrl ="app/scripts/data/nse/futures/" + $scope.stockid +"_fu.json";
      var PUrl ="app/scripts/data/nse/peers/" + $scope.stockid +".json";


    }


*/




    /*PREPARE CHARTS-----------------------------*/

    $scope.prepareChart = function(stockid) {
        //console.log(data);
        //$(function() {

        $scope.stockid = stockid;
        console.log($scope.stockid);

        // $scop.filename1=

        //var Url ="app/scripts/data/nse/" + $scope.stockid +".json";
        var PUrl = "app/scripts/data/nse/peers/" + $scope.stockid + ".json";

        var Exp1Url1m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_1Min.json";
        var Exp1Url3m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_3Min.json";
        var Exp1Url5m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_5Min.json";
        var Exp1Url10m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_10Min.json";
        var Exp1Url15m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_15Min.json";
        var Exp1Url30m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_30Min.json";
        var Exp1Url60m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_60Min.json";
        var Exp1Url120m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_120Min.json";
        var Exp1Url240m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title1 + "_240Min.json";



        var Exp2Url1m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_1Min.json";
        var Exp2Url3m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_3Min.json";
        var Exp2Url5m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_5Min.json";
        var Exp2Url10m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_10Min.json";
        var Exp2Url15m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_15Min.json";
        var Exp2Url30m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_30Min.json";
        var Exp2Url60m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_60Min.json";
        var Exp2Url120m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_120Min.json";
        var Exp2Url240m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title2 + "_240Min.json";


        var Exp3Url1m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_1Min.json";
        var Exp3Url3m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_3Min.json";
        var Exp3Url5m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_5Min.json";
        var Exp3Url10m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_10Min.json";
        var Exp3Url15m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_15Min.json";
        var Exp3Url30m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_30Min.json";
        var Exp3Url60m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_60Min.json";
        var Exp3Url120m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_120Min.json";
        var Exp3Url240m = "app/scripts/data/nse/futures/" + $scope.stockid + "_NSE_FUTURES_" + $scope.title3 + "_240Min.json";




        /*var Exp2Url5m="app/scripts/data/nse/futures/" + $scope.stockid +"_NSE_FUTURES_27-12-2018_5Min.json";
        var Exp2Url10m="app/scripts/data/nse/futures/" + $scope.stockid +"_NSE_FUTURES_27-12-2018_10Min.json";
        var Exp3Url5m="app/scripts/data/nse/futures/" + $scope.stockid +"_NSE_FUTURES_31-01-2019_5Min.json";
        var Exp3Url10m="app/scripts/data/nse/futures/" + $scope.stockid +"_NSE_FUTURES_31-01-2019_5Min.json";*/



        $('#container1').html(" ");
        $('#container2').html(" ");
        $('#container3').html(" ");
        $('#container4').html(" ");
        $('#container5').html(" ");
        $('#container6').html(" ");
        $('#container7').html(" ");
        $('#container8').html(" ");
        $('#container9').html(" ");
        $('#container10').html(" ");
        $('#container11').html(" ");
        $('#container12').html(" ");
        $('#container13').html(" ");
        $('#container14').html(" ");
        $('#container15').html(" ");
        $('#container16').html(" ");
        $('#container17').html(" ");
        $('#container18').html(" ");
        $('#container19').html(" ");
        $('#container20').html(" ");
        $('#container21').html(" ");
        $('#container22').html(" ");
        $('#container23').html(" ");
        $('#container24').html(" ");
        $("#tabs").tabs({
            active: 0
        });
        $("#tabs3").tabs({
            active: 0
        });
        $("#tabs4").tabs({
            active: 0
        });
        $("#tabs5").tabs({
            active: 0
        });
        $('.highcharts-data-table').html(" ");



        /*  $('a[href]').click(function(){

          $scope.filename=this.id;
          console.log( $scope.filename);

           var firbaseurl="https://stock-dc49f.firebaseio.com";
           var folders="/nse/futures/";
          // var filename "";
           var auth="uGibYeUL5cvO91MS9wbmOpH5kNgloVdX13fGtyBy";

          //var Exp1Url1="https://stock-dc49f.firebaseio.com/nse/futures/TCS/"+ $scope.filename+ "/" + "TCS_NSE_FUTURES_29-11-2018_5Min.json?auth=uGibYeUL5cvO91MS9wbmOpH5kNgloVdX13fGtyBy"
           //var Exp2Url1="https://stock-dc49f.firebaseio.com/nse/futures/TCS/"+ $scope.filename+ "/" + "TCS_NSE_FUTURES_27-12-2018_5Min.json?auth=uGibYeUL5cvO91MS9wbmOpH5kNgloVdX13fGtyBy"
           //var Exp3Url1="https://stock-dc49f.firebaseio.com/nse/futures/TCS/"+ $scope.filename+ "/" + "TCS_NSE_FUTURES_31-01-2019_5Min.json?auth=uGibYeUL5cvO91MS9wbmOpH5kNgloVdX13fGtyBy"



        //  var Exp1Url1 = firbaseurl + folders + $scope.stockid + "/" + $scope.filename + "/" + $scope.stockid +"_NSE_FUTURES_29-11-2018_5Min.json?auth=" + auth;
        //  var Exp2Url1=  firbaseurl + folders + $scope.stockid + "/" + $scope.filename + "/" + $scope.stockid +"_NSE_FUTURES_29-11-2018_5Min.json?auth=" + auth;
        //  var Exp3Url1=  firbaseurl + folders + $scope.stockid + "/" + $scope.filename + "/" + $scope.stockid +"_NSE_FUTURES_29-11-2018_5Min.json?auth=" + auth;
        */




        /*Future Charts 29-11-2018 /5minEXPURL1 -------------------*/

        $.getJSON(Exp1Url1m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container1', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ': EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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

                        },

                        /*{
           title: {
               text: 'Volume'
           },
           top: 300,
           height: 100,
           offset: 0,
           lineWidth: 2
       }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "1Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp1Url3m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container2', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "3Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        $.getJSON(Exp1Url5m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container3', {
                    /*selection box*/
                    tooltip: {
                        followTouchMove: true,
                        shared: true
                    },
                    xAxis: {
                        crosshair: true
                    },

                    mapNavigation: {
                        enabled: true,
                        enableButtons: false
                    },

                    rangeSelector: {
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
           title: {
               text: 'Volume'
           },
           top: 300,
           height: 100,
           offset: 0,
           lineWidth: 2
       }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "5Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        ///29-11-2018 ---///Exp1Url10m--------

        $.getJSON(Exp1Url10m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container4', {
                    /*selection box*/
                    tooltip: {
                        shared: true
                    },
                    xAxis: {
                        crosshair: true
                    },

                    mapNavigation: {
                        enabled: true,
                        enableButtons: false
                    },

                    rangeSelector: {
                        enabled: false,
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "10Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp1Url15m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container5', {
                    /*selection box*/
                    tooltip: {
                        followTouchMove: true,
                        shared: true
                    },
                    xAxis: {
                        crosshair: true
                    },
                    mapNavigation: {
                        enabled: true,
                        enableButtons: false
                    },

                    rangeSelector: {
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "15Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp1Url30m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container6', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                 title: {
                     text: 'Volume'
                 },
                 top: 300,
                 height: 100,
                 offset: 0,
                 lineWidth: 2
             }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "30Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });



        $.getJSON(Exp1Url60m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container7', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                   title: {
                       text: 'Volume'
                   },
                   top: 300,
                   height: 100,
                   offset: 0,
                   lineWidth: 2
               }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "60Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp1Url120m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container8', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title1
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                     title: {
                         text: 'Volume'
                     },
                     top: 300,
                     height: 100,
                     offset: 0,
                     lineWidth: 2
                 }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "120Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        /*Future Charts 27/12/2018 / EXPURL2 -------------------*/

        $.getJSON(Exp2Url1m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container9', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "1Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp2Url3m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container10', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "3Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        $.getJSON(Exp2Url5m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];
            // create the chart
            var chart = Highcharts.stockChart('container11', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "5Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        ///29-11-2018 ---///Exp1Url10m--------

        $.getJSON(Exp2Url10m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container12', {
                    /*selection box*/
                    tooltip: {
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
                        enabled: false,
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "10Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp2Url15m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container13', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                 title: {
                     text: 'Volume'
                 },
                 top: 300,
                 height: 100,
                 offset: 0,
                 lineWidth: 2
             }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "15Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp2Url30m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container14', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                   title: {
                       text: 'Volume'
                   },
                   top: 300,
                   height: 100,
                   offset: 0,
                   lineWidth: 2
               }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "30Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });



        $.getJSON(Exp2Url60m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'week', // unit name
                    [1] // allowed multiples
                ],
                [
                    'month',
                    [1, 2, 3, 4, 6]
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container15', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                     title: {
                         text: 'Volume'
                     },
                     top: 300,
                     height: 100,
                     offset: 0,
                     lineWidth: 2
                 }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "60Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp2Url120m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container16', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title2
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                       title: {
                           text: 'Volume'
                       },
                       top: 300,
                       height: 100,
                       offset: 0,
                       lineWidth: 2
                   }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "120Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });



        ///////31/01/2019 5min--------------------------------------------------------

        $.getJSON(Exp3Url1m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container17', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "1Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp3Url3m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];
            // create the chart
            var chart = Highcharts.stockChart('container18', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "3Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        $.getJSON(Exp3Url5m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container19', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "5Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        ///29-11-2018 ---///Exp1Url10m--------

        $.getJSON(Exp3Url10m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container20', {
                    /*selection box*/
                    tooltip: {
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
                        enabled: false,
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "10Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp3Url15m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container21', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                 title: {
                     text: 'Volume'
                 },
                 top: 300,
                 height: 100,
                 offset: 0,
                 lineWidth: 2
             }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "15Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp3Url30m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container22', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                   title: {
                       text: 'Volume'
                   },
                   top: 300,
                   height: 100,
                   offset: 0,
                   lineWidth: 2
               }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "30Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });



        $.getJSON(Exp3Url60m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container23', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                     title: {
                         text: 'Volume'
                     },
                     top: 300,
                     height: 100,
                     offset: 0,
                     lineWidth: 2
                 }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "60Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });


        $.getJSON(Exp3Url120m, function(data) {


            $scope.stockdata = data;
            console.log($scope.stockdata);


            /* var dataF = new Array();
             $.map(data, function(obj, i) {
             dataF.push([obj.fudate, parseInt(obj.trs)]);
             });
             console.log(dataF);*/


            var candleData = new Array();
            $.map(data, function(obj, i) {
                //  console.log(candleData);
                candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
            });

            console.log(candleData);



            dataC = Highcharts.map(candleData, function(config) {
                // console.log(data);
                return {
                    x: config[0], //date
                    open: config[1], //open
                    high: config[2], //high
                    low: config[3], //low
                    close: config[4], //close
                    color: config[5] //color
                };
            });
            console.log(dataC);



            var groupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ],
                [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ],
                [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ],
                [
                    'day',
                    [1]
                ],
                [
                    'week',
                    [1]
                ],
                [
                    'month',
                    [1, 3, 6]
                ],
                [
                    'year',
                    null
                ]
            ];

            // create the chart
            var chart = Highcharts.stockChart('container24', {
                    /*selection box*/
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
                        enabled: false, //range selector
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
                            }
                        ],
                        selected: 1
                    },


                    title: {
                        text: $scope.stockid + ' : EXP DATE :' + $scope.title3
                    },
                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            alignTicks: true,
                            height: 200,
                            lineWidth: 2,
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
                        }

                        /*{
                       title: {
                           text: 'Volume'
                       },
                       top: 300,
                       height: 100,
                       offset: 0,
                       lineWidth: 2
                   }*/
                    ],

                    /*charts**/
                    series: [{
                        type: 'candlestick',
                        name: "120Min", // opening value +5% value value
                        data: dataC,
                        dataGrouping: {
                            units: groupingUnits
                        }


                    }]

                },
                function(chart) {

                    // apply the date pickers
                    setTimeout(function() {
                        $('input.highcharts-range-selector').datepicker();
                    }, 0);
                });



        });




        //});//this id

        $http.get(PUrl).
        success(function(data, status, headers, config) {
            $scope.peersdata = data;
            console.log($scope.peersdata);
        }).
        error(function(data, status, headers, config) {
            // log error
        });




    }; //end of prepareChart dunction




    /*$(document).on('keydown', function(e){
        if(e.keyCode === 13){
        $('#container2').html(" ");
         $('#container7').html(" ");
        $('#container8').html(" ");
         $('#container9').html(" ");
        $('#container10').html(" ");
         $('#container11').html(" ");
        $('#container12').html(" ");
        $( "#tabs" ).tabs({ active: 0});
        $( "#tabs3" ).tabs({ active: 0});
          //$('#chart').reload();
        }
        //$('#chart').location.reload();
    });*/


    /*popup function*/

    $(function() {

        var appendthis = ("<div class='modal-overlay js-modal-close'></div>");

        $('a[data-modal-id]').click(function(e) {
            e.preventDefault();
            $("body").append(appendthis);
            $(".modal-overlay").fadeTo(500, 0.7);
            //$(".js-modalbox").fadeIn(500);
            var modalBox = $(this).attr('data-modal-id');
            $('#' + modalBox).fadeIn($(this).data());
        });


        $(".js-modal-close, .modal-overlay").click(function() {
            $(".modal-box, .modal-overlay").fadeOut(500, function() {
                $(".modal-overlay").remove();
            });
        });

        $(window).resize(function() {
            $(".modal-box").css({
                top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
                left: ($(window).width() - $(".modal-box").outerWidth()) / 2
            });
        });

        $(window).resize();

    }); //end of popup function



    /*default static chats-------------------------------------------------------------------------------------------------*/


    //var Url1 ="app/scripts/data/nse/" +"ACC" +".json";
    $scope.DefaultTitle = "ACC";
    var PUrl1 = "app/scripts/data/nse/peers/" + "ACC" + ".json";

    var Exp1Url1m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_1Min.json";
    var Exp1Url3m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_3Min.json";
    var Exp1Url5m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_5Min.json";
    var Exp1Url10m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_10Min.json";
    var Exp1Url15m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_15Min.json";
    var Exp1Url30m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_30Min.json";
    var Exp1Url60m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_60Min.json";
    var Exp1Url120m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_120Min.json";
    var Exp1Url240m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title1 + "_240Min.json";



    var Exp2Url1m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_1Min.json";
    var Exp2Url3m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_3Min.json";
    var Exp2Url5m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_5Min.json";
    var Exp2Url10m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_10Min.json";
    var Exp2Url15m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_15Min.json";
    var Exp2Url30m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_30Min.json";
    var Exp2Url60m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_60Min.json";
    var Exp2Url120m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_120Min.json";
    var Exp2Url240m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title2 + "_240Min.json";


    var Exp3Url1m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_1Min.json";
    var Exp3Url3m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_3Min.json";
    var Exp3Url5m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_5Min.json";
    var Exp3Url10m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_10Min.json";
    var Exp3Url15m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_15Min.json";
    var Exp3Url30m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_30Min.json";
    var Exp3Url60m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_60Min.json";
    var Exp3Url120m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_120Min.json";
    var Exp3Url240m = "app/scripts/data/nse/futures/" + "ACC" + "_NSE_FUTURES_" + $scope.title3 + "_240Min.json";




    /*Future Charts 29-11-2018 /5minEXPURL1 -------------------*/

    $.getJSON(Exp1Url1m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];




        // create the chart
        var chart = Highcharts.stockChart('container1', {
                /*selection box*/

                tooltip: {
                    valueDecimals: 2,
                    //  followTouchMove:true,
                    shared: true
                },

                xAxis: {
                    crosshair: true,

                },

                /*plotOptions: {
                 candlestick: {
                            color: 'green',
                            upColor: 'red'
                        }
                    },*/

                mapNavigation: {
                    enabled: true,
                    enableButtons: false
                },


                rangeSelector: {

                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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

                    },

                    /*{
           title: {
               text: 'Volume'
           },
           top: 300,
           height: 100,
           offset: 0,
           lineWidth: 2
       }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "1Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    },



                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp1Url3m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container2', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "3Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    $.getJSON(Exp1Url5m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container3', {
                /*selection box*/
                tooltip: {
                    followTouchMove: true,
                    shared: true
                },
                xAxis: {
                    crosshair: true
                },

                mapNavigation: {
                    enabled: true,
                    enableButtons: false
                },

                rangeSelector: {
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
           title: {
               text: 'Volume'
           },
           top: 300,
           height: 100,
           offset: 0,
           lineWidth: 2
       }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "5Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    ///29-11-2018 ---///Exp1Url10m--------

    $.getJSON(Exp1Url10m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container4', {
                /*selection box*/
                tooltip: {
                    shared: true
                },
                xAxis: {
                    crosshair: true
                },

                mapNavigation: {
                    enabled: true,
                    enableButtons: false
                },

                rangeSelector: {
                    enabled: false,
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "10Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp1Url15m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container5', {
                /*selection box*/
                tooltip: {
                    followTouchMove: true,
                    shared: true
                },
                xAxis: {
                    crosshair: true
                },

                mapNavigation: {
                    enabled: true,
                    enableButtons: false
                },

                rangeSelector: {
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "15Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp1Url30m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container6', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                 title: {
                     text: 'Volume'
                 },
                 top: 300,
                 height: 100,
                 offset: 0,
                 lineWidth: 2
             }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "30Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });



    $.getJSON(Exp1Url60m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container7', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                   title: {
                       text: 'Volume'
                   },
                   top: 300,
                   height: 100,
                   offset: 0,
                   lineWidth: 2
               }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "60Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp1Url120m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container8', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title1
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                     title: {
                         text: 'Volume'
                     },
                     top: 300,
                     height: 100,
                     offset: 0,
                     lineWidth: 2
                 }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "120Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    /*Future Charts 27/12/2018 / EXPURL2 -------------------*/

    $.getJSON(Exp2Url1m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container9', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "1Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp2Url3m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container10', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "3Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    $.getJSON(Exp2Url5m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];
        // create the chart
        var chart = Highcharts.stockChart('container11', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "5Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    ///29-11-2018 ---///Exp1Url10m--------

    $.getJSON(Exp2Url10m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container12', {
                /*selection box*/
                tooltip: {
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
                    enabled: false,
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "10Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp2Url15m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container13', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                 title: {
                     text: 'Volume'
                 },
                 top: 300,
                 height: 100,
                 offset: 0,
                 lineWidth: 2
             }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "15Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp2Url30m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container14', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                   title: {
                       text: 'Volume'
                   },
                   top: 300,
                   height: 100,
                   offset: 0,
                   lineWidth: 2
               }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "30Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });



    $.getJSON(Exp2Url60m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'week', // unit name
                [1] // allowed multiples
            ],
            [
                'month',
                [1, 2, 3, 4, 6]
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container15', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                     title: {
                         text: 'Volume'
                     },
                     top: 300,
                     height: 100,
                     offset: 0,
                     lineWidth: 2
                 }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "60Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp2Url120m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container16', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        }
                    ],
                    selected: 1
                },


                title: {
                    text: $scope.DefaultTitle + ': EXP DATE :' + $scope.title2
                },
                legend: {
                    enabled: true
                },

                yAxis: [{
                        title: {
                            text: 'OHLC'
                        },
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                       title: {
                           text: 'Volume'
                       },
                       top: 300,
                       height: 100,
                       offset: 0,
                       lineWidth: 2
                   }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "120Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });



    ///////31/01/2019 5min--------------------------------------------------------

    $.getJSON(Exp3Url1m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container17', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "1Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp3Url3m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];
        // create the chart
        var chart = Highcharts.stockChart('container18', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "3Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    $.getJSON(Exp3Url5m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container19', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
             title: {
                 text: 'Volume'
             },
             top: 300,
             height: 100,
             offset: 0,
             lineWidth: 2
         }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "5Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    ///29-11-2018 ---///Exp1Url10m--------

    $.getJSON(Exp3Url10m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container20', {
                /*selection box*/
                tooltip: {
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
                    enabled: false,
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
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
               title: {
                   text: 'Volume'
               },
               top: 300,
               height: 100,
               offset: 0,
               lineWidth: 2
           }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "10Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp3Url15m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container21', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                 title: {
                     text: 'Volume'
                 },
                 top: 300,
                 height: 100,
                 offset: 0,
                 lineWidth: 2
             }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "15Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp3Url30m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container22', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                   title: {
                       text: 'Volume'
                   },
                   top: 300,
                   height: 100,
                   offset: 0,
                   lineWidth: 2
               }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "30Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });



    $.getJSON(Exp3Url60m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container23', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                     title: {
                         text: 'Volume'
                     },
                     top: 300,
                     height: 100,
                     offset: 0,
                     lineWidth: 2
                 }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "60Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });


    $.getJSON(Exp3Url120m, function(data) {


        $scope.stockdata = data;
        console.log($scope.stockdata);


        /* var dataF = new Array();
         $.map(data, function(obj, i) {
         dataF.push([obj.fudate, parseInt(obj.trs)]);
         });
         console.log(dataF);*/


        var candleData = new Array();
        $.map(data, function(obj, i) {
            //  console.log(candleData);
            candleData.push([obj.x, parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close), (obj.color)]);
        });

        console.log(candleData);



        dataC = Highcharts.map(candleData, function(config) {
            // console.log(data);
            return {
                x: config[0], //date
                open: config[1], //open
                high: config[2], //high
                low: config[3], //low
                close: config[4], //close
                color: config[5] //color
            };
        });
        console.log(dataC);



        var groupingUnits = [
            [
                'millisecond', // unit name
                [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
            ],
            [
                'second',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'minute',
                [1, 2, 5, 10, 15, 30]
            ],
            [
                'hour',
                [1, 2, 3, 4, 6, 8, 12]
            ],
            [
                'day',
                [1]
            ],
            [
                'week',
                [1]
            ],
            [
                'month',
                [1, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        // create the chart
        var chart = Highcharts.stockChart('container24', {
                /*selection box*/
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
                    enabled: false, //range selector
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
                        alignTicks: true,
                        height: 200,
                        lineWidth: 2,
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
                    }

                    /*{
                       title: {
                           text: 'Volume'
                       },
                       top: 300,
                       height: 100,
                       offset: 0,
                       lineWidth: 2
                   }*/
                ],

                /*charts**/
                series: [{
                    type: 'candlestick',
                    name: "120Min", // opening value +5% value value
                    data: dataC,
                    dataGrouping: {
                        units: groupingUnits
                    }


                }]

            },
            function(chart) {

                // apply the date pickers
                setTimeout(function() {
                    $('input.highcharts-range-selector').datepicker();
                }, 0);
            });



    });




    //});//this id

    $http.get(PUrl1).
    success(function(data, status, headers, config) {
        $scope.peersdata = data;
        console.log($scope.peersdata);
    }).
    error(function(data, status, headers, config) {
        // log error
    });




    //5min//////




});
