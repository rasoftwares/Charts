

app.filter('offset', function()  {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});




 app.controller('candleController', function($scope,$http,$filter,$window){

  /*combo box value*/
 $scope.values = ['1.5','2','2.5','3','3.5','4','4.5','5'];
 $scope.selectedNumber = $scope.values[0];
 /*$scope.add=function(){
 var nums=$scope.numbers.length+1;
 $scope.numbers.push(nums++);
}*/ //end combo box


   $scope.Stocks = stock.stockdetails;

   $scope.Stockdata="";

   var Url ="https://stocks-3dbe3.firebaseio.com/BT.json?auth=9gDeqqQCfu4iZ2ZKQtvAt3ZSdDlXZmRful3R17Jm";

    $.get(Url, function (data) {

    $scope.Stockdata = data;
    //console.log($scope.Stocks);

  //   console.log(data);
    // $scope.Stocks = data;
    console.log($scope.Stockdata);

 //$scope.table;
  /*start pagination*/

   $scope.itemsPerPage = 2;
   $scope.currentPage = 0;
   $scope.items = $scope.Stockdata;

   $scope.range = function() {
     var rangeSize = 1;
     var ret = [];
     var start;

     start = $scope.currentPage;
     if ( start > $scope.pageCount()-rangeSize ) {
       start = $scope.pageCount()-rangeSize+1;
     }

     for (var i=start; i<start+rangeSize; i++) {
       ret.push(i);
     }
     return ret;
    };

   $scope.prevPage = function() {
     if ($scope.currentPage > 0) {
       $scope.currentPage--;
     }
   };

   $scope.prevPageDisabled = function() {
     return $scope.currentPage === 0 ? "disabled" : "";
   };

   $scope.pageCount = function() {
     return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
   };

   $scope.nextPage = function() {
     if ($scope.currentPage < $scope.pageCount()) {
       $scope.currentPage++;
     }
   };

   $scope.nextPageDisabled = function() {
     return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
   };

   $scope.setPage = function(n) {
     $scope.currentPage = n;
   };/*end of pagination*/

});

 /*fetchStockDetails*/

  $scope.fetchStockDetails = function ($item, $model, $label, $event){
  $scope.StockName = $item.name;
  $scope.Stock_Code= $item.code;
  $scope.prepareChart($item.code);
  //console.log($item.code);
  };




  $scope.prepareChart = function(stockid) {
//console.log(data);
 //$(function() {
  $scope.stockid = stockid;
  console.log($scope.stockid);

  var Url ="app/scripts/data/" + $scope.stockid +".json";


  $.getJSON(Url, function (data) {


   $scope.stockdata=data;
   console.log( $scope.stockdata);



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

 } ,
 function (chart) {

            // apply the date pickers
            setTimeout(function () {
                $('input.highcharts-range-selector').datepicker();
            }, 0);
        });
//);



   $('#demo').columns({   /*popup view */
     data: data
   }); /*end popup*/


 });




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

});
