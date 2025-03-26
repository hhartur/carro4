class Carro extends Veiculo {
    constructor(modelo, numeroPortas) {
      super(modelo);
      this.numeroPortas = numeroPortas;
    }
  
    exibirInformacoes() {
      return `${super.exibirInformacoes()}, Portas: ${this.numeroPortas}`;
    }
  
    interagir() {
      console.log("Carro interagindo...");
    }
  }