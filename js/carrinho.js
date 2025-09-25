class Carrinho {
    constructor() {
        this.chaveStorage = 'carrinhoGamerStore';
        this.itens = this.obterDoStorage();
        this.atualizarContadorVisual();
    }

    obterDoStorage() {
        const carrinhoString = localStorage.getItem(this.chaveStorage);
        return carrinhoString ? JSON.parse(carrinhoString) : [];
    }

    salvarNoStorage() {
        localStorage.setItem(this.chaveStorage, JSON.stringify(this.itens));
        this.atualizarContadorVisual();
    }

    atualizarContadorVisual() {
        const contadorElemento = document.getElementById('contador-carrinho');
        if (!contadorElemento) return;
        const totalItens = this.itens.reduce((soma, item) => soma + item.qtd, 0);
        contadorElemento.innerText = totalItens;
    }

<<<<<<< HEAD
    adicionar(idProduto) {
        const idNumerico = Number(idProduto);
        const itemExistente = this.itens.find(item => item.id === idNumerico);
        if (itemExistente) {
            itemExistente.qtd++;
        } else {
            this.itens.push({ id: idNumerico, qtd: 1 });
        }
        this.salvarNoStorage();
        const container = document.getElementById('mensagem-carrinho');
        container.innerText = 'Produto adicionado ao carrinho!';
        container.classList.add('show');
        setTimeout(() => {
            container.classList.remove('show');
        }, 1250);
    }

    remover(idProduto) {
        const idNumerico = Number(idProduto);
        this.itens = this.itens.filter(item => item.id !== idNumerico);
        this.salvarNoStorage();
    }

    alterarQuantidade(idProduto, novaQuantidade) {
        const idNumerico = Number(idProduto);
        const qtdNumerica = Number(novaQuantidade);
        const item = this.itens.find(i => i.id === idNumerico);

        if (item) {
            if (qtdNumerica > 0) {
                item.qtd = qtdNumerica;
            } else {
                this.remover(idNumerico);
=======
    // CORRIGIDO: Valor padrão de 'tipo' agora é 'produto'
    adicionar(id, tipo = 'produto') {
        // A busca agora usa o 'tipo' correto ('produto' ou 'oferta')
        const itemExistente = this.itens.find(item => item.id === id && item.tipo === tipo);
        if (itemExistente) {
            itemExistente.qtd++;
        } else {
            this.itens.push({ id, tipo, qtd: 1 });
        }
        this.salvarNoStorage();
        const container = document.getElementById('mensagem-carrinho');
        // A mensagem agora diferencia corretamente
        container.innerText = tipo === 'oferta' ? 'Oferta adicionada ao carrinho!' : 'Produto adicionado ao carrinho!';
        container.classList.add('show');
        setTimeout(() => container.classList.remove('show'), 1250);
    }

    // CORRIGIDO: Valor padrão de 'tipo' agora é 'produto'
    remover(id, tipo = 'produto') {
        // O filtro agora usa o 'tipo' correto ('produto' ou 'oferta')
        this.itens = this.itens.filter(item => !(item.id === id && item.tipo === tipo));
        this.salvarNoStorage();
    }

    // CORRIGIDO: Valor padrão de 'tipo' agora é 'produto'
    alterarQuantidade(id, novaQuantidade, tipo = 'produto') {
        const item = this.itens.find(i => i.id === id && i.tipo === tipo);
        if (item) {
            if (novaQuantidade > 0) {
                item.qtd = Number(novaQuantidade);
            } else {
                // Ao remover, passa o 'tipo' correto
                this.remover(id, tipo);
>>>>>>> 232a561 (Feat: Ofertas)
            }
            this.salvarNoStorage();
        }
    }

    limpar() {
        this.itens = [];
        this.salvarNoStorage();
    }

    async obterItensComDetalhes() {
        if (this.itens.length === 0) return [];
<<<<<<< HEAD
        try {
            const resposta = await fetch('./data/produtos.json');
            if (!resposta.ok) {
                throw new Error(`Erro HTTP! Status: ${resposta.status}`);
            }
            const todosOsProdutos = await resposta.json();
            return this.itens.map(itemNoCarrinho => {
                const detalhesDoProduto = todosOsProdutos.find(p => p.id === itemNoCarrinho.id);
                return { ...detalhesDoProduto, qtd: itemNoCarrinho.qtd };
            });
        } catch (erro) {
            console.error("Erro ao buscar detalhes dos produtos:", erro);
=======

        try {
            const respostaProdutos = await fetch('./data/produtos.json');
            const produtos = respostaProdutos.ok ? await respostaProdutos.json() : [];

            const respostaOfertas = await fetch('./data/ofertas.json');
            const ofertas = respostaOfertas.ok ? await respostaOfertas.json() : [];

            return this.itens.map(itemNoCarrinho => {
                let detalhes;
                // A lógica aqui deve ser clara: tipo 'produto' OU 'oferta'
                if (itemNoCarrinho.tipo === 'produto') {
                    detalhes = produtos.find(p => p.id === itemNoCarrinho.id);
                    // O retorno deve usar o tipo correto, não a string 'produto' & 'ofertas'
                    return { ...detalhes, qtd: itemNoCarrinho.qtd, precoUnit: detalhes.preco, tipo: 'produto' };
                } else { // Presume que qualquer outra coisa é 'oferta'
                    detalhes = ofertas.find(o => o.id === itemNoCarrinho.id);
                    return { ...detalhes, qtd: itemNoCarrinho.qtd, precoUnit: detalhes.precoOferta, tipo: 'oferta' };
                }
            }).filter(item => item && item.id); // Remove itens que não foram encontrados (detalhes = undefined)
        } catch (erro) {
            console.error("Erro ao buscar itens do carrinho:", erro);
>>>>>>> 232a561 (Feat: Ofertas)
            return [];
        }
    }

    async calcularTotal() {
        const itensComDetalhes = await this.obterItensComDetalhes();
<<<<<<< HEAD
        return itensComDetalhes.reduce((total, item) => total + (item.preco * item.qtd), 0);
    }
}

const carrinho = new Carrinho();
=======
        return itensComDetalhes.reduce((total, item) => total + (item.precoUnit * item.qtd), 0);
    }
}

const carrinho = new Carrinho();
>>>>>>> 232a561 (Feat: Ofertas)
