let carregar = document.getElementById('carregarProdutos')
let tabela = document.getElementById('tabelaProdutos')
let corpo = tabela.querySelector('tbody')

carregar.addEventListener('click', (e) => {
  e.preventDefault();

  fetch('http://localhost:8081/produto')
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        alert(`Erro ao buscar produtos! Status ${resp.status}`)
        return null
      }
    })
    .then(produtos => {
      if (!produtos) return

      corpo.innerHTML = ''

      if (produtos.length === 0) {
        corpo.innerHTML = `<tr><td colspan="5">Nenhum produto encontrado.</td></tr>`;
        tabela.classList.remove('hidden')
        return
      }

      produtos.forEach(produto => {
        let linha = document.createElement('tr');
        let total = (produto.preco * produto.quantidade).toFixed(2);

        linha.innerHTML = `
          <td>${produto.codProduto || "—"}</td>
          <td>${produto.nome || "—"}</td>
          <td>${produto.quantidade || 0}</td>
          <td>R$ ${produto.preco?.toFixed(2) || "0.00"}</td>
          <td>R$ ${total}</td>
        `;

        corpo.appendChild(linha)
      });

      tabela.classList.remove('hidden')
    })
    .catch(err => {
      console.error('Erro ao buscar produtos!', err)
      alert('Erro ao buscar produtos!')
    })
})