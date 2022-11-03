const scoreBoard = document.querySelector('.scoreboard');
const board = document.querySelector('.Board');

const PlayerX = document.querySelector('.PlayerX');
const scoreX = document.querySelector('.score-player-x');

const PlayerO = document.querySelector('.PlayerO');
const scoreO = document.querySelector('.score-player-o');

const createElement = (tag, className) => {

    /*Essa função vai ser responsavel de criar um elemento e já inserir ele dentro de uma classe*/
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

function renderGame() {

    /*
            <div class="position" onclick="move(0)">
            <h1> 1 </h1>
        </div>
    */

    var listPosition = [];

    /*Essa e uma pré-visualização de como o tabuleiro vai ficar, estamos colocando o números que o player pode digitar no seu
    teclado para que assim ele possa interagir no tabuleiro sem ser preciso que ele clique obrigatoriamente com o mouse*/
    var tabuleiro =
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
        
        //Mostramos para o player o "nome" do campo que ele ta selecionado, vazendo com que assim ele possa jogar pelo numpad do teclado
        position.innerHTML = `<h1> ${tabuleiro[x]} </h1>`;

        listPosition.push(position);

        board.appendChild(position);
    }

}

function rederMove(m, n) {

    const position = document.querySelectorAll('.position');

    //Essaa função vai coloca os campo que levaram o player a vitoria em destaque
    if (m == "row") {
        console.log(n);
        for (let x = n * 3; x < (n * 3 + 3); x++) {
            position[x].classList.add('ganhou');
        }
        
    }

    if (m == "colum") {
        position[n].classList.add('ganhou');
        position[n + 3].classList.add('ganhou');
        position[n + 6].classList.add('ganhou');
    }

    if (m == "diagonal" && n == 0) {
        position[0].classList.add('ganhou');
        position[4].classList.add('ganhou');
        position[8].classList.add('ganhou');
    }

    if (m == "diagonal" && n == 2) {
        position[2].classList.add('ganhou');
        position[4].classList.add('ganhou');
        position[6].classList.add('ganhou');
    }

}

window.onload = () => {
    renderGame();
    PlayerX.innerHTML = localStorage.getItem('PlayerX');
    PlayerO.innerHTML = localStorage.getItem('PlayerO');

    scoreX.innerHTML = "0";
    scoreO.innerHTML = "0";

}