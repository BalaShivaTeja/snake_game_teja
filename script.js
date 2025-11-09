const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{x: 9*box, y: 10*box}];
let direction = "RIGHT";
let food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i=0; i<snake.length; i++) {
        ctx.fillStyle = (i===0) ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;
    
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
    } else {
        snake.pop();
    }
    
    let newHead = {x: snakeX, y: snakeY};
    
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        clearInterval(game);
        alert("Game Over");
    }
    
    snake.unshift(newHead);
}

let game = setInterval(draw, 100);
