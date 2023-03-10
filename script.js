const playBoard = document.querySelector(".play-board");
const scoreelement = document.querySelector('.score');
const highScoreelement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');
const theme = document.querySelector('span .theme');

theme.addEventListener('click', () => {
    theme.classList.toggle('fa-sun')

    if (theme.classList.toggle('fa-moon')) {
        document.body.style.background = "";
        document.body.style.transition, theme.style.transition = '1.2s all ease';
        theme.style.color = 'crimson';

    } else {
        document.body.style.background = "black";
        document.body.style.transition, theme.style.transition = '1.2s all ease';
        theme.style.color = 'white';
    }

})

let gameover = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakebody = [];
let velocityX = 0, velocityY = 0;
let setIntervalID;
let score = 0;

let bgmsc1 = new Audio('bgmusic1.mp3');
let foodeat = new Audio('foodeat.wav');
let gameovermsc = new Audio('gameover.wav');
if (bgmsc1) {
    bgmsc1.play();
}

let highscore = localStorage.getItem("high-score") || 0;
highScoreelement.innerText = `High Score : ${highscore} `;

const changefoodposition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handlegameover = () => {
    gameovermsc.play();
    clearInterval(setIntervalID);
    alert("Game over! Press OK to replay ...");
    location.reload();
}



changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }))
})


const initGame = () => {
    if (gameover) return handlegameover();
    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        foodeat.play();
        changefoodposition();
        snakebody.push([foodX, foodY]);
        score++;


        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score", highscore)
        scoreelement.innerText = `Score : ${score} `;
        highScoreelement.innerText = `High Score : ${highscore} `;


        if (score > 50) {
            score += 2;
        }
    }

    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];

    }

    snakebody[0] = [snakeX, snakeY]


    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameover = true;
    }

    for (let i = 0; i < snakebody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area:${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;

        if (i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]) {
            gameover = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
}
changefoodposition();
setIntervalID = setInterval(initGame, 125);
initGame();

document.addEventListener("keydown", changeDirection)