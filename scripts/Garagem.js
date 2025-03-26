class Garagem {
    constructor(nome) {
        this.nome = nome;
        this.veiculos = [];
    }

    adicionarVeiculo(veiculo) {
        this.veiculos.push(veiculo);
    }

    listarVeiculos() {
        this.veiculos.forEach(veiculo => {
            console.log(veiculo.exibirInformacoes());
        });
    }
}