document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastro-cliente");
  const tabelaClientes = document.getElementById("tabela-clientes");
  const incluirButton = document.getElementById("incluir");
  const limparButton = document.getElementById("limpar");
  const confirmarButton = document.getElementById("confirmar");

  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
  const regexCEP = /^\d{5}-\d{3}$/;

  const clientes = [];

  if (tabelaClientes.rows.length === 0) {
    const cabecalho = tabelaClientes.insertRow(0);
    cabecalho.innerHTML = `
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Data de Nascimento</th>
        <th>CEP</th>
        <th>Endereço</th>
        <th>N°</th>
        <th>Cidade</th>
        <th>Tipo de Cliente</th>
        <th>Ação</th>
      `;
  }

  incluirButton.addEventListener("click", () => {
    if (validarCampos()) {
      const cliente = {
        nome: form.nome.value,
        sobrenome: form.sobrenome.value,
        dataNascimento: form['data-nascimento'].value,
        cep: form.cep.value,
        endereco: form.endereco.value,
        numeroCasa: form['numero-casa'].value,
        cidade: form.cidade.value,
        tipoCliente: form['tipo-cliente'].value,
      };

      clientes.push(cliente);

      atualizarTabela();

      limparFormulario();
    }
  });

  function validarCampos() {
    const campos = ["nome", "sobrenome", "data-nascimento", "cep", "endereco", "numero-casa", "cidade", "tipo-cliente"];

    for (const campo of campos) {
      const input = form[campo];
      if (input.value.trim() === "") {
        alert(`O campo ${campo.replace('-', ' ')} é obrigatório.`);
        input.focus();
        return false;
      }
    }

    if (!regexNome.test(form.nome.value)) {
      alert("Nome inválido. Use apenas letras e espaços.");
      return false;
    }

    if (!regexNome.test(form.sobrenome.value)) {
      alert("Sobrenome inválido. Use apenas letras e espaços.");
      return false;
    }

    if (!regexCEP.test(form.cep.value)) {
      alert("CEP inválido. Use o formato 00000-000.");
      return false;
    }

    return true;
  }

  form.cep.addEventListener("input", function () {
    let cepValue = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos do CEP
    if (cepValue.length > 5) {
      cepValue = cepValue.substring(0, 5) + "-" + cepValue.substring(5, 8);
    }
    this.value = cepValue;

    if (cepValue.length === 9) {
      // Construa a URL da API ViaCEP
      const url = `https://viacep.com.br/ws/${cepValue}/json/`;

      // Faça uma solicitação à API ViaCEP
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            form.endereco.value = data.logradouro;
            form.cidade.value = data.localidade;
          } else {
            alert("CEP não encontrado.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do CEP:", error);
        });
    } else {
      form.endereco.value = "";
      form.cidade.value = "";
    }
  });

  function editarCliente(index) {
    const cliente = clientes[index];

    form.nome.value = cliente.nome;
    form.sobrenome.value = cliente.sobrenome;
    form['data-nascimento'].value = cliente.dataNascimento;
    form.cep.value = cliente.cep;
    form.endereco.value = cliente.endereco;
    form['numero-casa'].value = cliente.numeroCasa;
    form.cidade.value = cliente.cep;
    form['tipo-cliente'].value = cliente.tipoCliente;

    // Remova o cliente da lista enquanto estiver editando
    clientes.splice(index, 1);
    atualizarTabela();
  }

  function atualizarTabela() {
    tabelaClientes.innerHTML = "";

    if (clientes.length > 0) {
      const headerRow = tabelaClientes.insertRow(0);
      for (const key in clientes[0]) {
        const cell = headerRow.insertCell();
        cell.innerText = key.charAt(0).toUpperCase() + key.slice(1);
      }

      clientes.forEach((cliente, index) => {
        const row = tabelaClientes.insertRow(index + 1);

        for (const key in cliente) {
          const cell = row.insertCell();
          cell.innerText = cliente[key];
        }

        const actionsCell = row.insertCell();
        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.className = "excluir-button";
        excluirButton.addEventListener("click", () => excluirCliente(index));
        actionsCell.appendChild(excluirButton);

        const alterarButton = document.createElement("button");
        alterarButton.textContent = "Alterar";
        alterarButton.className = "alterar-button";
        alterarButton.addEventListener("click", () => editarCliente(index));
        actionsCell.appendChild(alterarButton);
      });
    }
  }

  function excluirCliente(index) {
    clientes.splice(index, 1);
    atualizarTabela();
  }

  limparButton.addEventListener("click", () => {
    limparFormulario();
  });

  function limparFormulario() {
    form.reset();
  }

  confirmarButton.addEventListener("click", () => {
    if (clientes.length === 0) {
      alert("Nenhum cliente cadastrado para confirmar.");
    } else {
      alert("Feito!.");
    }
  });
});


