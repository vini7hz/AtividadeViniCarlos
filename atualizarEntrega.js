let idEntrega = document.getElementById("idEntrega")
let cep = document.getElementById("cep")
let logradouro = document.getElementById("logradouro")
let complemento = document.getElementById("complemento")
let bairro = document.getElementById("bairro")
let localidade = document.getElementById("localidade")
let uf = document.getElementById("uf")
let nomeEntrega = document.getElementById("nomeEntrega")


idEntrega.addEventListener("change", () => {
  let id = idEntrega.value.trim()

  fetch(`http://localhost:8081/entrega/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Entrega não encontrada.")
      return res.json()
    })
    .then(data => {
      logradouro.value = data.logradouro || ""
      complemento.value = data.complemento || ""
      bairro.value = data.bairro || ""
      localidade.value = data.localidade || ""
      uf.value = data.uf || ""
      nomeEntrega.value = data.nomeResponsavel || ""
      idEntrega.disabled = true
    })
    .catch(err => {
      resEntrega.innerHTML = `<p style="color:red;">${err.message}</p>`
    })
})

cep.addEventListener("click", () => {
  let cepValor = cep.value.replace(/\D/g, "")

  if (cepValor.length !== 8) {
    alert("CEP inválido.")
    return
  }

  fetch(`https://viacep.com.br/ws/${cepValor}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado.")
        return
      }

      logradouro.value = data.logradouro || ""
      bairro.value = data.bairro || ""
      localidade.value = data.localidade || ""
      uf.value = data.uf || ""
    })
    .catch(() => alert("Erro ao buscar CEP."))
})

formEntrega.addEventListener("submit", (e) => {
  e.preventDefault()

  let id = idEntrega.value.trim()

  let entrega = {
    logradouro: logradouro.value.trim(),
    complemento: complemento.value.trim(),
    bairro: bairro.value.trim(),
    localidade: localidade.value.trim(),
    uf: uf.value.trim(),
    nomeResponsavel: nomeEntrega.value.trim()
  }

  fetch(`http://localhost:8081/entrega/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entrega)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar entrega.")
      return res.json()
    })
    .then(data => {
      resEntrega.innerHTML = `<p style="color:green;">Entrega "${data.nomeResponsavel}" atualizada com sucesso!</p>`
      formEntrega.reset()
      idEntrega.disabled = false
    })
    .catch(err => {
      resEntrega.innerHTML = `<p style="color:red;">${err.message}</p>`
    })
})