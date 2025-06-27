let cep = document.getElementById("cep")
let carregarCep = document.getElementById("carregarCep")
let logradouro = document.getElementById("logradouro")
let complemento = document.getElementById("complemento")
let bairro = document.getElementById("bairro")
let localidade = document.getElementById("localidade")
let uf = document.getElementById("uf")
let nomeEntrega = document.getElementById("nomeEntrega")


carregarCep.addEventListener("click", (e) => {
  e.preventDefault()

  let cepValor = cep.value.replace(/\D/g, "")
  if (cepValor.length !== 8) {
    alert("CEP inválido.")
    return
  }
  fetch(`https://viacep.com.br/ws/${cepValor}/json/`)
    .then((res) => {
      if (!res.ok) {
        alert("Erro ao buscar CEP.")
        return null
      }
      return res.json()
    })
    .then((data) => {
      if (!data) return
      if (data.erro) {
        alert("CEP não encontrado.")
        return
      }
      logradouro.value = data.logradouro || ""
      bairro.value = data.bairro || ""
      localidade.value = data.localidade || ""
      uf.value = data.uf || ""
    })
    .catch(() => {
      alert("Erro ao buscar CEP.")
    })
})

formFabricante.addEventListener("submit", (e) => {
  e.preventDefault()

  let entrega = {
    logradouro: logradouro.value.trim(),
    complemento: complemento.value.trim(),
    bairro: bairro.value.trim(),
    localidade: localidade.value.trim(),
    uf: uf.value.trim(),
    nomeResponsavel: nomeEntrega.value.trim()
  }

  resFabricante.innerHTML = ""
  fetch("http://localhost:8081/entrega", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entrega),
  })
    .then(async (res) => {
      if (!res.ok) {
        const textoErro = await res.text()
        resFabricante.innerHTML = `<p style="color:red;">Erro ao cadastrar entrega. Status: ${res.status}<br>${textoErro}</p>`
        return null
      }
      return res.json()
    })
    .then((data) => {
      if (!data) return
      resFabricante.innerHTML = `<p style="color:green;">Entrega cadastrada com sucesso para: ${data.nomeResponsavel}</p>`
      formFabricante.reset()
    })
    .catch((error) => {
      resFabricante.innerHTML = `<p style="color:red;">Erro ao cadastrar entrega: ${error.message}</p>`
    })
})
