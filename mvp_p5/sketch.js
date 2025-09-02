let grid = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,3],
  [1,0,0,0,0,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,1,1],
  [1,0,0,0,0,0,1,0,1,1],
  [1,0,0,0,0,0,1,0,1,1],
  [1,0,2,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

function setup() {
  canvas_size = 500;
  noStroke();
  createCanvas(canvas_size, canvas_size);

  grid_height = canvas_size / 10;
  

}

function draw() {
  background(230);
  // print(findObject(2))



  // rendering
  for(let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      // wall
      if(grid[y][x] == "1") {
        fill(0);
        rect(x * grid_height, y * grid_height, grid_height, grid_height);
        
      }
      // player
      if(grid[y][x] == "2") {
        fill("green");
        rect(x * grid_height, y * grid_height, grid_height, grid_height);
      }

      // player
      if(grid[y][x] == "3") {
        fill("yellow");
        rect(x * grid_height, y * grid_height, grid_height, grid_height);
      }
      else {
        fill(0);
      }
      

    }

  }
  
}

function moveUp() {
  print(findObject(2))
  // let player_position = findObject(2);
  let [player_y, player_x] = findObject(2);
  print("player x y: ", player_x, player_y);
  // colision 
  // print(grid[player_x][player_y -1]);

  if (grid[player_y -1][player_x] == 1){
    print("collision");
  }
  else {
    // move up the player
    grid[player_y][player_x] = 0;
    player_y = player_y - 1;
    grid[player_y][player_x] = 2;
    // print(grid);
  }
}

function moveDown() {
  print(findObject(2))
  // let player_position = findObject(2);
  let [player_y, player_x] = findObject(2);
  print("player x y: ", player_x, player_y);
  // colision 
  // print(grid[player_x][player_y -1]);

  if (grid[player_y +1][player_x] == 1){
    print("collision");
  }
  else {
    // move up the player
    grid[player_y][player_x] = 0;
    player_y = player_y + 1;
    grid[player_y][player_x] = 2;
    // print(grid);
  }
}

function moveLeft() {
  print(findObject(2))
  // let player_position = findObject(2);
  let [player_y, player_x] = findObject(2);
  print("player x y: ", player_x, player_y);
  // colision 
  // print(grid[player_x][player_y -1]);

  if (grid[player_y][player_x -1] == 1){
    print("collision");
  }
  else {
    // move up the player
    grid[player_y][player_x] = 0;
    player_x = player_x - 1;
    grid[player_y][player_x] = 2;
    // print(grid);
  }
}

function moveRight() {
  print(findObject(2))
  // let player_position = findObject(2);
  let [player_y, player_x] = findObject(2);
  print("player x y: ", player_x, player_y);
  // colision 
  // print(grid[player_x][player_y -1]);

  if (grid[player_y][player_x +1] == 1){
    print("collision");
  }
  else {
    // move up the player
    grid[player_y][player_x] = 0;
    player_x = player_x + 1;
    grid[player_y][player_x] = 2;
    // print(grid);
  }
}


function keyPressed() {
  if (key === 'w') {
    moveUp();
  }

  if (key === 's') {
    moveDown();
  }

  if (key === 'a') {
    moveLeft();
  }

  if (key === 'd') {
    moveRight();
  }
}

function findObject(type){
  // print(type); 
  for(let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      if(grid[y][x] == type) {
        print("MATCH");
        return [y, x];
    }
  }
  
  } 
return "not found";
}
