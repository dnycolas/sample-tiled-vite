import { Actor, Color, Engine, None, Scene, SceneActivationContext, vec } from "excalibur";
import { Resources } from "../resources";

export class cenaEntrada extends Scene {
    imagemLogo?: HTMLElement;
    button?: HTMLElement;




    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#f5f5f7")

        

        const palitosY = document.querySelector('.swarm');


        const criarBolinhas = (numBalls: number) => {
            let i = 0;
            // variavel chamada 'i' que vale '0'; se ('i' for < 'numballs(50)'); 'i' vai somar mais 1
            setInterval(() => {
                if (i <  numBalls) {
                    // criar div
                    const ball = document.createElement('div');
                    // nome da div criada vai ser ball
                    ball.classList.add('ball');
                    // ela vai ter uma posição aleatoria
                    ball.style.left = `${Math.random() * 100}%`;
                    ball.style.top = `${Math.random() * 100}%`;
                    ball.style.zIndex = '0'
                    // essa div vai pra DIV 'swarm'
                    palitosY?.appendChild(ball);
                    
                    setInterval(() => {
                        if (i < numBalls) {
                            
                            ball.classList.remove('ball')
                            
                        }
                    }, 10000)
                }
            }, 250)


        }


        
        criarBolinhas(25); // Criando 50 quadrados para cobrir a tela
        


        let containerGame = document.querySelector('.container-game') as HTMLElement
        

        // Configurar o botão HTML
        this.button = document.getElementById("startButton") as HTMLElement;
        if (this.button) {
            this.button.setAttribute("style", "width: 200px; height: 50px;font-family: 'Bruno'; font-size: 24px; background-color: white; border: solid 6px #fe1064; border-radius: 28px; position: absolute; top: 75%; cursor: pointer;");
            this.button.addEventListener('click', () => {
                engine.goToScene('SalaMyd');

                palitosY?.remove()

            });
        }
        // // esse botão sera o responsavel para levar a proxima cena (salaIniciais.ts)
        // // criei um button
        // this.button = document.createElement("button") as HTMLElement

        // // adicionei elemento CSS
        // this.button.setAttribute("style", "width: 200px; height: 50px;font-family: 'Bruno';   font-size: 24px;   background-color: white;   border: solid 2px #fe1064;    border-radius: 28px;   position: absolute;  top: 75%; cursor: pointer;")



        // // adicionei texto
        // this.button.textContent = "jogar"


        // // coloquei dentro da div 'containerGame'
        // containerGame.appendChild(this.button)



        // criei uma imagem
        this.imagemLogo = document.createElement("img") as HTMLElement;
        // mostrei qual a imagem que deve aparecer
        this.imagemLogo.setAttribute("src"  ,"src/imagens/logoHiddenCode.png");
        // adicionei elementos CSS
        this.imagemLogo.setAttribute("style", "width: 30%; position: absolute; ")


        // coloquei dentro da div 'container-game'
        containerGame.appendChild(this.imagemLogo)

    }

    onDeactivate(context: SceneActivationContext<never>): void {
        this.imagemLogo?.remove()
        this.button?.remove()
    }
}