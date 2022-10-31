class Game {
    constructor(game) {
        this._game = game;
    }

    set game(map) {
        this._game = map;
    }

    checkEndGame() {
        //Esse loop de repetição vai verificar todas as linha e colunas do #
        for (let x = 0; x <= 2; x++) {

            //Verifica todas as linha do #
            if (this._game[`row${x + 1}`][0] == this._game[`row${x + 1}`][1] && this._game[`row${x + 1}`][0] == this._game[`row${x + 1}`][2]) {

                window.alert(`O "${this._game[`row${x + 1}`][0]}" Ganhou! Linha ${x + 1}`);
                return true;

            } else

                //Verifica todas as Colunas do #
                if (this._game[`row${1}`][x] == this._game[`row${2}`][x] && this._game[`row${1}`][x] == this._game[`row${3}`][x]) {

                    window.alert(`O "${this._game[`row${1}`][x]}" Ganhou! coluna ${x + 1}`);
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

    }
}