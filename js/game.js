const position = document.querySelectorAll('.position');
let jogador = true; //Verdadeiro = X Falso = O
let lance = 0; //conta quantos lance já foram feitos, se tiver 9 lances sem vencedor ele da a partida como empatada 

//Função responsavel por consulta qual o player que marcou essa caixa
function getByDataPlayer(id) {
    //para evitar que o sistema de finalize a partida por conta de ter 3 campo iguais a null 
    //(O jogo só pode para se tiver 3 campos iguais a "X" ou "O")
    return position[id].getAttribute('data-player') == null ? id : position[id].getAttribute('data-player');
}

function move(id) {

    //Verifica se o campo já foi preenchido ou não
    if (position[id].classList.contains('X') || position[id].classList.contains('O')) {
        return; // Se o campo já foi preenchido ele encerra o jogo
    }

    //alternando o jogador, se for verdadeiro significa que e o player 1 que vai jogar se for falso e o player 2
    if (jogador) {
        position[id].classList.add('X');
        position[id].setAttribute('data-player', 'X');

        jogador = !jogador;
    } else {
        position[id].classList.add('O');
        position[id].setAttribute('data-player', 'O');
        jogador = !jogador;
    }

    //Verifica se tem algum ganhador ou se o jogo ficou empatado e da um tempo para mostrar o tabuleiro
    setTimeout(() => {

        if (checkEndGame()) {
            resetGame();
        }

        if (lance >= 9) {
            window.alert("Empate");
            resetGame();
        }
    }, 10);

}

function checkEndGame() {

    //Criamos 3 listas para armazenar a data do jogador que jogou na casa do tabuleiro de jogo da velha
    let game = {
        'row1': [],
        'row2': [],
        'row3': []
    }

    //Criamos um loop que irá fazer a verificação de todas as casa da # e armazenar nas litas
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
            window.alert(`O "${game[`row${x + 1}`][0]}" Ganhou! Linha ${x + 1}`);
            return true;
        } else

            //Verifica todas as Colunas do #
            if (
                game[`row${1}`][x] == game[`row${2}`][x]
                && game[`row${1}`][x] == game[`row${3}`][x]
            ) {
                window.alert(`O "${game[`row${1}`][x]}" Ganhou! coluna ${x + 1}`);
                return true;
            }
    }

    //Verifica as 2 posições cruzadas na #
    if (game['row1'][0] == game['row2'][1] && game['row1'][0] == game['row3'][2]) {
        window.alert(`O "${game['row1'][0]}" Ganhou! cruzado`);
        return true;
    }
    if (game['row3'][0] == game['row2'][1] && game['row3'][0] == game['row1'][2]) {
        window.alert(`O "${game['row3'][0]}" Ganhou! cruzado`);
        return true;
    }

    lance++; //Caso ninguem ganhe ele soma 1 no contados de lances da partida
    return false;
}

function resetGame() {
    //Loop de repetição para remover a classe X e O de todos os elementos HTML e remoção do data-player
    for (let x = 0; x < 9; x++) {

        position[x].classList.remove("X");
        position[x].classList.remove("O");

        position[x].removeAttribute('data-player');

    }

    //Zera o contador de lance
    lance = 0;
}