import { Color, Engine, Resource, Scene, TileMap, vec } from "excalibur";
import { Arquivos } from "../tentativa";
import { Player } from "../actors/players";

export class cenaCorredor extends Scene {

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Cyan

        let mapatiled = Arquivos.EntradaLaboratorio

        let setX = 160
        let setY = 80

        mapatiled.addToScene(this, {
            pos:vec (300, setY)
        })

        let spawnerponto = mapatiled.getObjectsByName("jogador")[0]

        let player = new Player(vec(spawnerponto.x + setX, spawnerponto.y + setY))

        player.z = 4 

        this.add(player)

    }
}