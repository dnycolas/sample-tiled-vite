import { Actor, Collider, CollisionContact, CollisionType, Color, Engine, Font, Keys, Label, Side, TextAlign, Vector, vec } from "excalibur";
import { Xicara } from "../scenes/xicara";
import { Arquivos } from "../tentativa";


export class Player extends Actor {
    // Propriedades do player 
    private velocidade: number = 100; // Velocidade de movimento do player
    private temObjetoProximo: boolean = false; // Flag para verificar se o player está próximo de um objeto interagível
    private ultimoColisor?: Collider; // Último colisor com o qual o player colidiu
    private numIndex: number = 0; // Índice para controlar as falas do fogão
    private falasMyd: string[] = ["Myd colocou a água quente na xícara", "Myd tomou o café e gostou", "Myd esta cheio de energia!!!!!!!!"];  // Array de falas do fogão

    // isso aqui ira remover os objetos caso o Myd mude de cena.
    private removerObjetos(): void {
        // pegando o nome do elemento dentro do HTML
        let sumirXicara = document.querySelector(".cupMyd");
        let sumircaneca = document.querySelector(".cupCafeMyd")


        // Removendo os elemento
        sumirXicara?.remove();
        sumircaneca?.remove()
    }  
    // ____________________

    // Configuraçaõ do player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 64,
            height: 96,
            name: "jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
        let xicarazinha = new Xicara();
        xicarazinha.xicaraMyd(1);

        

        // Mapeamento das teclas de movimento
        engine.input.keyboard.on("press", (event) => {
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    this.vel.x = -this.velocidade;
                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade;
                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade;
                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade;
                    break;
                default:
                    this.vel.x = 0;
                    this.vel.y = 0;
                    break;
            }
        });

        // Parar movimento ao soltar a tecla
        engine.input.keyboard.on("release", (event) => {
            if (event.key == Keys.A || event.key == Keys.D || event.key == Keys.Left || event.key == Keys.Right) {
                this.vel.x = 0;
            }

            if (event.key == Keys.W || event.key == Keys.S || event.key == Keys.Up || event.key == Keys.Down) {
                this.vel.y = 0;
            }
        });

        // Flags para verificar se o jogador coletou itens específicos
        let xicaraBoolean = false;
        let cafeBoolean = false;
        let acucarBoolean = false;
        let canecaBoolean = false;
        let fogaoBoolean = false;

        // Mapeamento da tecla de interação (E)
        engine.input.keyboard.on("press", (event) => {
            if (event.key == Keys.E && this.temObjetoProximo) {
                if (this.ultimoColisor?.owner.name == "coffeMyd") {
                    if (xicaraBoolean == false) {
                        xicarazinha.mostrarMensagem("Falta a xicara");
                    }

                    if (xicaraBoolean == true) {
                        xicarazinha.textoCafe();
                        cafeBoolean = true;
                    }
                }

                if (this.ultimoColisor?.owner.name == "acucarMyd") {
                    if (xicaraBoolean == false) {
                        xicarazinha.mostrarMensagem("Falta a xicara");
                    }

                    if (xicaraBoolean == true) {
                        xicarazinha.textoAcucar();
                        acucarBoolean = true;
                    }
                }

                if (this.ultimoColisor?.owner.name == "canecaMyd") {
                    if (cafeBoolean == true && acucarBoolean == true) {
                        let removerXicara = document.querySelector(".cupCafeMyd");
                        removerXicara?.setAttribute("style", `position: absolute; top: 63%; left:34.1%; z-index:2;`);
                        xicarazinha.textoCaneca();
                        canecaBoolean = true
                    } else { xicarazinha.mostrarMensagem("Antes de esquentar, prepare a xicara") }
                }

                // Interação com o fogão
                if (this.ultimoColisor?.owner.name == "fogaoMyd") {
                    if (xicaraBoolean == false && cafeBoolean == false) {
                        xicarazinha.mostrarMensagem("coloque açucar e café solúvel dentro de um xicara");
                    }
                    if (canecaBoolean == true) {
                        xicarazinha.mydTomandoCafe(this.falasMyd[this.numIndex]);
                        this.numIndex = (this.numIndex + 1) % this.falasMyd.length; // Avança para a próxima fala
                        fogaoBoolean = true;
                    }
                }

                // Interação com o setup (para pegar a xícara)
                if (this.ultimoColisor?.owner.name == "setupMyd") {
                    if (fogaoBoolean == false) {
                        xicaraBoolean = true;
                        let removerXicara = document.querySelector(".cupMyd");
                        removerXicara?.setAttribute("style", `opacity: 0%`);
                        xicarazinha.textoXicara();
                    }

                    

                    if (fogaoBoolean == true) {
                        xicarazinha.mostrarMensagem("Myd vai programar")

                        this.removerObjetos();

                        engine.goToScene("PingPongMyd")
                    }
                }

                // Interação com o sofá
                if (this.ultimoColisor?.owner.name == "sofaMyd") {
                    if (fogaoBoolean == false) {
                        xicarazinha.mostrarMensagem("Myd adoraria descançar um pouco");
                    } else {
                        xicarazinha.mostrarMensagem("Myd vai descançar mais tarde")
                    }
                }

            }
        });


    }

    onPostCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        this.temObjetoProximo = true; // Marca que o player está próximo de um objeto interagível
        this.ultimoColisor = other; // Salva o último colisor


    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // Verifica a distância do player ao último colisor
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 80) {
            this.temObjetoProximo = false;

            console.log("longe");

        }

        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) < 80) {
            this.temObjetoProximo = true;

        }

        // Troca a cena e remove os elementos da xícara e caneca
        if (this.ultimoColisor?.owner.name == "corredor") {
            this.removerImagens();
            engine.goToScene("corredor");
        }
    }
    // Função para remover as imagens da xícara e caneca
    private removerImagens(): void {
        let removerXicara = document.querySelector(".cupCafeMyd");
        let removerCaneca = document.querySelector(".cupMyd");
        removerXicara?.remove();
        removerCaneca?.remove();
    }


}
