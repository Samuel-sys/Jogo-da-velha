const position = document.querySelectorAll('.position');


//Função responsavel por consulta qual o player que marcou essa caixa
function getByDataPlayer(id) {
    //para evitar que o sistema de finalize a partida por conta de ter 3 campo iguais a null 
    //(O jogo só pode para se tiver 3 campos iguais a "X" ou "O")
    return position[id].getAttribute('data-player') == null ? id : position[id].getAttribute('data-player');
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

    console.log(game);

    for (let x = 0; x <= 2; x++) {

        //Linhas
        if (
            game[`row${x + 1}`][0] == game[`row${x + 1}`][1]
            && game[`row${x + 1}`][0] == game[`row${x + 1}`][2]
        ) {
            window.alert(`O "${game[`row${x + 1}`][0]}" Ganhou! Linha ${x + 1}`);
            return true;
        }else 
        
        //Colunas
        if(
            game[`row${1}`][x] == game[`row${2}`][x]
            && game[`row${1}`][x] == game[`row${3}`][x]
        ){
            window.alert(`O "${game[`row${1}`][x]}" Ganhou! coluna ${x + 1}`);
            return true;
        }
    }

    if(game['row1'][0] == game['row2'][1] && game['row1'][0] == game['row3'][2]){
        window.alert(`O "${game['row1'][0]}" Ganhou! cruzado`);
        return true;
    }
    if(game['row3'][0] == game['row2'][1] && game['row3'][0] == game['row1'][2]){
        window.alert(`O "${game['row3'][0]}" Ganhou! cruzado`);
        return true;
    }

}

let jogador = true;

function move(id) {

    //Verifica se o campo já foi preenchido ou não
    if (position[id].classList.contains('X') || position[id].classList.contains('O')) {
        return; // Se o campo já foi preenchido ele encerra o jogo
    }

    if(jogador){
        position[id].classList.add('X');
        position[id].setAttribute('data-player', 'X');

        jogador = !jogador;
    }else{
        position[id].classList.add('O');
        position[id].setAttribute('data-player', 'O');
        jogador = !jogador;
    }

    setTimeout(() => {
        if(checkEndGame()) {
            window.location = 'game.html';
        }
    }, 10);

}