let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = "right";

function criarBG() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

document.addEventListener('keydown', update);

function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function fimDeJogo(jogo) {
    clearInterval(jogo);
    alert("Fim do Jogo!");
}


function start() {
    if(snake[0].x > 15 * box && direction == "right") fimDeJogo(jogo);
    if(snake[0].x < 0 * box && direction == "left") fimDeJogo(jogo);
    if(snake[0].y > 15 * box && direction == "up") fimDeJogo(jogo);
    if(snake[0].y < 0 * box && direction == "down") fimDeJogo(jogo);
    
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            fimDeJogo(jogo);
        }
    }
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else { 
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(start, 100);