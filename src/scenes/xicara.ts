export class Xicara {
    // Função para criar a xícara no jogo
    public xicaraMyd(numXicara: number) {
        const criarXicara = () => {
            const containerGame = document.querySelector(".container-game") as HTMLElement;
            const imagemXicara = document.createElement("img");
            const imagemCaneca = document.createElement("img");

            // Configurações da imagem da xícara
            imagemXicara.setAttribute("src", "src/maps/tilesets/cup_Myd.png");
            imagemXicara.setAttribute("style", `position: absolute; left: 49%; top: 24%; z-index:2;`);
            imagemXicara.classList.add("cupMyd");

            // Configurações da imagem da caneca
            imagemCaneca.setAttribute("src", "src/maps/tilesets/caneca_Myd.png");
            imagemCaneca.setAttribute("style", `position: absolute; left: 27%; top: 51%; z-index:2;`);
            imagemCaneca.classList.add("cupCafeMyd");

            // Adiciona as imagens ao container do jogo
            containerGame.appendChild(imagemCaneca);
            containerGame.appendChild(imagemXicara);
        };

        criarXicara();
    }

    // Funções para exibir mensagens específicas
    public textoXicara() {
        this.mostrarMensagem("item coletado, adicione açucar e café");
    }

    public textoCaneca() {
        this.mostrarMensagem("esquentando a agua");
    }

    public textoAcucar() {
        this.mostrarMensagem("açucar adicionado");
    }

    public textoCafe() {
        this.mostrarMensagem("café solúvel adicionado");
    }

    public mydTomandoCafe(falasMyd: string) {
        this.mostrarMensagem(falasMyd);
    }

    // Função genérica para exibir uma mensagem e removê-la após 3 segundos
    public mostrarMensagem(texto: string) {
        const containerGame = document.querySelector(".container-game") as HTMLElement;
        const mensagem = document.createElement("p");
        let opacity = 1;

        mensagem.textContent = texto;
        mensagem.setAttribute("style", `width: 400px; height: 40px; display: flex; align-items: center;text-aling: justify; justify-content: center; font-family: 'Pixel Fonte'; font-size: 14px; font-weight: 500; background-color: #f5f5f7; border: solid 3px #fe1064; border-radius: 0px; position: absolute; top: 80%; opacity: ${opacity}`);
        containerGame.appendChild(mensagem);

        setTimeout(() => {
            mensagem.remove();
        }, 3000); // Remove a mensagem após 3 segundos
    }
}
