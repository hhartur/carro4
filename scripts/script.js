document.addEventListener('DOMContentLoaded', function() {
    // 1. Criação dos Veículos
    const carro = new Carro("Fusca", 4);
    const carroEsportivo = new CarroEsportivo("Esportivo", 2);
    const caminhao = new Caminhao("Caminhão", 5000);

    let veiculoSelecionado = carro; // Inicia com um veículo padrão

    // Elementos do HTML (incluindo os novos)
    const veiculoImagem = document.getElementById('veiculo-imagem');
    const veiculoInfo = document.getElementById('veiculo-info');
    const ligarDesligarBtn = document.getElementById('ligar-desligar');
    const acelerarBtn = document.getElementById('acelerar');
    const frearBtn = document.getElementById('frear');
    const buzinarBtn = document.getElementById('buzinar');
    const turboBtn = document.getElementById('turbo');
    const carregarBtn = document.getElementById('carregar');
    const cargaQuantidadeInput = document.getElementById('carga-quantidade');
    const alertasDiv = document.getElementById('alertas');
    const statusVeiculoDiv = document.getElementById('status-veiculo');
    const velocidadeDisplay = document.getElementById('velocidade-display');
    const velocidadeBarra = document.getElementById('velocidade-barra');

    // NOVOS ELEMENTOS
    const selecionarCarroBtn = document.getElementById('selecionar-carro');
    const selecionarCarroEsportivoBtn = document.getElementById('selecionar-carro-esportivo');
    const selecionarCaminhaoBtn = document.getElementById('selecionar-caminhao');
    //OU, se usou um select:
    //const selectVeiculo = document.getElementById('select-veiculo');

    // Sons (já definidos anteriormente)

    // Função para atualizar a interface (já definida anteriormente)
    function atualizarInterface() {
        veiculoInfo.textContent = veiculoSelecionado.exibirInformacoes();
        velocidadeDisplay.textContent = `Velocidade: ${veiculoSelecionado.velocidade}`;
        velocidadeBarra.value = veiculoSelecionado.velocidade;

        //Atualiza a imagem
        let imagemSrc = '';
        if (veiculoSelecionado instanceof CarroEsportivo) {
            imagemSrc = 'imagens/carro_esportivo.png';
        } else if (veiculoSelecionado instanceof Caminhao) {
            imagemSrc = 'imagens/caminhao.png';
        } else {
            imagemSrc = 'imagens/carro.png';
        }
        veiculoImagem.src = imagemSrc;

        // Atualiza o status (ligado/desligado) visualmente
        if (veiculoSelecionado.ligado) {
            statusVeiculoDiv.textContent = "Ligado";
            statusVeiculoDiv.className = "ligado";
            ligarDesligarBtn.textContent = "Desligar";
        } else {
            statusVeiculoDiv.textContent = "Desligado";
            statusVeiculoDiv.className = "desligado";
            ligarDesligarBtn.textContent = "Ligar";
        }

        //Desabilita o botão turbo se não for CarroEsportivo
        turboBtn.disabled = !(veiculoSelecionado instanceof CarroEsportivo);

        //Desabilita o botão carregar se não for Caminhao
        carregarBtn.disabled = !(veiculoSelecionado instanceof Caminhao);
        cargaQuantidadeInput.disabled = !(veiculoSelecionado instanceof Caminhao);
    }

    // Função para exibir alertas (já definida anteriormente)
    function exibirAlerta(mensagem) {
        const alerta = document.createElement('div');
        alerta.textContent = mensagem;
        alerta.classList.add('alerta'); // Pode adicionar estilos no CSS
        alertasDiv.appendChild(alerta);

        // Remove o alerta após alguns segundos
        setTimeout(() => {
            alertasDiv.removeChild(alerta);
        }, 3000);
    }

    // Função para tocar sons (já definida anteriormente)
    /*function tocarSom(som) {
        try {
            switch (som) {
                case "buzinar":
                    buzinaSom.play();
                    break;
                case "acelerar":
                    aceleracaoSom.play();
                    break;
                case "frear":
                    frenagemSom.play();
                    break;
                case "ligar":
                    ligarSom.play();
                    break;
                case "desligar":
                    desligarSom.play();
                    break;
            }
        } catch (e) {
            console.error('Erro ao tocar som:', som, e);
        }
    }*/

    // Função para o efeito shake
    function shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500); // Remove a classe após 0.5 segundos
    }

    // Event Listeners para os botões de SELEÇÃO de veículo
    selecionarCarroBtn.addEventListener('click', function() {
        veiculoSelecionado = carro;
        atualizarInterface();
        gsap.fromTo(veiculoImagem, { scale: 0.8, opacity: 0 }, { duration: 0.5, scale: 1, opacity: 1, ease: "power2.out" });
    });

    selecionarCarroEsportivoBtn.addEventListener('click', function() {
        veiculoSelecionado = carroEsportivo;
        atualizarInterface();
        gsap.fromTo(veiculoImagem, { scale: 0.8, opacity: 0 }, { duration: 0.5, scale: 1, opacity: 1, ease: "power2.out" });
    });

    selecionarCaminhaoBtn.addEventListener('click', function() {
        veiculoSelecionado = caminhao;
        atualizarInterface();
        gsap.fromTo(veiculoImagem, { scale: 0.8, opacity: 0 }, { duration: 0.5, scale: 1, opacity: 1, ease: "power2.out" });
    });

    // OU, com o select:
    /*
    selectVeiculo.addEventListener('change', function() {
        const valorSelecionado = this.value;
        if (valorSelecionado === 'carro') {
            veiculoSelecionado = carro;
        } else if (valorSelecionado === 'carro_esportivo') {
            veiculoSelecionado = carroEsportivo;
        } else if (valorSelecionado === 'caminhao') {
            veiculoSelecionado = caminhao;
        }
        atualizarInterface();
    });
    */

    // Event Listeners para os botões de CONTROLE (já definidos anteriormente)
    ligarDesligarBtn.addEventListener('click', function() {
        const resultado = veiculoSelecionado.ligado ? veiculoSelecionado.desligar() : veiculoSelecionado.ligar();
        if (resultado === "ligado" || resultado === "desligado") {
            //tocarSom(resultado);
            gsap.to(veiculoImagem, {duration: 0.5, scale: 1.2, yoyo: true, repeat: 1, ease: "power1.inOut"});
        } else if (resultado === "ja_ligado") {
            exibirAlerta("O veículo já está ligado.");
        } else if (resultado === "ja_desligado") {
            exibirAlerta("O veículo já está desligado.");
        }
        atualizarInterface();
    });

    acelerarBtn.addEventListener('click', function() {
        const resultado = veiculoSelecionado.acelerar();
        if (resultado === "acelerar") {
            //tocarSom(resultado);

            /*velocidadeBarra.classList.remove("freando"); //Remove classe freando caso esteja presente
            animarBarraDeProgresso(veiculoSelecionado.velocidade, velocidadeBarra); // Passa velocidadeBarra
            animarTextoVelocidade(veiculoSelecionado.velocidade, velocidadeDisplay); // Passa velocidadeDisplay*/

            //Adiciona um "impulso" visual na imagem do carro também
            gsap.to(veiculoImagem, {duration: 0.2, scale: 1.1, yoyo: true, repeat: 1, ease: "power1.inOut"});
        } else if (resultado === "desligado") {
            exibirAlerta("O veículo está desligado. Ligue-o para acelerar.");
            shakeElement(veiculoImagem);  // Adiciona o shake à imagem
        } else if (resultado === "velocidade_maxima") {
            exibirAlerta("O veículo já está na velocidade máxima.");
        }
        atualizarInterface(); // Garante que a interface seja atualizada
    });

    frearBtn.addEventListener('click', function() {
        const resultado = veiculoSelecionado.frear();
        if (resultado === "frear") {
            //tocarSom(resultado);

            /*velocidadeBarra.classList.remove("acelerando"); //Remove classe acelerando caso esteja presente
            animarBarraDeProgresso(veiculoSelecionado.velocidade, velocidadeBarra); // Passa velocidadeBarra
            animarTextoVelocidade(veiculoSelecionado.velocidade, velocidadeDisplay); // Passa velocidadeDisplay*/

            //Adiciona um "impulso" visual na imagem do carro também
            gsap.to(veiculoImagem, {duration: 0.2, scale: 0.9, yoyo: true, repeat: 1, ease: "power1.inOut"});
        } else if (resultado === "parado") {
            exibirAlerta("O veículo já está parado.");
        }
        atualizarInterface(); // Garante que a interface seja atualizada
    });

    buzinarBtn.addEventListener('click', function() {
        //tocarSom(veiculoSelecionado.buzinar());
        gsap.to(veiculoImagem, {duration: 0.1, x: "+=10", yoyo: true, repeat: 5, ease: "power1.inOut"});
    });

    turboBtn.addEventListener('click', function() {
        if (veiculoSelecionado instanceof CarroEsportivo) {
            const resultado = veiculoSelecionado.ativarTurbo();
            if(resultado === "desligado"){
              exibirAlerta("Ligue o carro para ativar o turbo");
            }
            else {
                const conteiner = document.getElementById("img-container")
              // Limita a posição x para que o carro não saia da tela
              const maxX = window.innerWidth - conteiner.width; // Calcula a posição máxima permitida
              let newX = conteiner.offsetLeft + 50; // Calcula a nova posição
              newX = Math.min(newX, maxX); // Garante que não ultrapasse a tela
            
              velocidadeBarra.classList.add("acelerar")
              setTimeout(() => {
                velocidadeBarra.classList.remove("acelerar")
              }, 100);

              gsap.to(veiculoImagem, {duration: 0.3, x: newX, ease: "power2.out"}); // Anima para a nova posição
            }
        } else {
            exibirAlerta("Apenas carros esportivos têm turbo.");
        }
        atualizarInterface();
    });

    carregarBtn.addEventListener('click', function() {
        if (veiculoSelecionado instanceof Caminhao) {
            const quantidade = parseInt(cargaQuantidadeInput.value);
            if (isNaN(quantidade)) {
                exibirAlerta("Por favor, insira uma quantidade válida para carregar.");
                return;
            }
            const resultado = veiculoSelecionado.carregar(quantidade);
            if (resultado === "excesso_carga") {
                exibirAlerta("A quantidade excede a capacidade máxima de carga.");
            }
        } else {
            exibirAlerta("Apenas caminhões podem ser carregados.");
        }
        atualizarInterface();
    });

    

    // Inicialização da interface
    atualizarInterface();

    //Exemplo de interagir
    carro.interagir();
    carroEsportivo.interagir();
    caminhao.interagir();
});

// Função para animar a barra de progresso
function animarBarraDeProgresso(novaVelocidade, velocidadeBarra) { // Adiciona velocidadeBarra como argumento
    gsap.to(velocidadeBarra, {
        duration: 0.5, // Duração da animação
        value: novaVelocidade, // Nova velocidade
        ease: "power3.out" // Tipo de easing
    });
}

// Função para animar o texto da velocidade
function animarTextoVelocidade(novaVelocidade, velocidadeDisplay) { // Adiciona velocidadeDisplay como argumento
    gsap.to(velocidadeDisplay, {
        duration: 0.5, // Duração da animação
        textContent: `Velocidade: ${novaVelocidade}`, // Novo texto
        snap: { textContent: 1 }, // Garante que o texto seja sempre um número inteiro
        ease: "power3.out", // Tipo de easing
        onUpdate: function() {
            // Atualiza o texto do display
            velocidadeDisplay.textContent = `Velocidade: ${Math.round(this.targets()[0].textContent)}`;
        }
    });
}