$(function(){
  //Params
  var minefield_width = 10;//in cells
  var minefield_height = 10;//in cells
  
  var cell_width = 25;
  var cell_height = 25;
  
  var num_of_mines = 15;
  //End Params
  
  var player_control = true;
  var gameover = false;
  
  //Global Reference to minefield div
  minefield = $("div#minefield");
  
  /*
  ------------------------------
  ---- MineField Operations ----
  ------------------------------
  */
  
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
  };
  
  addMine = function(){
    var cells = minefield.children(".cell.uninitialized");
    var index = Math.floor(cells.length * Math.random());
    $(cells[index]).removeClass("uninitialized").addClass("mine");
  };
  
  initMinefield = function(){
    //Create Jagged Array to Store Cell Jquery Object
    _data = [];
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
    };
  };
  
  spawnMines = function()
  {
    for(var i=0;i < num_of_mines;i+=1)
    {
      addMine();
    }
    minefield.children(".uninitialized").removeClass("uninitialized");
  };
  
  resetMinefield = function(){
    for(var i = 0;i < _data.length; i++)
    {
      for(var j = 0;j < _data[i].length; j++)
      {
        _data[i][j].text("").removeClass().addClass("cell hidden uninitialized");
      }
    }
  };
  
  revealMinefield = function(){
    for(var i = 0;i < _data.length; i++)
    {
      for(var j = 0;j < _data[i].length; j++)
      {
        _data[i][j].text("").addClass("revealed");
      }
    }
  }
  
  /*
  -------------------------
  ---- Cell Operations ----
  -------------------------
  */
  
  revealCell = function(cell){
    cell.removeClass("hidden").addClass("revealed");
  };
  
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
      neighbors.filter(".hidden").click();
    }
  };
  
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
  };
  
  /*
  ----------------------
  ---- Mine Counter ----
  ----------------------
  */
  initMineCounter = function()
  {
    $("#minecounter").text(num_of_mines);
  }
  
  updateMineCounter = function()
  {
    $("#minecounter").text(num_of_mines - minefield.children(".flagged").length);
  }
  
  /*
  ---------------
  ---- Timer ----
  ---------------
  */
  
  

  /*
  -------------------------
  ---- Gameface Button ----
  -------------------------
  */
  
  $("#gameface").on("click",function(){
    if(gameover)
    {
      Reset();
    }
  });
  
  /*
  --------------------
  ---- Game State ----
  --------------------
  */
  
  Start = function()
  { 
    initMineCounter();
    initMinefield();
  };
  
  Gameover = function()
  {
    $("#gameface").addClass("gameover");
    revealMinefield();
    gameover = true;
    player_control = false;
  };
  
  Reset = function()
  {
    initMineCounter();
    resetMinefield();
    gameover = false;
    player_control = true;
    $("#gameface").removeClass("gameover");
  };
  
  /*
  ---------------------------------
  ---- Minefield Event Handlers----
  ---------------------------------
  */
  
  //This allows us to disable player controls.
  minefield.on("click",".cell",function(event){
    if(!player_control)
    {
      event.stopImmediatePropagation();
    }
  });
  
  minefield.on("contextmenu",".cell",function(event){
    if(!player_control)
    {
      event.stopImmediatePropagation();
      return false;
    }
  });
  
  //Disable Right Click, replace with flagging.
  minefield.on("contextmenu", function(e)
  {
    return false;
  });
  
  minefield.on("contextmenu", ".hidden:not(.flagged)", function(e)
  {
    $(this).addClass("flagged");
    updateMineCounter();
    //return false;
  });
  
  minefield.on("contextmenu", ".hidden.flagged", function(e)
  {
    $(this).removeClass("flagged");
    updateMineCounter();
    return false;
  });
  
  minefield.on("click",".uninitialized",function(){
    $(this).removeClass("uninitialized");
    getNeighbors($(this)).removeClass("uninitialized");
    spawnMines();
    $(this).click();
  });
  
  minefield.on("click",".hidden:not(.uninitialized):not(.flagged)",function(e){
    revealCell($(this));
    if(!$(this).hasClass("mine"))
    {
      calculateCellNumber($(this));
    }
    else
    {
      Gameover();
    }
  });
  
  minefield.on("click",".revealed.number",function(){
    var neighbors = getNeighbors($(this));
    var mines = neighbors.filter(".mine");
    var flags = neighbors.filter(".flagged");
    if(flags.length >= mines.length)
    {
      neighbors.filter(".hidden:not(.flagged)").click();
    }
  });//*/
  
  /*
  --------------------
  ---- Start Game ----
  --------------------
  */
  
  Start();
});