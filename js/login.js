const btnStart = document.querySelector('.btnStart');
const PlayerO = document.querySelector('#PlayerO');
const PlayerX = document.querySelector('#PlayerX');

//por hora vou mexer somente com um jogo off mas vou estudar a criação de um jogo da velha online 
function StartGameOFF(Player1, Player2) {

    //Questionamos se o usuario vai querer mesmo deixar o nome em branco
    if (Player1 == "" || Player1 == null || Player2 == "" || Player2 == null) 
        if(!confirm("Você deixou um dos campos sem nome, se você continuar será dado o nome de defult para você. \n\nCaso queira continuar clique em Ok.")) return

    //Se o usuario não informar o nome ele coloca um nome padrão
    if (Player1 == "" || Player1 == null) Player1 = 'Vó Gerusa';
    if (Player2 == "" || Player2 == null) Player2 = 'Vó Luizinha';

    localStorage.setItem("player1-X", Player1);
    localStorage.setItem("player2-O", Player2);
}

btnStart.addEventListener('click', () => {
    StartGameOFF(PlayerX.value, PlayerO.value)

    window.location = 'pages/game.html';
});