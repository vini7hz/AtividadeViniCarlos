let formProduto = document.getElementById("formProduto")
let resProduto = document.getElementById("resProduto")

formProduto.addEventListener("submit", (e) => {
  e.preventDefault()

  let nome = document.getElementById("nome").value.trim()
  let quantidade = parseInt(document.getElementById("quantidade").value)
  let preco = parseFloat(document.getElementById("preco").value)
  let codEntrega = parseInt(document.getElementById("codEntrega").value)

  let total = quantidade * preco

  let produto = {
    nome: nome,
    quantidade: quantidade,
    preco: preco,
    total: total,
    entrega: {
      codEntrega: codEntrega,
    },
  }

  resProduto.innerHTML = ""

  fetch("http://localhost:8081/produto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  })
    .then(async (res) => {
      if (!res.ok) {
        return null
      }
      return res.json()
    })
    .then((data) => {
      if (!data) return
      resProduto.innerHTML = `<p style="color:green;">Produto "${data.nome}" cadastrado com sucesso!</p>`
      formProduto.reset()
    })
    .catch((error) => {
      resProduto.innerHTML = `<p style="color:red;">Erro ao cadastrar produto: ${error.message}</p>`
    })
})
