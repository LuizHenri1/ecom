async function buscarOfertas() {
    try {
        const resposta = await fetch('data/ofertas.json');
        if (!resposta.ok) throw new Error(`Erro HTTP! Status: ${resposta.status}`);
        const ofertas = await resposta.json();
        return ofertas;
    } catch (erro) {
        console.error("Erro ao buscar ofertas:", erro);
        return [];
    }
}

async function mostrarDetalhesOferta() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idOferta = Number(parametrosURL.get('id'));
    const secaoDetalhe = document.getElementById('detalhe-oferta');

    if (!idOferta) {
        secaoDetalhe.innerHTML = '<p>Oferta inválida. Por favor, volte para a página inicial e selecione uma oferta.</p>';
        return;
    }

    const todasAsOfertas = await buscarOfertas();
    const oferta = todasAsOfertas.find(o => o.id === idOferta);

    if (!oferta) {
        secaoDetalhe.innerHTML = '<p>Ops! Não encontramos a oferta que você está procurando.</p>';
        return;
    }

    document.title = `${oferta.nome} | GamerStore`;

    const galeriaHtml = oferta.imagens.map((imgSrc, index) => `
        <img 
            src="${imgSrc}" 
            alt="Imagem ${index + 1} de ${oferta.nome}" 
            onclick="trocarImagemPrincipalOferta(this, '${imgSrc}')"
        >
    `).join('');

    secaoDetalhe.innerHTML = `
        <div class="imagem-container">
            <div class="imagem-principal">
                <img src="${oferta.imagens[0]}" alt="Imagem principal de ${oferta.nome}">
            </div>
            <div class="galeria">
                ${galeriaHtml}
            </div>
        </div>
        <div class="info-produto">
            <h2>${oferta.nome}</h2>
            <p>${oferta.descricao}</p>
            <p class="preco-antigo">R$ ${oferta.preco.toFixed(2).replace('.', ',')}</p>
            <p class="preco-detalhe">R$ ${oferta.precoOferta.toFixed(2).replace('.', ',')}</p>
            <button class="btn-adicionar" onclick="carrinho.adicionar(${oferta.id}, 'oferta')">Adicionar ao carrinho</button>
        </div>
    `;

    const primeiraMiniatura = secaoDetalhe.querySelector('.galeria img');
    if (primeiraMiniatura) primeiraMiniatura.classList.add('active');
}

function trocarImagemPrincipalOferta(miniaturaClicada, novaUrl) {
    const imagemPrincipal = document.querySelector('.imagem-principal img');
    imagemPrincipal.src = novaUrl;

    const todasMiniaturas = document.querySelectorAll('.galeria img');
    todasMiniaturas.forEach(img => img.classList.remove('active'));

    miniaturaClicada.classList.add('active');
}

document.addEventListener('DOMContentLoaded', mostrarDetalhesOferta);
