
 app.controller('nseController',function($scope,$http,$filter,$window,){

  /*combo box value*/
 $scope.values = ['1.5','2','2.5','3','3.5','4','4.5','5'];
 $scope.selectedNumber = $scope.values[0];
 $scope.nseStocks = nsestock.stockdetails;

/*bt detoils*/

// var btUrl="app/scripts/data/nse/trend/bt.json";
 var otUrl="app/scripts/data/nse/trend/ot.json";
 var stUrl="app/scripts/data/nse/trend/st.json";

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

  $scope.fetchStockDetails = function ($item, $model, $label, $event){
  $scope.StockName = $item.name;
  $scope.Stock_Code= $item.code;
  $scope.prepareChart($item.code,$item.name);
  //console.log($item.code);
  };


/*PREPARE CHARTS-----------------------------*/

  $scope.prepareChart = function(stockid) {
//console.log(data);
 //$(function() {

   $scope.stockid = stockid;
   console.log($scope.stockid);

   var Url ="app/scripts/data/nse/" + $scope.stockid +".json";
   var FuUrl ="app/scripts/data/nse/futures/" + $scope.stockid +"_fu.json";
   var PUrl ="app/scripts/data/nse/peers/" + $scope.stockid +".json";


  $.getJSON(Url, function (data) {
   $scope.stockdata=data;
   console.log( $scope.stockdata);
  /* var dataF = new Array();
   $.map(data, function(obj, i) {
   dataF.push([obj.fudate, parseInt(obj.trs)]);
   });
   console.log(dataF);*/

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
    console.log(dataC);

     var groupingUnits = [[
       'week',                         // unit name
       [1]                             // allowed multiples
     ], [
       'month',
       [1, 2, 3, 4, 6]
     ]];

     // create the chart
     var chart = Highcharts.stockChart('container2', {
        /*selection box*/
        tooltip: {
   shared:true
},

        rangeSelector: {
           inputEnabled:false,
             buttons: [
               {
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

 } ,
 function (chart) {

            // apply the date pickers
            setTimeout(function () {
                $('input.highcharts-range-selector').datepicker();
            }, 0);
        });



   $('#demo').columns({   /*popup view table view data*/
     data: data

   }); /*end popup*/


 });



 /*----------------------futurechart---*/

 $.getJSON(FuUrl, function (data) {

   $scope.stockdata=data;
  console.log( $scope.stockdata);


 /* var dataF = new Array();
  $.map(data, function(obj, i) {
  dataF.push([obj.fudate, parseInt(obj.trs)]);
  });
  console.log(dataF);*/
 if (data==1) {

   var dataF= new Array();
   $.map(data, function(obj, i) {
   dataF.push([obj.date, parseInt(obj.ltp),parseInt(obj.vol)]);
   });
  console.log(dataF);

  var dataV= new Array();
  $.map(data, function(obj, i) {
  dataV.push([obj.date,parseInt(obj.vol)]);
  });
 console.log(dataV);


    var groupingUnits = [[
      'week',                         // unit name
      [1]                             // allowed multiples
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]];

    // create the chart

     Highcharts.stockChart('container3', {
       /*selection box*/
       rangeSelector: {

         buttons: [{
                   type: 'hour',
                   count: 1,
                   text: '1h'
               },{
                   type: 'minute',
                   count: 15,
                   text: '15m'
               },
               {
                   type: 'day',
                   count: 1,
                   text: '1D'
               }, {
                   type: 'all',
                   count: 1,
                   text: 'All'
               }],
               selected: 1,
               inputEnabled:false
           },

           xAxis: {
       type: 'datetime',

   },


          yAxis: [{
              title: {
                  text: 'value'
              },
              height: 200,
              lineWidth: 2
          },

           {
              title: {
                  text: 'Volume'
              },
              top: 300,
              height: 100,
              offset: 0,
              lineWidth: 2
          }],
          /*title: {
              text: 'STOCK PRICE'
          },*/
            /*   legend: {
                       enabled: true
                   },
     /*charts**/
          series: [
       {
            type: 'spline',
            name: "minute",// opening value +5% value value
            data: dataF,
            threshold: 1,
               valueDecimals: 0


          },

 {
              type: 'column',
              name: 'Volume',
              data: dataV,
              yAxis: 1


        }]

} ,
function (chart) {

           // apply the date pickers
           setTimeout(function () {
               $('input.highcharts-range-selector').datepicker();
           }, 0);
       });

     }else {

         }

   });


   /*$.getJSON(PUrl, function (data) {
     console.log(data);
      $scope.peersdata= data;*/

  $http.get(PUrl).
    success(function(data, status, headers, config) {
      $scope.peersdata = data;
      console.log($scope.peersdata);
    }).
    error(function(data, status, headers, config) {
      // log error
    });





//});






//});
};//end of prepareChart dunction





/*popup function*/

$(function(){

var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

  $('a[data-modal-id]').click(function(e) {
    e.preventDefault();
    $("body").append(appendthis);
    $(".modal-overlay").fadeTo(500, 0.7);
    //$(".js-modalbox").fadeIn(500);
    var modalBox = $(this).attr('data-modal-id');
    $('#'+modalBox).fadeIn($(this).data());
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


  // console.log($scope.table1);

/*$scope.createTable = function(data) {

  var stockid = data;
  var Url ="app/scripts/data/" + stockid +".json";


  $.getJSON(Url, function (data) {

    console.log(data);

    var jsondata=data;

    $('#demo').columns({
    data: jsondata
  });

  });


};

/*$scope.createTable = function(data) {
//console.log(data);
//$(function() {

 var stockid = data;
 //console.log(stockid);
 var Url ="app/scripts/data/" + stockid +".json";


 $.getJSON(Url, function (data) {

   console.log(data);


        var listdata = data;


        var col = [];
        for (var i = 0; i < listdata.length; i++) {
            for (var key in  listdata[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i <  listdata.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML =  listdata[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);



});
};*/

/*default static chats-------------------------------------------------------------------------------------------------*/


   var Url1 ="app/scripts/data/nse/" + "ACC" +".json";
   var FuUrl1="app/scripts/data/nse/futures/" + "ACC" +"_fu.json";
   var PUrl1 ="app/scripts/data/nse/peers/" + "ACC" +".json";


  $.getJSON(Url1, function (data) {


   $scope.stockdata=data;
   console.log( $scope.stockdata);

  /* var dataF = new Array();
   $.map(data, function(obj, i) {
   dataF.push([obj.fudate, parseInt(obj.trs)]);
   });
   console.log(dataF);*/


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
    console.log(dataC);

     var groupingUnits = [[
       'week',                         // unit name
       [1]                             // allowed multiples
     ], [
       'month',
       [1, 2, 3, 4, 6]
     ]];

     // create the chart
     var chart = Highcharts.stockChart('container2', {
        /*selection box*/
        tooltip: {
   shared:true
},

        rangeSelector: {
           inputEnabled:false,
             buttons: [
               {
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
             }],
               selected: 3
           },


           title: {
               text: 'ACC',
                 align: 'left',
               style: {
           color: 'green',
           fontWeight: 'bold'
       }
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
               data:dataC,
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

 } ,
 function (chart) {

            // apply the date pickers
            setTimeout(function () {
                $('input.highcharts-range-selector').datepicker();
            }, 0);
        });

 });



 /*----------------------futurechart---*/

 $.getJSON(FuUrl1, function (data) {


  $scope.stockdata=data;
  console.log( $scope.stockdata);


 /* var dataF = new Array();
  $.map(data, function(obj, i) {
  dataF.push([obj.fudate, parseInt(obj.trs)]);
  });
  console.log(dataF);*/


   var dataF= new Array();
   $.map(data, function(obj, i) {
   dataF.push([obj.date, parseInt(obj.ltp),parseInt(obj.vol)]);
   });
  console.log(dataF);

  var dataV= new Array();
  $.map(data, function(obj, i) {
  dataV.push([obj.date,parseInt(obj.vol)]);
  });
 console.log(dataV);


    var groupingUnits = [[
      'week',                         // unit name
      [1]                             // allowed multiples
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]];

    // create the chart

     Highcharts.stockChart('container3', {
       /*selection box*/
       rangeSelector: {

         buttons: [{
                   type: 'hour',
                   count: 1,
                   text: '1h'
               },{
                   type: 'minute',
                   count: 15,
                   text: '15m'
               },
               {
                   type: 'day',
                   count: 1,
                   text: '1D'
               }, {
                   type: 'all',
                   count: 1,
                   text: 'All'
               }],
               selected: 1,
               inputEnabled:false
           },

           xAxis: {
       type: 'datetime',

   },


          yAxis: [{
              title: {
                  text: 'value'
              },
              height: 200,
              lineWidth: 2
          },

           {
              title: {
                  text: 'Volume'
              },
              top: 300,
              height: 100,
              offset: 0,
              lineWidth: 2
          }],
          /*title: {
              text: 'STOCK PRICE'
          },*/
            /*   legend: {
                       enabled: true
                   },
     /*charts**/
          series: [
       {
            type: 'spline',
            name: "minute",// opening value +5% value value
            data: dataF,
            threshold: 1,
               valueDecimals: 0


          },

 {
              type: 'column',
              name: 'Volume',
              data: dataV,
              yAxis: 1


        }]

} ,
function (chart) {

           // apply the date pickers
           setTimeout(function () {
               $('input.highcharts-range-selector').datepicker();
           }, 0);
       });

   });

   $http.get(PUrl1).
     success(function(data, status, headers, config) {
       $scope.peersdata = data;
       console.log($scope.peersdata);
     }).
     error(function(data, status, headers, config) {
       // log error
     });

/*   $.getJSON(PUrl1, function (data) {
     console.log(data);
      $scope.peersdata=data;
});*/



});
