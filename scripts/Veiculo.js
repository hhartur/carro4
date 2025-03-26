class Veiculo {
    constructor(modelo) {
      this.modelo = modelo;
      this.ligado = false;
      this.velocidade = 0;
      this.velocidadeMaxima = 100;
    }
  
    ligar() {
      if (!this.ligado) {
        this.ligado = true;
        console.log(`${this.modelo} ligado.`);
        return "ligado"; // Retorna "ligado" para o som
      } else {
        return "ja_ligado"; // Retorna "ja_ligado" para alert
      }
    }
  
    desligar() {
      if (this.ligado) {
        this.ligado = false;
        this.velocidade = 0;
        console.log(`${this.modelo} desligado.`);
        return "desligado"; // Retorna "desligado" para o som
      } else {
        return "ja_desligado";  // Retorna "ja_desligado" para alert
      }
    }
  
    acelerar() {
        if (!this.ligado) {
            return "desligado"; // Não pode acelerar desligado
        }
        if (this.velocidade < this.velocidadeMaxima) {
            this.velocidade += 10;
            console.log(`${this.modelo} acelerando. Velocidade: ${this.velocidade}`);
            return "acelerar"; // Retorna para o som
        } else {
            return "velocidade_maxima";  // Retorna para alert
        }
    }
  
    frear() {
        if (this.velocidade > 0) {
            this.velocidade -= 10;
            console.log(`${this.modelo} freando. Velocidade: ${this.velocidade}`);
            return "frear"; // Retorna para o som
        } else {
            return "parado"; // Não pode frear parado
        }
    }
  
    buzinar() {
      console.log("Buzinando!");
      return "buzinar";  // Retorna para o som
    }
  
    exibirInformacoes() {
      return `Modelo: ${this.modelo}, Ligado: ${this.ligado ? 'Sim' : 'Não'}, Velocidade: ${this.velocidade}`;
    }
  
    interagir() {
      console.log("Veículo interagindo...");
    }
  }