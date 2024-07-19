import {Engine,FadeInOut} from 'excalibur';
import { loader } from './resources';
import { cenaEntrada } from './scenes/cenaEntrada';
import { salaInicial } from './scenes/salaInicial';
import { jogoPingPong } from './scenes/jogoPingPong';
import { cenaCorredor } from './scenes/cenaCorredor';

import { Player } from './player';


const game = new Engine({
    width: 960,
    height: 640,
    canvasElementId: 'jogo',
    pixelArt: true,
    pixelRatio: 2
}); 

game.addScene("cenaBemVindo", new cenaEntrada());
game.addScene("SalaMyd", new salaInicial());
game.addScene("PingPongMyd", new jogoPingPong());
game.addScene("corredor", new cenaCorredor())


game.start(loader).then(() => {
    game.goToScene("cenaBemVindo")
    
});