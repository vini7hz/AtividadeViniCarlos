let form = document.getElementById("formProduto")
let res = document.getElementById("resProduto")
let id = document.getElementById("idProduto")

id.addEventListener("change", (e) => {
  fetch(`http://localhost:8081/produto/${id.value}`)
    .then(r => r.json())
    .then(d => {
      nome.value = d.nome
      quantidade.value = d.quantidade
      preco.value = d.preco
      codEntrega.value = d.entrega.codEntrega
      id.disabled = true
    })
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let produto = {
    nome: nome.value,
    quantidade: +quantidade.value,
    preco: +preco.value,
    total: +quantidade.value * +preco.value,
    entrega: { codEntrega: +codEntrega.value }
  }
  
  fetch(`http://localhost:8081/produto/${id.value}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  })
    .then(r => r.json())
    .then(d => {
      res.innerHTML = `<p style="color:green;">Produto "${d.nome}" atualizado!</p>`
      form.reset()
      id.disabled = false
    })
    .catch(() => res.innerHTML = `<p style="color:red;">Erro ao atualizar</p>`)
})
