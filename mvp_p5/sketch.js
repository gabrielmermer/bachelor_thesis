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

let mic, recorder, soundFile;
let initialise_audio = false;

function preload() {
  
}

function setup() {
  canvas_size = 500;
  noStroke();
  createCanvas(canvas_size, canvas_size);

  grid_height = canvas_size / 10;

  mic = new p5.AudioIn();

  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  

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
  if (key === " ") {
    if (!initialise_audio) {
      initialiseAudio()
    }
    else {
      startRecording();
    }
  }
}

function keyReleased() {
  if (key === " ") {
    stopRecording();
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

function initialiseAudio() {
  userStartAudio();
  initialise_audio = true;
}

function startRecording() {
  print("recording")
  recorder.record(soundFile);
}

function stopRecording() {
  recorder.stop();
  soundFile.play();
  sendSound();
}

async function sendSound() {
  console.log("sending sound to server");
  let soundBlob = soundFile.getBlob();
  let formData = new FormData();
  formData.append('audio_file', soundBlob, 'recording.wav');

  let serverUrl = 'http://127.0.0.1:8000/process_audio';

  let httpRequestOptions = {
    method: 'POST',
    body: formData
  };

  try {
    const response = await fetch(serverUrl, httpRequestOptions);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
