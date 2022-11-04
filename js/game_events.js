var player = true; //Verdadeiro = X Falso = O
var lance = 0; //conta quantos lance já foram feitos, se tiver 9 lances sem vencedor ele da a partida como empatada 


//Criamos 3 listas para armazenar a data do jogador que jogou na casa do tabuleiro de jogo da velha
var game = {
    'row1': [],
    'row2': [],
    'row3': []
}

function move({ target }) {

    //Caso o jogo tenha acabado com uma vitoria ou empate ele para o evendo de "move" aqui
    if(document.querySelector('.resetGame')) return;

    let position = target.parentNode;

    //Verifica se o campo já foi preenchido ou não
    if (position.className.includes('X') || position.className.includes('O')) {
        return; // Se o campo já foi preenchido ele encerra o jogo
    }

    //alternando o jogador, se for verdadeiro significa que e o player 1 que vai jogar se for falso e o player 2
    if (player) {
        position.classList.add('X');
        position.setAttribute('data-player', 'X');

        player = !player;
    } else {
        position.classList.add('O');
        position.setAttribute('data-player', 'O');
        player = !player;
    }

    //Verifica se tem algum ganhador ou se o jogo ficou empatado e da um tempo para mostrar o tabuleiro
    setTimeout(() => {

        checkEndGame()

        if (lance >= 9) {
            renderChamp();
        }
    }, 10);

}

function resetGame() {
    const position = document.querySelectorAll('.position');

    //Loop de repetição para remover a classe X e O de todos os elementos HTML e remoção do data-player
    for (let x = 0; x < 9; x++) {

        //Limpa o taboleiro
        position[x].classList.remove("X");
        position[x].classList.remove("O");
        position[x].classList.remove("winner");
        position[x].removeAttribute('data-player');

        //Limpa o placar e atualiza com o placar atual
        renderScore();
        let champ = document.querySelector('.champ');
        if (champ) scoreBoard.removeChild(champ);

        //remove a tela de reset game
        let screenReset = document.querySelector('.resetGame');
        if (screenReset) board.removeChild(screenReset);

        //zera os lances do jogo que controla e informa se o jogo acabou empatado ou não
        lance = 0;
    }
}

//Função responsavel por consulta qual o player que marcou essa caixa
function getByDataPlayer(id) {
    const position = document.querySelectorAll('.position');

    //para evitar que o sistema de finalize a partida por conta de ter 3 campo iguais a null 
    //(O jogo só pode para se tiver 3 campos iguais a "X" ou "O")
    return position[id].getAttribute('data-player') == null ? id : position[id].getAttribute('data-player');
}

function checkEndGame() {

    const position = document.querySelectorAll('.position');

    game = {
        'row1': [],
        'row2': [],
        'row3': []
    };
    //Criamos um loop que irá fazer a verificação de todas as casa da # e armazenar nas listas
    for (let x = 0; x <= 2; x++) {
        game['row1'].push(getByDataPlayer(x));
        game['row2'].push(getByDataPlayer(x + 3));
        game['row3'].push(getByDataPlayer(x + 6));
    }

    //Esse loop de repetição vai verificar todas as linha e colunas do #
    for (let x = 0; x <= 2; x++) {

        //Verifica todas as linha do #
        if (
            game[`row${x + 1}`][0] == game[`row${x + 1}`][1]
            && game[`row${x + 1}`][0] == game[`row${x + 1}`][2]
        ) {
            rederMove('row', x);
            return true;
        }

        //Verifica todas as Colunas do #
        if (
            game[`row${1}`][x] == game[`row${2}`][x]
            && game[`row${1}`][x] == game[`row${3}`][x]
        ) {
            rederMove('colum', x);
            return true;
        }
    }

    //Verifica as 2 posições cruzadas na #
    if (game['row1'][0] == game['row2'][1] && game['row1'][0] == game['row3'][2]) {
        rederMove("diagonal", 0)
        return true;
    }
    if (game['row3'][0] == game['row2'][1] && game['row3'][0] == game['row1'][2]) {
        rederMove("diagonal", 2)
        return true;
    }

    lance++; //Caso ninguem ganhe ele soma 1 no contados de lances da partida
    return false;
}

document.onkeyup = (x) => {
    switch (x.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            //Realizamos uma querry e pegamos o elemento HTML que tenha a classe boardX onde que o "X" e o numero do teclado que ele clicou 
            move({ target: document.querySelector(`.board${x.key}`).children[0] });
            break;
        case '0':
            resetGame();
            break;
        default:
            break;
    }
}

//Zera o placar do jogo e coloca o X para começar o jogo de novo
function zerarScore() {
    localStorage.setItem("scoreO", "0");
    localStorage.setItem("scoreX", "0");
    player = true;
    resetGame();
}

//função para zerar o placar e reiniciar o jogo do 0
document.querySelector(".zerar").addEventListener('click', () => zerarScore());