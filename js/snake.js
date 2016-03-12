$(document).ready(function(){
    //Canvas stuff
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    w = $("#canvas").width();
    h = $("#canvas").height();
    
    //Lets save the cell width in a variable for easy control
    var cw = 16;    
    var direction; // default;
    var food;
    var score;
    
    //Lets create the snake now
    var snake_array; //an array of cells to make up the snake
    function init()
    {
        direction = "right"; //default direction
        create_snake();
        create_food(); //Now we can see the food particle
        //finally lets display the score
        score = 0;
        
        //Lets move the snake now using a timer which will trigger the paint function
        //every 60ms
        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, 60);
    }
    init();
    
    function create_snake()
    {
        var length = 5; //Length of the snake
        snake_array = []; //Empty array to start with
        for(var i = length-1; i>=0; i--)
        {
            //This will create a horizontal snake starting from the top left
            snake_array.push({x: i, y:0});
        }
    }
    
    //Lets create the food now
    function create_food()
    {
        food = {
            x: Math.round(Math.random()*(w-cw)/cw), 
            y: Math.round(Math.random()*(h-cw)/cw), 
            time: Math.floor(new Date().getTime()/1000),
            interval: Math.floor((Math.random() * 10) + 4)
        };
        //This will create a cell with x/y between 0-44
        //Because there are 45(450/10) positions accross the rows and columns
    }
    
    //Lets paint the snake now
    function paint()
    {
        //To avoid the snake trail we need to paint the BG on every frame
        //Lets paint the canvas now
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);
        
        //The movement code for the snake to come here.
        //The logic is simple
        //Pop out the tail cell and place it infront of the head cell
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        //These were the position of the head cell.
        //We will increment it to get the new head position
        //Lets add proper direction based movement now
        if(direction == "right") nx++;
        else if(direction == "left") nx--;
        else if(direction == "up") ny--;
        else if(direction == "down") ny++;
        //Lets add the game over clauses now
        //This will restart the game if the snake hits the wall
        //Lets add the code for body collision
        //Now if the head of the snake bumps into its body, the game will restart
        if(nx == -1 || nx >= w/cw || ny == -1 || ny >= h/cw)
        {
            //restart game
            //init();
            //Lets organize the code a bit now.
            snake_array.reverse();
        var i=0;
        var xchange = false;
        var ychange = false;
        
        //paints head
        for(i=1;i<snake_array.length;i++){
            //paints body
            var c=snake_array[i];
            if(snake_array[i].x<snake_array[i-1].x){
                direction="right";
                
            }
            else if(snake_array[i].x>snake_array[i-1].x){
                direction="left";
                xchange = true;
                
            }
            else if(snake_array[i].y>snake_array[i-1].y){
                direction="up";
                ychange = true;
                
            }
            else if(snake_array[i].y<snake_array[i-1].y){
                direction="down";
                
            }
        }
        if (xchange) {
        	adjustx();
        	$("#canvas")[0].width = w-113;
        	w = w-113;
        }
        
        if (ychange) {
            adjusty();
        	$("#canvas")[0].height = h-113;
        	h= h-113;
        }
        
        
         
            return;
        }
        if(check_collision(nx, ny, snake_array)){
            init();
            return;
        }
        
        
        //Lets write the code to make the snake eat the food
        //The logic is simple
        //If the new head position matches with that of the food,
        //Create a new head instead of moving the tail
        if(nx == food.x && ny == food.y)
        {
            var tail = {x: nx, y: ny};
            score++;
            //Create new food
            create_food();
        }
        else
        {
            var tail = snake_array.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }
        //The snake can now eat the food.
        
        snake_array.unshift(tail); //puts back the tail as the first cell
        
        for(var i = 0; i < snake_array.length; i++)
        {
            var c = snake_array[i];
            //Lets paint 10px wide cells
            paint_cell(c.x, c.y);
        }
        
        var currentTime = Math.floor(new Date().getTime()/1000);
        if (currentTime > food.time + food.interval) {
        	create_food();
        }
        
        //Lets paint the food
        paint_cell(food.x, food.y);
        //Lets paint the score
        var score_text = "Score: " + score;
        ctx.fillText(score_text, w-50, 15);
    }
    
    function adjustx() {
        var factor = Math.floor(113/cw);
    	for(i=0;i<snake_array.length;i++) {
    	
    		snake_array[i].x = snake_array[i].x - factor;
    	}
    
    }
    
    function adjusty() {
        var factor = Math.floor(113/cw);
    	for(i=0;i<snake_array.length;i++) {
    	
    		snake_array[i].y = snake_array[i].y - factor;
    	}
    
    }
    
    //Lets first create a generic function to paint cells
    function paint_cell(x, y)
    {
        ctx.fillStyle = "blue";
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*cw, y*cw, cw, cw);
    }
    
    function check_collision(x, y, array)
    {
        //This function will check if the provided x/y coordinates exist
        //in an array of cells or not
        for(var i = 0; i < array.length; i++)
        {
            if(array[i].x == x && array[i].y == y)
             return true;
        }
        return false;
    }
    
    //Lets add the keyboard controls now
    $(document).keydown(function(e){
        var key = e.which;
        //We will add another clause to prevent reverse gear
        if(key == "37" && direction != "right") direction = "left";
        else if(key == "38" && direction != "down") direction = "up";
        else if(key == "39" && direction != "left") direction = "right";
        else if(key == "40" && direction != "up") direction = "down";
        //The snake is now keyboard controllable
    })
    
})