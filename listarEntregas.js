let carregar = document.getElementById('carregarEntregas')
let tabela = document.getElementById('tabelaEntregas')
let corpo = tabela.querySelector('tbody')
let resEntregas = document.getElementById('resEntregas')

carregar.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('http://localhost:8081/entrega')
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        alert(`Erro ao buscar entregas! Status ${resp.status}`)
        return null
      }
    })
    .then(entregas => {
      if (!entregas) return
      corpo.innerHTML = ''
      entregas.forEach(entrega => {
        let linha = document.createElement('tr')

        linha.innerHTML = `
          <td>${entrega.codEntrega || "—"}</td>
          <td>${entrega.logradouro || "—"}</td>
          <td>${entrega.complemento || "—"}</td>
          <td>${entrega.bairro || "—"}</td>
          <td>${entrega.localidade || "—"}</td>
          <td>${entrega.uf || "—"}</td>
          <td>${entrega.nomeResponsavel || "—"}</td>
        `

        corpo.appendChild(linha)
      })

      tabela.classList.remove('hidden')
    })
    .catch(err => {
      console.error('Erro ao buscar entregas!', err)
      alert('Erro ao buscar entregas!')
    })
})
