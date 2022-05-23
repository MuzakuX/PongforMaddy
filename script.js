const canvas = document.querySelector('canvas')
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext("2d");
const paddleWidth = 8;
const paddleHeight = 80;
let playerScore = 0;
let computerScore = 0;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let playerPosition = canvas.height / 2;
let computerPosition = canvas.height / 2;
let moveX;
let moveY;
let ballRadius = 10;
const winningTotal = 3;
let gameLoop;
let gameRunning = false

ctx.fillStyle = "red"
ctx.font = "30px Helvetica"
ctx.textAlign = "center"
ctx.fillText("Press Space to start!", canvas.width / 2, canvas.height / 2);

function randomMovement() {

    const randomX = Math.ceil(Math.random() * 3) + 1; 
    const randomY = Math.round(Math.random() * 3); 
    const plusOrMinusX = Math.random() < 0.5 ? "-" : "+"
    const plusOrMinusY = Math.random() < 0.5 ? "-" : "+"
    const randomNumber = Math.random()
    moveX = Number(plusOrMinusX + randomX) + randomNumber;
    moveY = Number(plusOrMinusY + randomY) + randomNumber;
}


document.addEventListener("keydown", handleKeyPress)

function handleKeyPress(e) {
    switch(e.code) {
    case "Space":
            gameStart();
            break;
    case "ArrowUp":
        if(playerPosition - paddleHeight / 2 <= 0) return;
        playerPosition -= 15;
        break;
    case "ArrowDown":
        if(playerPosition + paddleHeight / 2 >= canvas.height) return;
        playerPosition += 15;
        break;
    }

}

function gameStart(){
    if(gameRunning) return;
    gameRunning = true;
    randomMovement();
    ballX = canvas.width / 2;
    playerScore = 0;
    computerScore = 0;
    clearInterval(gameLoop);
    gameLoop = setInterval(loop, 15);
}

function drawPlayerPaddle(){
ctx.fillStyle = 'red';
ctx.fillRect(0,
    playerPosition - paddleHeight / 2,
 paddleWidth, paddleHeight);
};

function drawComputerPaddle(){
    ctx.fillStyle = 'blue'
    ctx.fillRect(
        canvas.width - paddleWidth,
        computerPosition - paddleHeight / 2,
        paddleWidth, paddleHeight );
};

 function drawBall() {
     ctx.beginPath();
 ctx.fillStyle = 'grey';
 ctx.arc(ballX, ballY , ballRadius, 0, 2*Math.PI);
 ctx.fill();
 ballX += moveX;
 ballY += moveY;
 };

 function drawScore(){
    ctx.fillStyle = "red"
    ctx.font = "30px Helvetica";
    ctx.fillText(playerScore, canvas.width / 4, 50);
    ctx.fillText(computerScore, canvas.width * 0.75, 50);
 }   

function drawCanvas(){
    ctx.beginPath();
    ctx.setLineDash([6])
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
   
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, 2 * Math.PI);
    ctx.stroke();
}

function collide (){
    // bounce off top and bottom
    if (ballY > canvas.height - ballRadius || ballY - ballRadius <= 0){
        moveY = -moveY;
    }
    //check for score x axis (both sides!)

    if (ballX <= ballRadius) {
        score('computer')
    }
    else if (ballX + ballRadius >= canvas.width)
    score('player')

    //contact player paddle
    if(ballX <= ballRadius + paddleWidth &&
        Math.abs(ballY - playerPosition) <= paddleHeight / 2 + ballRadius )
        
        {
            console.log(moveX);
            moveX = -moveX + generateRandomBounce();
            console.log(moveX);
    }
    
    //contact computer paddle
    if(ballX  + ballRadius >= canvas.width - paddleWidth &&
        Math.abs(ballY - computerPosition) <= paddleHeight / 2 + ballRadius ){
        moveX = -moveX + generateRandomBounce();
}

function score(player) {
    if(player === 'computer'){
        computerScore++}
        else{
            playerScore++
        }
    if (computerScore === winningTotal) {
        endGame("computer")
        return
    }
    else if(playerScore === winningTotal){
        endGame("player")
        return
    }
        ballX = canvas.width / 2
        ballY = canvas.height /2
    }

function endGame(winner){
    gameRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    clearInterval(gameLoop);
    if(winner === 'computer'){
        ctx.fillStyle ='blue';

    }
    else {
        ctx.fillStyle ='red';
    }
    ctx.textAlign = 'center'
    ctx.fillText(`The Winner is: ${winner}`, canvas.width /2, canvas.height /2);
}
}
function moveComputer(){
    if(computerPosition < ballY){
        computerPosition++;
    }
    else {
        computerPosition --;
    }
}

function generateRandomBounce(){
    const number0to1 = Math.floor(Math.random()* 2)
    const positiveOrNegative = number0to1 === 0 ? "-" : "+"
   return Number(positiveOrNegative + Math.random() / 2)
}
 function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawComputerPaddle();
    drawPlayerPaddle();
    drawScore();
    drawCanvas();
    collide();
    moveComputer();
 }
 