// class Game {
//   constructor() {
//     this.id = id;
//     this.score = score;
//     this.title = title;
//     this.description = description;
//     this.plataforms = plataforms;
//     this.release = release;
//     this.played = played;
//     this.plays = plays;
//     this.players = players;
//     this.genres = genres;
//     this.publisher = publisher;
//     this.languages = languages;
//     this.thumbnail = thumbnail;
//     this.cover = cover;
//     this.logo = logo;
//     this.poster = poster;
//     this.video = video;
//   }
// }

// let games = [];

// var id = 0;
// var title = "Super Mario Bros.™ Wonder";
// var description =
//   "Classic Mario side-scrolling gameplay is turned on its head with the addition of Wonder Flowers. These game-changing items trigger spectacular moments you must see to believe…Witness pipes coming alive, wreak havoc as a giant spiky ball, and see even more unexpected events called Wonder Effects.";
// var plataforms = ["Nintendo Switch"];
// var release = "10/20/2023";
// var players = { local: "1-4", online: "1-4" };
// var genres = ["Platformer", "Action"];
// var publisher = "Nintendo";
// var languages = [
//   "Dutch",
//   "English",
//   "French",
//   "German",
//   "Italian",
//   "Japanese",
//   "Korean",
//   "Portuguese",
//   "Russian",
//   "Simplified Chinese",
//   "Spanish",
//   "Traditional Chinese",
// ];
// var poster =
//   "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_1000/ncom/software/switch/70010000068688/87e8aa5f1fdc950b88eae7d7c62ed185c8a6373c845090bbdb2e2cf039b38da1";
// var video =
//   "https://assets.nintendo.com/video/upload/br_3500k,c_limit,h_540,vc_h265,w_960/v1697819208/ncom/software/switch/70010000068688/Video/Switch_SMBW_LaunchTRL_Web_ESRB_H264.m4s";

// const mario = new Game(
//   id,
//   title,
//   description,
//   plataforms,
//   release,
//   players,
//   genres,
//   publisher,
//   languages,
//   poster,
//   video
// );

// games.push(mario);

// console.log(games);
// console.log(games[0].title);

const rowControls = document.querySelectorAll(".row-control");
let rowCurrentItem = 0;
const rowItems = document.querySelectorAll(".row-item");
const rowMaxItems = rowItems.length;

rowControls.forEach((control) => {
  control.addEventListener("click", (event) => {
    const controlClassLeft = event.target.classList.value.search("left") != -1;
    if (rowCurrentItem > 0 && controlClassLeft) {
      rowCurrentItem--;
    } else if (rowCurrentItem < rowMaxItems && !controlClassLeft) {
      rowCurrentItem++;
    }
    console.log(rowCurrentItem);
  });
});
