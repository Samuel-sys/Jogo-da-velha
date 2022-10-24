const btnStart = document.querySelector('.btnStart');
const PlayerO = document.querySelector('#PlayerO');
const PlayerX = document.querySelector('#PlayerX');

function StartGameOFF(Player1 = "X", Player2 = "O"){
    console.log("ok");
    window.alert(`Nome do player 1 ${Player1} \nNome do player 2 ${Player2} `);
}

btnStart.addEventListener('click', () => {
    StartGameOFF()
    console.log("Start")
});