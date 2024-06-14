const containerContinue = document.querySelector("#row-continue .row-items");

const rowTemplate = Handlebars.compile(
  document.querySelector("#template-row").innerHTML
);

fetch("./data/jogos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro de rede - Código ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    containerContinue.innerHTML = rowTemplate(data);
    console.log(data);
  })
  .catch((error) => console.error(error));

/* row controls */

const applyRowControls = (e) => {
  const controls = e.querySelectorAll(".row-control");
  const items = e.querySelectorAll(".row-item");
  const maxItems = items.length - 1;

  let currentItem = 0;

  items.forEach((item, key) => {
    item.addEventListener("click", (event) => {
      items.forEach((item) => {
        item.classList.remove("row-current-item");
      });
      items[key].classList.add("row-current-item");
      items[key].scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });
      currentItem = key;
    });
  });

  controls.forEach((control) => {
    control.addEventListener("click", (e) => {
      const isLeft = e.target.classList.value.search("left") != -1;
      if (currentItem > 0 && isLeft) {
        currentItem--;
      } else if (currentItem < maxItems && !isLeft) {
        currentItem++;
      }
      items[currentItem].scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });
      items.forEach((item) => {
        item.classList.remove("row-current-item");
      });
      items[currentItem].classList.add("row-current-item");
    });
  });
};

document.querySelectorAll(".row-container").forEach((e) => {
  applyRowControls(e);
});

/* header background change on scroll */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  window.scrollY <= 20
    ? header.classList.add("transparent")
    : header.classList.remove("transparent");
  console.log(window.scrollY);
});
