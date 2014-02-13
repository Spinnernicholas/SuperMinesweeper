$(function(){
  //Params
  var minefield_width = 10;//in cells
  var minefield_height = 10;//in cells
  
  var num_of_mines = 15;
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
  
  _data = []
  for(var i=0;i<minefield_width;i+=1)
  {
    _data[i] = [];
    for(var j=0;j<minefield_height;j+=1)
    {
      var cell = minefield.createCell(i*cell_width,j*cell_height);
      _data[i][j] = cell.attr({
        "data-x":i,
        "data-y":j
      });
    }
  }
  
  getNeighbors = function(cell)
  {
    var x = cell.attr("data-x");
    var y = cell.attr("data-y");
    
    var cells = $('');
    
    for(var i=Math.max(x-1,0);i<Math.min(x*1+2,minefield_width);i+=1)
    {
      for(var j=Math.max(y-1,0);j<Math.min(y*1+2,minefield_height);j+=1)
      {
        if(i == x && j == y)
        {
          continue;
        }
        cells = cells.add(_data[i][j]);
      }
    }
    
    return cells;
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
    var neighbors = getNeighbors(cell);
    var mines = neighbors.filter(".mine");
    if(mines.length > 0)
    {
      cell.text(mines.length);
      cell.addClass("number n"+mines.length);
    }
    else
    {
      neighbors.filter(".hidden").each(function(){
        $(this).click();
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