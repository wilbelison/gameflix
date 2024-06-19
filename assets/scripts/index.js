/* templates */

const rowTemplate = Handlebars.compile(
  document.querySelector("#template-row").innerHTML
);

/* containers */

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

/* filtrarJogos */

function filtrarJogos(jogos, options = {}) {
  const {
    nomeJogo = null,
    ids = null,
    limite = null,
    ordenarPor = "nota",
    reverso = false,
    generos = null,
    plataforma = null,
  } = options;

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filterByIds = (jogos) =>
    ids
      ? jogos.filter((jogo) =>
          (Array.isArray(ids) ? ids : [ids]).includes(jogo.id)
        )
      : jogos;
  const filterByField = (jogos, field, values) =>
    values
      ? jogos.filter((jogo) =>
          (Array.isArray(values) ? values : [values]).some((value) =>
            normalize(jogo[field]).includes(normalize(value))
          )
        )
      : jogos;

  let resultados = jogos;
  resultados = filterByIds(resultados);
  resultados = filterByField(resultados, "nomeJogo", nomeJogo);
  resultados = filterByField(resultados, "generos", generos);
  resultados = filterByField(resultados, "plataforma", plataforma);

  if (ordenarPor) {
    resultados.sort((a, b) => {
      const [valorA, valorB] = [a[ordenarPor], b[ordenarPor]];
      return valorA === valorB
        ? 0
        : (valorA < valorB ? -1 : 1) * (reverso ? -1 : 1);
    });
  }

  return limite ? resultados.slice(0, limite) : resultados;
}

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

    /* filtros */

    const optionsContinuar = {
      ids: [0, 10, 20, 30, 40, 50, 1, 11, 21, 31, 41, 51]
    };

    const optionsTop = {
      limite: 10,
      ordenarPor: "nota",
      reverso: true
    };

    const optionsSuperNintendo = {
      ordenarPor: "nomeJogo",
      plataforma: ["Super Nintendo", "SNES"],
    };

    const optionsGenesis = {
      ordenarPor: "nomeJogo",
      plataforma: ["Genesis", "Mega Drive"],
    };

    const optionsPlaystation = {
      ordenarPor: "nomeJogo",
      plataforma: ["Playstation 1", "PS1"],
    };

    containerContinuar.innerHTML = rowTemplate(
      filtrarJogos(arrayJogos, optionsContinuar)
    );
    containerTop.innerHTML = rowTemplate(filtrarJogos(arrayJogos, optionsTop));
    containerSuperNintendo.innerHTML = rowTemplate(
      filtrarJogos(arrayJogos, optionsSuperNintendo)
    );
    containerGenesis.innerHTML = rowTemplate(
      filtrarJogos(arrayJogos, optionsGenesis)
    );
    containerPlaystation.innerHTML = rowTemplate(
      filtrarJogos(arrayJogos, optionsPlaystation)
    );

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
        goToItem(items, key);
      });
      item.addEventListener("focus", (e) => {
        e.preventDefault();
        currentItem = key;
        goToItem(items, key);
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

/* menu mobile */

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", function () {
  nav.classList.toggle("active");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});
