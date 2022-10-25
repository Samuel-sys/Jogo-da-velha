const scoreboard = document.querySelector('.scoreboard');

const PlayerX = document.querySelector('.PlayerX');
const scoreX = document.querySelector('.score-player-x');

const PlayerO = document.querySelector('.PlayerO');
const scoreO = document.querySelector('.score-player-o');

window.onload = () => {
    PlayerX.innerHTML = localStorage.getItem('PlayerX');
    PlayerO.innerHTML = localStorage.getItem('PlayerO');

    scoreX.innerHTML = "0";
    scoreO.innerHTML = "0";

}