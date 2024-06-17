/* rows templates e containers */

const rowTemplate = Handlebars.compile(
  document.querySelector("#template-row").innerHTML
);

const containerContinuar = document.querySelector(
  "#row-continuar .row-container"
);
const containerTop = document.querySelector("#row-top .row-container");
const containerSuperNintendo = document.querySelector(
  "#row-snes .row-container"
);
const containerGenesis = document.querySelector("#row-genesis .row-container");
const containerPlaystation = document.querySelector(
  "#row-playstation .row-container"
);

/* jogos iniciais */

fetch("./data/jogos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro de rede - Código ${response.status}`);
    }
    return response.json();
  })
  .then((jogosIniciais) => {
    /* todos os jogos */
    const arrayJogos = localStorage.getItem("arrayJogos")
      ? JSON.parse(localStorage.getItem("arrayJogos"))
      : jogosIniciais;

    /* continuar jogando */
    const jogosContinuar = arrayJogos.map((jogo) => {});

    /* super nintendo */
    const jogosSuperNintendo = arrayJogos.filter(
      (jogo) =>
        jogo.plataforma.toLowerCase().includes("snes") ||
        jogo.plataforma.toLowerCase().includes("super nintendo")
    );

    /* mega drive */
    const jogosGenesis = arrayJogos.filter(
      (jogo) =>
        jogo.plataforma.toLowerCase().includes("genesis") ||
        jogo.plataforma.toLowerCase().includes("mega drive")
    );

    /* playstation  */
    const jogosPlaystation = arrayJogos.filter((jogo) =>
      jogo.plataforma.toLowerCase().includes("playstation")
    );

    /* renderiza conteudo */

    containerContinuar.innerHTML = rowTemplate(arrayJogos);
    containerTop.innerHTML = rowTemplate(arrayJogos);
    containerSuperNintendo.innerHTML = rowTemplate(jogosSuperNintendo);
    containerGenesis.innerHTML = rowTemplate(jogosGenesis);
    containerPlaystation.innerHTML = rowTemplate(jogosPlaystation);

    /* aplica controles de slider aos rows */

    document.querySelectorAll(".row-container").forEach((e) => {
      applyRowControls(e);
    });
  })
  .catch((error) => console.error(error));

/* controle de slider para os rows */

function clearAllItems() {
  const allItems = document.querySelectorAll(".row-item");
  allItems.forEach((item) => {
    item.classList.remove("row-current-item");
  });
}

function goToItem(items, currentItem) {
  clearAllItems();

  items[currentItem].classList.add("row-current-item");

  items[currentItem].scrollIntoView({
    inline: "center",
    block: "nearest",
    behavior: "smooth",
  });
}

const applyRowControls = (e) => {
  const controls = e.querySelectorAll("button.row-control");
  const items = e.querySelectorAll(".row-item");

  const numItems = items.length;
  let currentItem = -1;

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      const isLeft = control.classList.contains("row-arrow-left");
      if (currentItem >= -1 && isLeft) {
        currentItem--;
        if (currentItem < 0) {
          currentItem = numItems - 1;
        }
      } else if (currentItem <= numItems - 1 && !isLeft) {
        currentItem++;
        if (currentItem > numItems - 1) {
          currentItem = 0;
        }
      }
      goToItem(items, currentItem);
    });

    items.forEach((item, key) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        currentItem = key;
        goToItem(items, currentItem);
      });
      item.addEventListener("focus", (e) => {
        e.preventDefault();
        currentItem = key;
        goToItem(items, currentItem);
      });
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

/* filtros */
