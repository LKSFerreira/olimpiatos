const CONSUMO_DE_AGUA_NORMAL = 1.1;
const CONSUMO_DE_AGUA_ALTO = 1.2; // 20% a mais
const CONSUMO_DE_AGUA_BAIXO = 0.8; // 20% a menos
const CAPACIDADE_GARRAFA_DAGUA = 0.8; // 800 ml

export async function calcularConsumoDeAgua(corredor, circuito) {
  let totalAgua = 0;

  const velocidadeDoCorredor = corredor.velocidade_media.velocidade;

  circuito.forEach((trecho) => {
    console.log(trecho);

    let horas = trecho.distancia_para_prox / velocidadeDoCorredor;

    let consumoDeAgua = CONSUMO_DE_AGUA_NORMAL;

    const fatorDesidratacao = trecho.fator_desidratação;

    switch (fatorDesidratacao) {
      case "Alto":
        consumoDeAgua *= CONSUMO_DE_AGUA_ALTO;
        break;
      case "Baixo":
        consumoDeAgua *= CONSUMO_DE_AGUA_BAIXO;
        break;
    }

    totalAgua += consumoDeAgua * horas;
  });

  return Math.ceil(totalAgua / CAPACIDADE_GARRAFA_DAGUA);
}
