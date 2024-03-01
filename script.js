import { getData } from "./pages/service/service.js";
import { calcularConsumoDeAgua } from "./pages/scripts/algoritmo_consumo.js";

const URI_BASE = "./pages/api/v1";
const ENDPOINT = URI_BASE + "/runners.json";
const ENDPOINT_TRACK = URI_BASE + "/race-track-paris.json";

const circuito = await getData(ENDPOINT_TRACK).then((data) => {
  return data;
});

getData(ENDPOINT).then((data) => {
  criarCorredores(data);
});

async function criarCorredores(corredores) {
  const container = document.querySelector(".interior");
  container.innerHTML = "";

  corredores.forEach(async (corredor, index) => {
    const a = document.createElement("a");
    a.id = `corredor${index + 1}`;
    a.className = "btn";
    a.href = `#open-modal${index + 1}`;
    a.textContent = `🏃 ${corredor.nome}`;

    const totalGarrafas = await calcularConsumoDeAgua(corredor, circuito);

    // Cria um modal para cada corredor
    const modal = document.createElement("div");
    modal.id = `open-modal${index + 1}`;
    modal.className = "modal-window";
    modal.innerHTML = `
        <div>
            <a href="#" title="Close" class="modal-close">Fechar</a>
            <h1>${corredor.nome}</h1>
            <div>${corredor.descrição}</div>
            <br />
            <div><small>Consumo de água 👇🚰</small></div>
            ${totalGarrafas} garrafas
        </div>
      `;

    // Adiciona o modal ao corpo do documento
    document.body.appendChild(modal);

    a.addEventListener("mouseover", function () {
      document.querySelector(".imagem-corredor").src = `pages/assets/corredor${
        index + 1
      }.png`;
    });

    container.appendChild(a);
  });
}
