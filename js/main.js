async function buscarProdutos() {
    try {
        const resposta = await fetch('./data/produtos.json');
        if (!resposta.ok) throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        const produtos = await resposta.json();
        return produtos;
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
        return [];
    }
}

async function buscarOfertas() {
    try {
        const resposta = await fetch('./data/ofertas.json');
        if (!resposta.ok) throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        const ofertas = await resposta.json();
        return ofertas;
    } catch (erro) {
        console.error("Erro ao buscar ofertas:", erro);
        return [];
    }
}

function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.innerHTML = `
        <img src="${produto.imagens[0]}" alt="Imagem de ${produto.nome}">
        <div class="info">
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <div class="acoes">
                <button onclick="carrinho.adicionar(${produto.id})">Adicionar</button>
                <a href="produto.html?id=${produto.id}" class="btn">Detalhes</a>
            </div>
        </div>
    `;
    return card;
}

function criarCardOferta(oferta) {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.innerHTML = `
        <img src="${oferta.imagens[0]}" alt="Imagem de ${oferta.nome}">
        <div class="info">
            <h3>${oferta.nome}</h3>
            <p class="preco-antigo">R$ ${oferta.preco.toFixed(2).replace('.', ',')}</p>
            <p class="preco">R$ ${oferta.precoOferta.toFixed(2).replace('.', ',')}</p>
            <div class="acoes">
                <button onclick="carrinho.adicionar(${oferta.id})">Adicionar</button>
                <a href="ofertas.html?id=${oferta.id}" class="btn btn-secundario">Detalhes</a>
            </div>
        </div>
    `;
    return card;
}

async function renderizarCatalogo() {
    const todosOsProdutos = await buscarProdutos();
    const termoBusca = document.getElementById('busca').value.toLowerCase();
    const categoriaSelecionada = document.getElementById('filtro-categoria').value;
    const ordenacao = document.getElementById('ordenar').value;

    let produtosFiltrados = todosOsProdutos.filter(produto => {
        const correspondeBusca = produto.nome.toLowerCase().includes(termoBusca);
        const correspondeCategoria = !categoriaSelecionada || produto.categoria === categoriaSelecionada;
        return correspondeBusca && correspondeCategoria;
    });

    if (ordenacao) {
        const [criterio, ordem] = ordenacao.split('-');
        produtosFiltrados = ordenarArray(produtosFiltrados, criterio, ordem);
    }

    const catalogoContainer = document.getElementById('catalogo');
    catalogoContainer.innerHTML = '';

    if (produtosFiltrados.length === 0) {
        catalogoContainer.innerHTML = '<p>Nenhum produto encontrado com esses filtros.</p>';
    } else {
        produtosFiltrados.forEach(produto => {
            const card = criarCardProduto(produto);
            catalogoContainer.appendChild(card);
        });
    }
}

async function renderizarOfertas() {
    const ofertas = await buscarOfertas();
    const containerOfertas = document.getElementById('ofertas-especiais');
    containerOfertas.innerHTML = '';

    if (ofertas.length === 0) {
        containerOfertas.innerHTML = '<p>Nenhuma oferta disponível no momento.</p>';
    } else {
        ofertas.forEach(oferta => {
            const card = criarCardOferta(oferta);
            containerOfertas.appendChild(card);
        });
    }
}

document.getElementById('busca').addEventListener('input', renderizarCatalogo);
document.getElementById('filtro-categoria').addEventListener('change', renderizarCatalogo);
document.getElementById('ordenar').addEventListener('change', renderizarCatalogo);

document.addEventListener('DOMContentLoaded', () => {
    renderizarCatalogo();
    renderizarOfertas();
});
