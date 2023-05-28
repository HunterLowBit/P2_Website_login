/**
 * Função para calcular o dobro de um número.
 * @param {number} numero - O número a ser dobrado.
 * @returns {number} - O dobro do número fornecido.
 */
function calcularDobro(numero) {
  console.log("Função calcularDobro:", numero);
  return numero * 2;
}

document
  .getElementById("exercicio1")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário
    const numero = Number(document.getElementById("numeroInput").value);
    console.log("Número fornecido:", numero);
    const dobro = calcularDobro(numero);
    console.log("Dobro calculado:", dobro);
    document.getElementById("resultado").innerText = "O dobro é: " + dobro;
  });

/**
 * Função para exibir as informações de um usuário na página HTML.
 * @param {User} user - O objeto de usuário contendo nome, idade e e-mail.
 * @returns {void}
 */
function exibirTexto(user) {
  console.log("Função exibirTexto:", user);
  const divElement = document.getElementById("exercicio2");
  divElement.innerHTML = `<p>Nome: ${user.name}</p><p>Idade: ${user.age}</p><p>E-mail: ${user.email}</p>`;
}

/**
 * Função principal do programa.
 * Solicita informações do usuário e chama a função exibirTexto para exibir na página HTML.
 * @returns {void}
 */
function main() {
  console.log("Função main: iniciada");
  /**
   * @typedef {Object} User - O objeto de usuário.
   * @property {string} name - O nome do usuário.
   * @property {number} age - A idade do usuário.
   * @property {string} email - O e-mail do usuário.
   */

  const user = {
    name: prompt("Digite seu nome:"),
    age: Number(prompt("Digite sua idade:")),
    email: prompt("Digite seu e-mail:"),
  };

  console.log("Usuário fornecido:", user);
  exibirTexto(user);
}

main();

/**
 * Classe Produto representa um produto com nome, preço e quantidade em estoque.
 */
class Produto {
  /**
   * Cria uma instância da classe Produto.
   * @param {string} nome - O nome do produto.
   * @param {number} preco - O preço do produto.
   * @param {number} quantidadeEstoque - A quantidade em estoque do produto.
   */
  constructor(nome, preco, quantidadeEstoque) {
    this.nome = nome;
    this.preco = preco;
    this.quantidadeEstoque = quantidadeEstoque;
  }

  /**
   * Retorna uma string com as informações do produto.
   * @returns {string} - As informações do produto.
   */
  exibirInformacoes() {
    return `Nome: ${this.nome}, Preço: ${this.preco}, Quantidade em estoque: ${this.quantidadeEstoque}`;
  }
}

/**
 * Função para adicionar um produto à lista de produtos na página HTML.
 * @param {Event} event - O evento de submit.
 * @returns {void}
 */
function adicionarProduto(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeInput").value;
  const precoText = document.getElementById("precoInput").value;
  const quantidade = Number(document.getElementById("quantidadeInput").value);

  const preco = parseFloat(precoText.replace(",", "."));

  if (isNaN(preco)) {
    alert("Por favor, insira um valor de preço válido.");
    return;
  }

  const novoProduto = new Produto(nome, preco, quantidade);

  const produtoList = document.getElementById("produtoList");
  const produtoItem = document.createElement("li");
  produtoItem.innerText = novoProduto.exibirInformacoes();
  produtoList.appendChild(produtoItem);

  console.log("Produto adicionado:", novoProduto);
  document.getElementById("exercicio3").reset();
}

document
  .getElementById("exercicio3")
  .addEventListener("submit", adicionarProduto);

/**
 * Função para converter um texto para letras maiúsculas.
 * @param {string} texto - O texto a ser convertido.
 * @returns {string} - O texto convertido para letras maiúsculas.
 */
function converterParaMaiusculas(texto) {
  console.log("Função converterParaMaiusculas:", texto);
  return texto.toUpperCase();
}

/**
 * Função para aplicar a conversão para maiúsculas em um texto e exibir na página HTML.
 * @param {Event} event - O evento de submit.
 * @returns {void}
 */
function aplicarConversao(event) {
  event.preventDefault();

  const texto = document.getElementById("textoInput").value;
  console.log("Texto fornecido:", texto);
  const textoConvertido = converterParaMaiusculas(texto);

  console.log("Texto convertido:", textoConvertido);
  document.getElementById("resultadoMaiusculas").innerText = textoConvertido;
}

document
  .getElementById("exercicio4")
  .addEventListener("submit", aplicarConversao);
