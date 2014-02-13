$(function(){
  //Params
  var minefield_width = 30;//in cells
  var minefield_height = 16;//in cells
  
  var num_of_mines = 99;
  //End Params
  
  //Global Reference to minefield div
  minefield = $("div#minefield");
  
  //Calculated Params
  var cell_width = minefield.innerWidth() / minefield_width;
  var cell_height = minefield.innerHeight() / minefield_height;
  //End Calculated Params
  $("<style>.number{font-size: " + .8 * cell_height + "px;} .cell{width:" + (cell_width - 1) + ";height:" + (cell_height - 1) + ";}</style>").appendTo($("html > head"));
  
  minefield.createCell = function(x,y)
  {
    var cell = $("<div></div>");
    cell.addClass("cell uninitialized hidden")
      .css({
        "left":x,
        "top":y
      })
      .appendTo(minefield);
    return cell;
  }
  
  for(var i=0;i<minefield_width;i+=1)
  {
    for(var j=0;j<minefield_height;j+=1)
    {
      var cell = minefield.createCell(i*cell_width,j*cell_height);
      cell.attr({
        "data-x":i,
        "data-y":j
      });
    }
  }
  
  //Compensate for border.
  var cell = $("div.cell");
  cell_width -= cell.outerWidth() - cell_width;
  cell_height -= cell.outerHeight() - cell_height;
  $("<style>.hidden{width:" + cell_width + ";height:" + cell_height + ";}</style>").appendTo($("html > head"));
  
  addMine = function()
  {
    var cells = minefield.children(".cell:not(.revealed):not(.mine)");
    var index = Math.floor(cells.length * Math.random());
    $(cells[index]).addClass("mine");
  }
  
  initMinefield = function(){
    minefield.children(".uninitialized").removeClass("uninitialized");
    var i = 0;
    while(i < num_of_mines)
    {
      addMine();
      i+=1;
    }
  }
  
  revealCell = function(cell){
    cell.removeClass("hidden").addClass("revealed");
  }
  
  calculateCellNumber = function(cell){
    var x = cell.attr("data-x");
    var y = cell.attr("data-y");
    var query = "[data-x="+(x-1)+"][data-y="+(y-1)+"].mine," +
                "[data-x="+x+"][data-y="+(y-1)+"].mine," +
                "[data-x="+(x*1+1)+"][data-y="+(y-1)+"].mine," +
                "[data-x="+(x-1)+"][data-y="+y+"].mine," +
                "[data-x="+(x*1+1)+"][data-y="+y+"].mine," +
                "[data-x="+(x-1)+"][data-y="+(y*1+1)+"].mine," +
                "[data-x="+x+"][data-y="+(y*1+1)+"].mine," +
                "[data-x="+(x*1+1)+"][data-y="+(y*1+1)+"].mine";
    neighbors = $(query);
    if(neighbors.length > 0)
    {
      cell.text(neighbors.length);
      cell.addClass("number n"+neighbors.length);
    }
    else
    {
      var query = "[data-x="+(x-1)+"][data-y="+(y-1)+"]:not(.revealed)," +
                  "[data-x="+x+"][data-y="+(y-1)+"]:not(.revealed)," +
                  "[data-x="+(x*1+1)+"][data-y="+(y-1)+"]:not(.revealed)," +
                  "[data-x="+(x-1)+"][data-y="+y+"]:not(.revealed)," +
                  "[data-x="+(x*1+1)+"][data-y="+y+"]:not(.revealed)," +
                  "[data-x="+(x-1)+"][data-y="+(y*1+1)+"]:not(.revealed)," +
                  "[data-x="+x+"][data-y="+(y*1+1)+"]:not(.revealed)," +
                  "[data-x="+(x*1+1)+"][data-y="+(y*1+1)+"]:not(.revealed)";
      neighbors = $(query);
      neighbors.each(function(){
        revealCell($(this));
        calculateCellNumber($(this));
      });
    }
  }
  
  minefield.on("click",".uninitialized",function(){
    revealCell($(this));
    initMinefield();
    calculateCellNumber($(this));
  });
  
  minefield.on("click",".hidden:not(.mine)",function(){
    revealCell($(this));
    calculateCellNumber($(this));
  });
  
  minefield.on("click",".hidden.mine",function(){
    revealCell($(this));
  });
});