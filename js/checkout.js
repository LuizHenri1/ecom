async function renderizarResumoCarrinho() {
    const resumoContainer = document.getElementById('resumo-carrinho');
    const itens = await carrinho.obterItensComDetalhes();

    if (itens.length === 0) {
        resumoContainer.innerHTML = '<h2>Resumo do Pedido</h2><p>Seu carrinho está vazio.</p>';
        document.getElementById('formulario-checkout').style.display = 'none';
        return;
    }

    const total = await carrinho.calcularTotal();

    const linhasTabela = itens.map(item => `
    <tr>
      <td data-label="Produto">
        <div class="produto-info">
          <img src="${item.imagens[0]}" alt="${item.nome}">
          <span>${item.nome}</span>
        </div>
      </td>
      <td data-label="Qtd">
        <input 
          type="number" 
          value="${item.qtd}" 
          min="1" 
          onchange="handleAlterarQuantidade(${item.id}, this.value)"
        >
      </td>
      <td data-label="Preço Unit.">R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
      <td data-label="Subtotal">R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</td>
      <td data-label="Ações">
        <button class="btn-remover" onclick="handleRemoverItem(${item.id})">Remover</button>
      </td>
    </tr>
  `).join('');

    resumoContainer.innerHTML = `
    <h2>Resumo do Pedido</h2>
    <table class="tabela-carrinho">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Qtd</th>
          <th>Preço Unit.</th>
          <th>Subtotal</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${linhasTabela}
      </tbody>
    </table>
    <p class="total-carrinho">Total: R$ ${total.toFixed(2).replace('.', ',')}</p>
  `;
}

async function handleRemoverItem(idProduto) {
    const container = document.getElementById('mensagem-remover');

    carrinho.remover(idProduto);
    await renderizarResumoCarrinho();

    container.innerText = 'Item removido do carrinho!';
    container.classList.add('show');

    setTimeout(() => {
        container.classList.remove('show');
    }, 2000);
}

const formulario = document.getElementById('formulario-checkout');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    carrinho.limpar();

    formulario.innerHTML = `
    <div class="msg-sucesso">
      <h3>Pedido realizado com sucesso!</h3>
      <p>Você será redirecionado para a página inicial em 5 segundos.</p>
    </div>
  `;

    setTimeout(() => { window.location.href = 'index.html'; }, 5000);
});

const inputCep = document.getElementById('cep');
inputCep.addEventListener('input', (evento) => { /* ... */ });
async function buscarEnderecoPorCEP(cep) { /* ... */ }

document.addEventListener('DOMContentLoaded', renderizarResumoCarrinho);
