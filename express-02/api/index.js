const express = require("express");
const app = express();

const citacoes = [
{autor: "Albert Einstein", citacao: "A imaginação é mais importante que o conhecimento."},
{autor: "Isaac Newton", citacao: "Se vi mais longe foi por estar sobre ombros de gigantes."},
{autor: "Marie Curie", citacao: "Nada na vida deve ser temido, apenas compreendido."},
{autor: "Galileu Galilei", citacao: "E pur si muove."},
{autor: "Nikola Tesla", citacao: "O presente é deles; o futuro é meu."},
{autor: "Charles Darwin", citacao: "Não é o mais forte que sobrevive, mas o que melhor se adapta."},
{autor: "Stephen Hawking", citacao: "A inteligência é a capacidade de se adaptar à mudança."},
{autor: "Carl Sagan", citacao: "Somos poeira das estrelas."},
{autor: "Richard Feynman", citacao: "Se você não consegue explicar algo de forma simples, não entendeu bem."},
{autor: "Niels Bohr", citacao: "Previsão é muito difícil, especialmente sobre o futuro."},
{autor: "Max Planck", citacao: "A ciência avança funeral por funeral."},
{autor: "Louis Pasteur", citacao: "A sorte favorece a mente preparada."},
{autor: "Gregor Mendel", citacao: "A ciência exige paciência e observação."},
{autor: "Rosalind Franklin", citacao: "A ciência e a vida cotidiana não podem ser separadas."},
{autor: "James Clerk Maxwell", citacao: "A verdadeira lógica deste mundo está no cálculo de probabilidades."},
{autor: "Michael Faraday", citacao: "Nada é maravilhoso demais para ser verdade."},
{autor: "Johannes Kepler", citacao: "A natureza ama a simplicidade."},
{autor: "Enrico Fermi", citacao: "Nunca confie em um experimento até que seja confirmado pela teoria."},
{autor: "Paul Dirac", citacao: "As leis da física devem ter beleza matemática."},
{autor: "Erwin Schrödinger", citacao: "A consciência não pode ser explicada em termos físicos."},
{autor: "Werner Heisenberg", citacao: "O que observamos não é a natureza em si, mas a natureza exposta ao nosso método de questionamento."},
{autor: "Ada Lovelace", citacao: "A máquina analítica tece padrões algébricos."},
{autor: "Alan Turing", citacao: "Às vezes são as pessoas que ninguém imagina que farão algo que fazem coisas que ninguém imagina."},
{autor: "Tim Berners-Lee", citacao: "A Web é mais uma criação social do que técnica."},
{autor: "Grace Hopper", citacao: "A frase mais perigosa da língua é: sempre fizemos assim."},
{autor: "Katherine Johnson", citacao: "Gostava de aprender coisas novas."},
{autor: "Jane Goodall", citacao: "O que você faz faz diferença."},
{autor: "Rachel Carson", citacao: "Na natureza nada existe sozinho."},
{autor: "Alexander Fleming", citacao: "Às vezes encontramos o que não procurávamos."},
{autor: "Dmitri Mendeleev", citacao: "Os elementos, se organizados corretamente, revelam padrões."}
];

app.get("/", (req, res) => {
res.send("API de citações e números aleatórios funcionando!");
});

app.get("/random", (req, res) => {
const numero = Math.floor(Math.random() * 100) + 1;
res.send(numero.toString());
});

app.get("/dado", (req, res) => {
const dado = Math.floor(Math.random() * 6) + 1;
res.send(dado.toString());
});

app.get("/citacoes", (req, res) => {
const indice = Math.floor(Math.random() * citacoes.length);
res.send(citacoes[indice]);
});

module.exports = app;

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});