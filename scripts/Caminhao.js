class Caminhao extends Veiculo {
    constructor(modelo, capacidadeCarga) {
        super(modelo);
        this.capacidadeCarga = capacidadeCarga;
        this.cargaAtual = 0;
    }

    carregar(quantidade) {
        if (this.cargaAtual + quantidade <= this.capacidadeCarga) {
            this.cargaAtual += quantidade;
            console.log(`Caminhão carregado. Carga atual: ${this.cargaAtual}`);
            return "carregado";
        } else {
            return "excesso_carga";
        }
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Capacidade de Carga: ${this.capacidadeCarga}, Carga Atual: ${this.cargaAtual}`;
    }

    interagir() {
        console.log("Caminhão Interagindo");
    }
}