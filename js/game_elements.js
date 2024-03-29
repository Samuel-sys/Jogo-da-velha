const scoreBoard = document.querySelector('.scoreboard');
const board = document.querySelector('.Board');

const PlayerX = document.querySelector('.PlayerX');
const scoreX = document.querySelector('.score-player-x');

const PlayerO = document.querySelector('.PlayerO');
const scoreO = document.querySelector('.score-player-o');

const resetGameElement = () => { return document.querySelector(".resetGame"); }

const createElement = (tag, className) => {

    /*Essa função vai ser responsavel de criar um elemento e já inserir ele dentro de uma classe*/
    const element = document.createElement(tag);

    element.className = className ? className : "";

    return element;
}

function renderGame() {

    /*
    Objetivo final
        <div class="position board1" onclick="move(0)">
            <h1> 1 </h1>
        </div>
    */

    let listPosition = [];

    /*Essa e uma pré-visualização de como o tabuleiro vai ficar, estamos colocando o números que o player pode digitar no seu
    teclado para que assim ele possa interagir no tabuleiro sem ser preciso que ele clique obrigatoriamente com o mouse*/
    let tabuleiro =
        [
            '7', '8', '9',
            '4', '5', '6',
            '1', '2', '3',
        ]

    for (let x = 0; x < 9; x++) {
        //Adicionamos uma pseudo classe que terá a função de identificar a possição que o usuario que preencher
        var position = createElement("div", `position board${tabuleiro[x]}`);

        //colocamos a função move vinculado ao elemento HTML 
        position.addEventListener('click', move);

        let h2 = createElement("h2");

        /*Mostramos para o player o "nome" do campo que ele ta selecionado, fazendo com que assim ele 
        possa jogar pelo numpad do teclado. Se o Usuario estiver em um celular não apresenta esse numeros
        Já que fica sem sentido para ele pois ele não tem o NumPad*/
        if (checkDevice()) h2.innerHTML = tabuleiro[x];

        position.appendChild(h2);

        listPosition.push(position);
        board.appendChild(position);
    }

    renderScore();
}

function checkDevice() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return false; // está utilizando celular
    }
    else {
        return true; // não é celular
    }
}

function rederMove(m, n) {

    const position = document.querySelectorAll('.position');

    //Essaa função vai coloca os campo que levaram o player a vitoria em destaque
    if (m == "row") {
        for (let x = n * 3; x < (n * 3 + 3); x++) {
            position[x].classList.add('winner');
        }
    }

    if (m == "colum") {
        position[n].classList.add('winner');
        position[n + 3].classList.add('winner');
        position[n + 6].classList.add('winner');
    }

    if (m == "diagonal" && n == 0) {
        position[0].classList.add('winner');
        position[4].classList.add('winner');
        position[8].classList.add('winner');
    }

    if (m == "diagonal" && n == 2) {
        position[2].classList.add('winner');
        position[4].classList.add('winner');
        position[6].classList.add('winner');
    }

    /*Para descobrir o player temos que usar uma logia um pouco estranha, nos estamos usando o metodo querySelectorAll onde 
    que ele retorna uma list de elementos HTML, nessa list nos sabemos que ele segue esse padrão de index

        0, 1, 2 = Linha 1 (row1)
        3, 4, 5 = Linha 2 (row2)
        6, 7, 8 = Linha 3 (row3)
    
    O método que nos estamos usando para mostrar ao usuário onde foi a vitória (rederMove) irá solicitar 2 informações.
    Primeira o modo que ele venceu seja ele linha(row),coluna(colum) ou em diagonal e segundo qual o número da linha ou coluna
    que ganhou. Digamos que ele ganhe na linha 1 o método vai te informar o index da primeira casa que ganhou (nesse caso 0) 
    mas e se for à linha 2? Ele vai informar 1 '-' e ai que mora o perigo, pois no caso isso tava trazendo muito bug, oque 
    eu fiz para resolver isso ? multiplique por 3, pois se for 0 vai dar 0 se for 1 vai dar 3 (que e o 1º index da linha 2)
    e se for 2 vai dar 6 (que e o 1º index da linha 3).

    Devido a isso temos que aplicar essa mesma logica aqui para descobrimos qual player ganhou (X ou O)*/
    let player = m == "row" ?
        position[n * 3].getAttribute('data-player') :
        position[n].getAttribute('data-player');

    //Pegamos o valor de pontos do local storage e adicionamos 1 ponto nele
    let score = +localStorage.getItem("score" + player) + 1;
    localStorage.setItem("score" + player, score);

    //atualiza o placar, informa quem ganhou e carrega a tela de reiniciar o jogo
    renderScore();
    renderResetGame();
    renderChamp(player);

}

function renderChamp(player) {
    var champ = createElement("h3", "champ");

    //informa qual o player que ganhou, se no método não for informado nenhum player ele considera que foi empate
    if (player) {
        champ.innerHTML = `${localStorage.getItem("Player" + player)} (${player}) Ganhou`
    } else {
        champ.innerHTML = "Empate"
        renderResetGame();
    }
    resetGameElement().appendChild(champ);
}

function renderScore() {

    //pega o nome do jogador no localStorage do navegador
    PlayerX.innerHTML = "( X ) " + localStorage.getItem('PlayerX');
    PlayerO.innerHTML = "( O ) " + localStorage.getItem('PlayerO');

    //pega o placar do jogo no localStorage do navegador
    scoreX.innerHTML = +localStorage.getItem("scoreX");
    scoreO.innerHTML = +localStorage.getItem("scoreO");

    console.log(localStorage.getItem("scoreX"));
}

function renderResetGame() {
    let screenReset = createElement("div", "resetGame");
    let iconReset = createElement("img", "iconReset");

    screenReset.appendChild(iconReset);

    iconReset.addEventListener('click', resetGame);

    board.appendChild(screenReset);
}

window.onload = () => {
    renderGame();
}