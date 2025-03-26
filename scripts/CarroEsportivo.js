class CarroEsportivo extends Carro {
    constructor(modelo, numeroPortas, temTurbo = true) {
        super(modelo, numeroPortas);
        this.temTurbo = temTurbo;
    }

    ativarTurbo() {
        if (this.temTurbo && this.ligado) {
            this.velocidade += 30;
            if (this.velocidade > this.velocidadeMaxima) {
                this.velocidade = this.velocidadeMaxima;
            }
            console.log("Turbo ativado! Velocidade: " + this.velocidade);
            return "turbo";
        } else if (!this.ligado) {
            return "desligado";
        }
        else {
            return "sem_turbo";
        }
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Tem Turbo: ${this.temTurbo ? 'Sim' : 'Não'}`;
    }

    interagir() {
        console.log("Carro Esportivo Interagindo");
    }
}