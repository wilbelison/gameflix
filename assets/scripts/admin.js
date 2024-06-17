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
    } else {
      this.listaTabela();
    }
  }

  inicializarJogos() {
    fetch("./data/jogos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro de rede - Código ${response.status}`);
        }
        return response.json();
      })
      .then((jogosIniciais) => {
        this.arrayJogos = jogosIniciais;
        this.id = jogosIniciais.length;
        localStorage.setItem("arrayJogos", JSON.stringify(this.arrayJogos));
        localStorage.setItem("id", this.id);
        this.listaTabela();
      })
      .catch((error) => console.error(error));
  }

  salvar() {
    let jogo = this.lerDados();
    if (this.validaCampo(jogo)) {
      this.adicionar(jogo);
    }
    this.listaTabela();
    this.limpar();
  }

  listaTabela() {
    localStorage.setItem("id", this.id);
    localStorage.setItem("arrayJogos", JSON.stringify(this.arrayJogos));

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < this.arrayJogos.length; i++) {
      let tr = tbody.insertRow();
      tr.classList.add("row");
      tr.classList.add("id-" + this.arrayJogos[i].id);

      let td_id = tr.insertCell();
      let td_jogo = tr.insertCell();
      let td_descricao = tr.insertCell();
      let td_imagem = tr.insertCell();
      let td_generos = tr.insertCell();
      let td_plataforma = tr.insertCell();
      let td_nota = tr.insertCell();
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

      if (this.arrayJogos[i].nota) {
        td_nota.innerText = this.arrayJogos[i].nota;
      } else {
        td_nota.innerText = "N/A";
      }

      /* edit button */

      let buttonEdit = document.createElement("button");
      buttonEdit.setAttribute(
        "onclick",
        `jogo.editar(${this.arrayJogos[i].id})`
      );
      buttonEdit.setAttribute("title", "Editar");
      buttonEdit.classList.add("edit");
      let imgEdit = document.createElement("img");
      imgEdit.src = "./assets/images/icon-edit.svg";
      buttonEdit.appendChild(imgEdit);

      /* delete button */

      let buttonDelete = document.createElement("button");
      buttonDelete.setAttribute(
        "onclick",
        `jogo.deletar(${this.arrayJogos[i].id})`
      );
      buttonDelete.setAttribute("title", "Excluir");
      buttonDelete.classList.add("delete");
      let imgDelete = document.createElement("img");
      imgDelete.src = "./assets/images/icon-delete.svg";
      buttonDelete.appendChild(imgDelete);

      /* action buttons */

      let actionButtons = document.createElement("div");
      actionButtons.classList.add("actionButtons");
      actionButtons.appendChild(buttonEdit);
      actionButtons.appendChild(buttonDelete);

      /* confirm edit button */

      let buttonConfirm = document.createElement("button");
      buttonConfirm.setAttribute(
        "onclick",
        `jogo.atualizar(${this.arrayJogos[i].id})`
      );
      buttonConfirm.setAttribute(
        "title",
        "Confirmar"
      );
      buttonConfirm.classList.add("confirm");
      let imgConfirm = document.createElement("img");
      imgConfirm.src = "./assets/images/icon-confirm.svg";
      buttonConfirm.appendChild(imgConfirm);

      /* cancel edit button */

      let buttonCancel = document.createElement("button");
      buttonCancel.setAttribute(
        "onclick",
        `jogo.cancelar(${this.arrayJogos[i].id})`
      );
      buttonCancel.classList.add("cancel");
      buttonCancel.setAttribute("title", "Cancelar");
      let imgCancel = document.createElement("img");
      imgCancel.src = "./assets/images/icon-cancel.svg";
      buttonCancel.appendChild(imgCancel);

      /* edit buttons */

      let editButtons = document.createElement("div");
      editButtons.classList.add("editButtons");
      editButtons.appendChild(buttonConfirm);
      editButtons.appendChild(buttonCancel);

      td_acao.appendChild(actionButtons);
      td_acao.appendChild(editButtons);
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
    jogo.nota = document.getElementById("nota").value;
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
    /* imagem agora é opcional */
    // if (jogo.imagem == "") {
    //   msg += "Informe a URL da imagem do jogo \n";
    // }
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

  limpar() {
    document.getElementById("jogo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("generos").value = "";
    document.getElementById("plataforma").value = "";
    document.getElementById("nota").value = "";
  }

  deletar(id) {
    const nome = this.arrayJogos.filter((jogo) => jogo.id == id)[0].nomeJogo;
    let result = confirm(`Excluir o jogo ${nome}?`);
    if (result === true) {
      this.arrayJogos = this.arrayJogos.filter(
        (jogo) => parseInt(jogo.id) !== parseInt(id)
      );
      this.listaTabela();
    }
  }

  editar(id) {
    this.cancelar();
    const row = document.querySelector("#lista .row.id-" + id);

    row.classList.add("edit");
    const nome = this.arrayJogos.filter((jogo) => jogo.id == id)[0].nomeJogo;
    console.log(nome);
  }

  atualizar(id) {
    const nome = this.arrayJogos.filter((jogo) => jogo.id == id)[0].nomeJogo;
    console.log(nome);
  }

  cancelar() {
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

  restaurarJSON() {
    let result = confirm("Restaurar o JSON inicial?");
    if (result === true) {
      localStorage.clear();
      this.inicializarJogos();
    }
  }
}

let jogo = new Jogo();
