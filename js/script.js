const sonic = document.querySelector(".sonic");
const rings = document.querySelector(".rings");
const gameOver = document.querySelector(".game-over");
gameOver.style.display = "none";
const finalGame = document.getElementById("final-game");

const btnStart = document.querySelector("#btnStart");
const h1 = document.querySelector("h1")
const elementStart = document.querySelectorAll(".rings, .sonic, .jump, .clouds, .nuvens");
const backgroundMusic = document.querySelector("#backgroundMusic");

btnStart.addEventListener("click", () => {
  btnStart.style.display = "none";
  h1.style.display = "none";
  backgroundMusic.play();
  setTimeout(() => {
    elementStart.forEach((elementStart) => {
    elementStart.style.animationPlayState = "running";
    });
  }, 700);
});

const btnReload = document.getElementById("btnReload");
btnReload.addEventListener("click", function () {
  location.reload();
});

let isJumpAnimation = false;

const jump = () => {
  if (isJumpAnimation) {
    return;
  }

  isJumpAnimation = true;
  sonic.classList.add("jump");

  setTimeout(() => {
    sonic.classList.remove("jump");
    isJumpAnimation = false;
  }, 500);
};

const loop = setInterval(() => {
  const ringPosition = rings.offsetLeft;
  const sonicPosition = +window
    .getComputedStyle(sonic)
    .bottom.replace("px", "");

  console.log(sonicPosition);

  if (ringPosition <= 130 && ringPosition > 0 && sonicPosition < 110) {
    rings.style.animation = "none";
    rings.style.left = `${ringPosition}px`;

    sonic.style.animation = "none";
    sonic.style.bottom = `${sonicPosition}px`;

    sonic.src = "./img/game-over.webp";
    sonic.style.width = "160px";

    backgroundMusic.pause();

    const audio = new Audio("./audio/final-game.mp3");
    audio.play();

    clearInterval(loop);

    gameOver.style.display = "block";
  }
}, 10);

document.addEventListener("keyup", (event) => {
  if (event.code === "Enter", "Spacebar") {
    jump();
  }
});

