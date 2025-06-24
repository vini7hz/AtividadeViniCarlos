let formProduto = document.getElementById("formProduto")
let resProduto = document.getElementById("resProduto")
let idProduto = document.getElementById("idProduto")

idProduto.addEventListener("change", () => {
  let id = idProduto.value.trim()
  if (!id) {
    
    resProduto.innerHTML = `<p style="color:red;">Informe o ID do produto.</p>`
    return
  }
  fetch(`http://localhost:8081/produto/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Produto não encontrado")
      return res.json()
    })
    .then(data => {
      document.getElementById("nome").value = data.nome || ""
      document.getElementById("quantidade").value = data.quantidade || ""
      document.getElementById("preco").value = data.preco || ""
      document.getElementById("codEntrega").value = data.entrega?.codEntrega || ""
      resProduto.innerHTML = ""
      idProduto.disabled = true
    })
    .catch(err => {
      resProduto.innerHTML = `<p style="color:red;">${err.message}</p>`
      idProduto.disabled = false
    })
})
formProduto.addEventListener("submit", (e) => {
  e.preventDefault()

  let id = idProduto.value.trim()
  if (!id) {
    alert("Informe o ID do produto antes de atualizar.")
    return
  }
  let produtoAtualizado = {
    nome: document.getElementById("nome").value.trim(),
    quantidade: parseInt(document.getElementById("quantidade").value),
    preco: parseFloat(document.getElementById("preco").value),
    total: parseInt(document.getElementById("quantidade").value) * parseFloat(document.getElementById("preco").value),
    entrega: {
      codEntrega: parseInt(document.getElementById("codEntrega").value)
    }
  }

  if (!produtoAtualizado.nome || isNaN(produtoAtualizado.quantidade) || isNaN(produtoAtualizado.preco) || isNaN(produtoAtualizado.entrega.codEntrega)) {
    resProduto.innerHTML = `<p style="color:red;">Preencha todos os campos corretamente.</p>`
    return
  }

  fetch(`http://localhost:8081/produto/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produtoAtualizado),
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar produto")
      return res.json()
    })
    .then(data => {
      resProduto.innerHTML = `<p style="color:green;">Produto "${data.nome}" atualizado com sucesso!</p>`
      formProduto.reset()
      idProduto.disabled = false
    })
    .catch(err => {
      resProduto.innerHTML = `<p style="color:red;">${err.message}</p>`
    })
})