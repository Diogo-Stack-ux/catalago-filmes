const apiUrl = 'http://localhost:3000/api/filmes';

const form = document.getElementById('form-filme');
const tabela = document.getElementById('tabela-filmes');

let editandoId = null;

// Carregar filmes na tabela
async function carregarFilmes() {
    const resposta = await fetch(apiUrl);
    const filmes = await resposta.json();

    tabela.innerHTML = '';

    filmes.forEach(filme => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${filme.nome}</td>
            <td>${filme.descricao}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.nota}</td>
            <td>
                <button onclick="editarFilme(${filme.id}, '${filme.nome}', '${filme.descricao}', '${filme.genero}', ${filme.ano}, ${filme.nota})">Editar</button>
                <button onclick="removerFilme(${filme.id})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const filme = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        genero: document.getElementById('genero').value,
        ano: parseInt(document.getElementById('ano').value),
        nota: parseFloat(document.getElementById('nota').value)
    };

    if (editandoId) {
        await fetch(`${apiUrl}/${editandoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filme)
        });
        editandoId = null;
    } else {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filme)
        });
    }

    form.reset();
    carregarFilmes();
});

function editarFilme(id, nome, descricao, genero, ano, nota) {
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('genero').value = genero;
    document.getElementById('ano').value = ano;
    document.getElementById('nota').value = nota;

    editandoId = id;
}

async function removerFilme(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    carregarFilmes();
}

function aplicarFiltros() {
    const nomeFiltro = document.getElementById('filtro-nome').value.toLowerCase();
    const generoFiltro = document.getElementById('filtro-genero').value.toLowerCase();
    const notaFiltro = parseFloat(document.getElementById('filtro-nota').value);

    const linhas = tabela.querySelectorAll('tr');
    linhas.forEach(linha => {
        const [nome, , genero, , nota] = linha.querySelectorAll('td');
        const notaValor = parseFloat(nota.innerText);

        const mostrar =
            (nome.innerText.toLowerCase().includes(nomeFiltro)) &&
            (genero.innerText.toLowerCase().includes(generoFiltro)) &&
            (isNaN(notaFiltro) || notaValor >= notaFiltro);

        linha.style.display = mostrar ? '' : 'none';
    });
}

function limparFiltros() {
    document.getElementById('filtro-nome').value = '';
    document.getElementById('filtro-genero').value = '';
    document.getElementById('filtro-nota').value = '';

    const linhas = tabela.querySelectorAll('tr');
    linhas.forEach(linha => linha.style.display = '');
}

// Carregar filmes ao abrir a página
carregarFilmes();
