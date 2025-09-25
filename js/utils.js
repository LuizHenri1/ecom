/**
 * utils.js
 * Funções auxiliares e genéricas que podem ser usadas em qualquer parte do projeto.
 * Não dependem de nenhum outro script.
 */

// Aplica a máscara de CEP (formato 00000-000) a um valor de input.
function mascaraCEP(valor) {
  // Remove tudo que não for dígito para garantir que só temos números.
  const apenasNumeros = valor.replace(/\D/g, '');

  // Aplica o hífen na posição correta.
  if (apenasNumeros.length > 5) {
    // Retorna o valor formatado, limitando o tamanho para 8 dígitos.
    return apenasNumeros.slice(0, 5) + '-' + apenasNumeros.slice(5, 8);
  }

  return apenasNumeros;
}

// Ordena um array de objetos com base em um critério (chave) e uma ordem (asc/desc).
function ordenarArray(array, criterio, ordem = 'asc') {
  // Criamos uma cópia para não modificar o array original. Isso é uma boa prática.
  const copia = [...array];

  copia.sort((a, b) => {
    let valorA = a[criterio];
    let valorB = b[criterio];

    // Para ordenação de texto (como nome), é melhor comparar tudo em minúsculas
    // para evitar que "Z" venha antes de "a".
    if (typeof valorA === 'string') {
      valorA = valorA.toLowerCase();
      valorB = valorB.toLowerCase();
    }

    // Lógica de comparação para ordenação
    if (valorA < valorB) {
      return ordem === 'asc' ? -1 : 1;
    }
    if (valorA > valorB) {
      return ordem === 'asc' ? 1 : -1;
    }
    return 0; // Se forem iguais, não faz nada.
  });

  return copia;
}

// Disponibiliza as funções globalmente para que possam ser chamadas diretamente no HTML
// ou em outros scripts que são carregados na página.
window.mascaraCEP = mascaraCEP;
window.ordenarArray = ordenarArray;