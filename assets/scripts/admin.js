class Jogo {
  constructor() {
    this.id = localStorage.getItem("id")
      ? parseInt(localStorage.getItem("id"))
      : 0;
    this.arrayJogos = localStorage.getItem("arrayJogos")
      ? JSON.parse(localStorage.getItem("arrayJogos"))
      : [];

    // Verifica se arrayJogos está vazio e inicializa com jogos padrão se necessário
    if (this.arrayJogos.length === 0) {
      this.inicializarJogos();
      this.listaTabela(); // Adiciona esta linha para garantir que a tabela seja atualizada após inicializar os jogos
    }
  }

  inicializarJogos() {
    const jogosIniciais = [
      {
        id: 0,
        nomeJogo: "The Legend of Zelda: Breath of the Wild",
        descricao: "Um jogo de ação e aventura em mundo aberto.",
        imagem:
          "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
        generos: "Ação, Aventura",
        plataforma: "Nintendo Switch",
      },
      {
        id: 1,
        nomeJogo: "God of War",
        descricao: "A jornada de Kratos e seu filho Atreus.",
        imagem:
          "https://cdn.dol.com.br/img/Artigo-Destaque/780000/640x360/GOW_00784214_0_-3.webp?fallback=https%3A%2F%2Fcdn.dol.com.br%2Fimg%2FArtigo-Destaque%2F780000%2FGOW_00784214_0_.jpg%3Fxid%3D2485001&xid=2485001",
        generos: "Ação, Aventura",
        plataforma: "PlayStation 4",
      },
      {
        id: 2,
        nomeJogo: "Minecraft",
        descricao: "Um jogo de construção em um mundo de blocos.",
        imagem:
          "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/811461b8d1cacf1f2da791b478dccfe2a55457780364c3d5a95fbfcdd4c3086f",
        generos: "Sandbox, Aventura",
        plataforma: "Multiplataforma",
      },
    ];

    this.arrayJogos = jogosIniciais;
    this.id = jogosIniciais.length;
    localStorage.setItem("arrayJogos", JSON.stringify(this.arrayJogos));
    localStorage.setItem("id", this.id);
  }

  salvar() {
    let jogo = this.lerDados();
    if (this.validaCampo(jogo)) {
      this.adicionar(jogo);
    }
    this.listaTabela();
    this.cancelar();
  }

  listaTabela() {
    localStorage.setItem("id", this.id);
    localStorage.setItem("arrayJogos", JSON.stringify(this.arrayJogos));

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < this.arrayJogos.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_jogo = tr.insertCell();
      let td_descricao = tr.insertCell();
      let td_imagem = tr.insertCell();
      let td_generos = tr.insertCell();
      let td_plataforma = tr.insertCell();
      let td_acao = tr.insertCell();

      td_id.innerText = this.arrayJogos[i].id;
      td_jogo.innerText = this.arrayJogos[i].nomeJogo;
      td_descricao.innerText = this.arrayJogos[i].descricao;

      if (this.arrayJogos[i].imagem) {
        let img = document.createElement("img");
        img.src = this.arrayJogos[i].imagem;
        img.style.width = "50px";
        td_imagem.appendChild(img);
      } else {
        td_imagem.innerText = "N/A";
      }

      td_generos.innerText = this.arrayJogos[i].generos;
      td_plataforma.innerText = this.arrayJogos[i].plataforma;

      let imgEdit = document.createElement("img");
      imgEdit.src = "./assets/images/icon-edit.png";
      let imgDelete = document.createElement("img");
      imgDelete.src = "./assets/images/icon-delete.png";
      imgDelete.setAttribute(
        "onclick",
        `jogo.deletar(${this.arrayJogos[i].id})`
      );

      td_acao.appendChild(imgEdit);
      td_acao.appendChild(imgDelete);
    }
  }

  adicionar(jogo) {
    jogo.id = this.id;
    this.arrayJogos.push(jogo);
    this.id++;
  }

  lerDados() {
    let jogo = {};
    jogo.nomeJogo = document.getElementById("jogo").value;
    jogo.descricao = document.getElementById("descricao").value;
    jogo.imagem = document.getElementById("imagem").value;
    jogo.generos = document.getElementById("generos").value;
    jogo.plataforma = document.getElementById("plataforma").value;
    return jogo;
  }

  validaCampo(jogo) {
    let msg = "";
    if (jogo.nomeJogo == "") {
      msg += "Informe o nome do jogo \n";
    }
    if (jogo.descricao == "") {
      msg += "Informe a descrição do jogo \n";
    }
    if (jogo.imagem == "") {
      msg += "Informe a URL da imagem do jogo \n";
    }
    if (jogo.generos == "") {
      msg += "Informe os gêneros do jogo \n";
    }
    if (jogo.plataforma == "") {
      msg += "Informe a plataforma do jogo \n";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }
    return true;
  }

  cancelar() {
    document.getElementById("jogo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("generos").value = "";
    document.getElementById("plataforma").value = "";
  }

  deletar(id) {
    this.arrayJogos = this.arrayJogos.filter(
      (jogo) => parseInt(jogo.id) !== parseInt(id)
    );
    this.listaTabela();
  }

  exportarJSON() {
    const json = JSON.stringify(this.arrayJogos, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jogos.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

let jogo = new Jogo();
jogo.listaTabela();
