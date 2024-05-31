class Jogo {
  constructor() {
    this.id = localStorage.getItem("id")
      ? parseInt(localStorage.getItem("id"))
      : 0;
    this.arrayJogos = localStorage.getItem("arrayJogos")
      ? JSON.parse(localStorage.getItem("arrayJogos"))
      : [];
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
