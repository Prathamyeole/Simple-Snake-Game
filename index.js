const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

class Snakepart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

// the function is going to continuously update the screen
// we can do this in three ways
// request animation frame
//setinterval xtimes per a second
//set timeout

// we are using here set timeout

// game loop
let speed = 5;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeparts = [];
let taillength = 0;

let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
 
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
}
function isGameOver(){
    let gameOver = false;
    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }
    // walls
    console.log(headX, tileCount);
    if(headX < 0 | headX >= tileCount){
        gameOver = true;
    }
    if(headY < 0 | headY >= tileCount){
        gameOver = true;
    }
    for(let i=0; i< snakeparts.length; i++){
        let part = snakeparts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    if (gameOver == true){
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';
        var gradient = ctx.createLinearGradient(0,0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1", "red");
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width/6.5, canvas.width/2);
        
    }

    return gameOver;
}
function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50,10);
}
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height)
}
function drawSnake(){
    ctx.fillStyle = 'green';
    for(let i=0; i<snakeparts.length; i++){
        let part = snakeparts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeparts.push(new Snakepart(headX, headY));
    while(snakeparts.length > taillength){
        snakeparts.shift();
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
}
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}
function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        taillength++;
        score++;
    }
}
// applying keyboardlisteners such that it doesnt move out off keyboard
// or inside its own body

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    // right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    

}
drawGame();