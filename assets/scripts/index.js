/* rows templates e containers */

const rowTemplate = Handlebars.compile(
  document.querySelector("#template-row").innerHTML
);

const containerSNES = document.querySelector("#row-snes .row-items");
const containerMD = document.querySelector("#row-md .row-items");
const containerPS = document.querySelector("#row-ps .row-items");

const containerTeste = document.querySelector("#row-teste .row-items");

/* jogos iniciais */

fetch("./data/jogos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro de rede - Código ${response.status}`);
    }
    return response.json();
  })
  .then((jogosIniciais) => {
    const arrayJogos = localStorage.getItem("arrayJogos")
      ? JSON.parse(localStorage.getItem("arrayJogos"))
      : jogosIniciais;

    const jogosSNES = arrayJogos.filter(
      (jogo) =>
        jogo.plataforma.toLowerCase().includes("snes") ||
        jogo.plataforma.toLowerCase().includes("super nintendo")
    );
    const jogosMD = arrayJogos.filter(
      (jogo) =>
        jogo.plataforma.toLowerCase().includes("md") ||
        jogo.plataforma.toLowerCase().includes("mega drive")
    );
    const jogosPS = arrayJogos.filter(
      (jogo) =>
        jogo.plataforma.toLowerCase().includes("ps") ||
        jogo.plataforma.toLowerCase().includes("playstation")
    );

    /* renderiza conteudo */

    containerSNES.innerHTML = rowTemplate(jogosSNES);
    containerMD.innerHTML = rowTemplate(jogosMD);
    containerPS.innerHTML = rowTemplate(jogosPS);
    containerTeste.innerHTML = rowTemplate(arrayJogos);

    /* aplica controles de slider aos rows */

    document.querySelectorAll(".row-container").forEach((e) => {
      applyRowControls(e);
    });
  })
  .catch((error) => console.error(error));

/* controle de slider para os rows */

const applyRowControls = (e) => {
  const controls = e.querySelectorAll(".row-control");
  const items = e.querySelectorAll(".row-item");
  const numItems = items.length;

  let controlJump = 1;
  let currentItem = 0;

  if (numItems <= controlJump) controls.forEach((e) => e.remove());

  controls.forEach((control) => {
    control.addEventListener("click", (e) => {
      const isLeft = e.target.classList.contains("row-arrow-left");
      if (currentItem > 0 && isLeft) {
        currentItem -= controlJump;
      }
      if (currentItem < numItems - 1 && !isLeft) {
        currentItem += controlJump;
      }
      items.forEach((item) => {
        item.classList.remove("row-current-item");
      });
      items[currentItem].classList.add("row-current-item");
    });
  });
};

/* muda background do header ao scrollar a tela */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  window.scrollY <= 20
    ? header.classList.add("transparent")
    : header.classList.remove("transparent");
});
