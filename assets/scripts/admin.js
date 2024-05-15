class Jogo {
  constructor() {
    // Inicializa o ID e a lista de jogos e utiliza localStorage para armazenar as informações
    this.id = localStorage.getItem("id") ? localStorage.getItem("id") : 0;
    this.arrayJogos = localStorage.getItem("arrayJogos") ? JSON.parse(localStorage.getItem("arrayJogos")) : [];
  }

  // Método para salvar um novo jogo
  salvar() {
    // Lê os dados do jogo a partir dos campos de entrada
    let jogo = this.lerDados();
    // Valida os dados do jogo
    if (this.validaCampo(jogo)) {
      // Se os dados forem válidos, adiciona o jogo à lista
      this.adicionar(jogo);
    }

    // Atualiza a tabela na página com a lista de jogos
    this.listaTabela();
    // Limpa os campos de entrada
    this.cancelar();
  }

  // Método para listar os jogos na tabela HTML
  listaTabela() {
    localStorage.setItem("id", this.id);
    localStorage.setItem("arrayJogos", JSON.stringify(this.arrayJogos));

    // Obtém a referência ao corpo da tabela
    let tbody = document.getElementById("tbody");
    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = "";

    // Loop através dos jogos na lista
    for (let i = 0; i < this.arrayJogos.length; i++) {
      // Cria uma nova linha na tabela
      let tr = tbody.insertRow();

      // Insere as células da linha com os dados do jogo
      let td_id = tr.insertCell();
      let td_jogo = tr.insertCell();
      let td_descricao = tr.insertCell();
      let td_acao = tr.insertCell();

      td_id.innerText = this.arrayJogos[i].id;
      td_jogo.innerText = this.arrayJogos[i].nomeJogo;
      td_descricao.innerText = this.arrayJogos[i].descricao;

      // Cria botões de edição e exclusão para cada jogo
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

  // Método para adicionar um novo jogo à lista
  adicionar(jogo) {
    this.arrayJogos.push(jogo);
    // Incrementa o ID para o próximo jogo
    this.id++;
  }

  // Método para ler os dados do jogo dos campos de entrada
  lerDados() {
    let jogo = {};
    jogo.id = this.id;
    jogo.nomeJogo = document.getElementById("jogo").value;
    jogo.descricao = document.getElementById("descricao").value;
    return jogo;
  }

  // Método para validar os campos obrigatórios do jogo
  validaCampo(jogo) {
    let msg = "";
    if (jogo.nomeJogo == "") {
      msg += "Informe o nome do jogo \n";
    }
    if (jogo.descricao == "") {
      msg += "Informe o descrição do jogo";
    }

    if (msg != "") {
      // Exibe uma mensagem de alerta se algum campo estiver vazio
      alert(msg);
      return false;
    }
    return true;
  }

  // Método para limpar os campos de entrada
  cancelar() {
    document.getElementById("jogo").value = "";
    document.getElementById("descricao").value = "";
  }

  // Método para deletar um jogo da lista
  deletar(id) {
    // Filtra os jogos, removendo o jogo com o ID especificado
    this.arrayJogos = this.arrayJogos.filter((jogo) => parseInt(jogo.id) !== parseInt(id));
    console.log(id);
    // Atualiza a tabela na página com a lista atualizada de jogos
    this.listaTabela();
  }
}

// Cria uma nova instância da classe Jogo
let jogo = new Jogo();

// Se tiver jogos salvos no localStorage vai listar assim que carrega a página
jogo.listaTabela();
