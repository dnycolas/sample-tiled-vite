import { Actor, CollisionType, Color, Engine, Scene, SceneActivationContext, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/players";
// isso aqui é um arquivo que contem a imagem de uma xicara
// import { Xicara } from "../scenes/xicara";

export class salaInicial extends Scene {
    imagemXicara?: HTMLElement;


    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Black

        let tiledMap = Resources.Mapa

        let offsetX = 160
        let offsetY = 80

        // lembrar: fazer parede invisivel para entra no outro cenario
        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY)
        })

        // Carregar spawn point do player
        let spawnpoint = tiledMap.getObjectsByName("jogador")[0]

        // Criação e configuração do Player
        let jogador = new Player(vec(spawnpoint.x + offsetX, spawnpoint.y + offsetY))

        // Define z-index do player, útil se algum outro elemento ficar "por cima " do jogador
        jogador.z = 4

        // Adicionar o player na cena 
        this.add(jogador)

        // Adicionar colisao com cada objeto 
        // Pegar a camada de objetos colisores
        let camadaObjetosColisores = tiledMap.getObjectLayers("objetos_colisores")[0]

        //   Percorrer objetos com foreach e para cada objetos, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {
            // Configurar o actor 
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                // esse tipo de colisão faz com o objeto não se mexa ao colidir
                collisionType: CollisionType.Fixed,
                //  color: Color.Red // isso aqui é pra testar pra ver se a colisão ta funcionando
                z: 0
            })

            this.add(objetoAtual)
        })


        // eu coloquei essa imagem desssa forma pq eu estou vendo como que cria objetos (POO)
        // eu criei um variavel que vai possui as caracteristica da class "Xicara"
        // let xicarazinha = new Xicara()
        // dentro da class Xicara possui uma função publica que se chama xicaraMyd
        // xicarazinha.xicaraMyd("")
        // !!! o que faz a xicara aparecer e o mapa nao sumir é o z-index

    }

    
}
