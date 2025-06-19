const API_URL = 'http://localhost:3000/api/filmes';
let editandoId = null;

async function carregarFilmes() {
    try {
        const resposta = await fetch(API_URL);
        const filmes = await resposta.json();

        // Verifica se é realmente um array
        if (!Array.isArray(filmes)) {
            throw new Error('Resposta inesperada da API');
        }

        const tabela = document.getElementById('tabela-filmes');
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
                    <button onclick="editarFilme(${filme.id})">✏️</button>
                    <button onclick="excluirFilme(${filme.id})">🗑️</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    } catch (erro) {
        console.error('Erro ao carregar filmes:', erro);
    }
}

async function excluirFilme(id) {
    if (confirm('Tem certeza que deseja excluir este filme?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarFilmes();
    }
}

function editarFilme(id) {
    fetch(API_URL)
        .then(res => res.json())
        .then(filmes => {
            const filme = filmes.find(f => f.id === id);
            if (filme) {
                document.getElementById('nome').value = filme.nome;
                document.getElementById('descricao').value = filme.descricao;
                document.getElementById('genero').value = filme.genero;
                document.getElementById('ano').value = filme.ano;
                document.getElementById('nota').value = filme.nota;
                editandoId = filme.id;
            }
        });
}

document.getElementById('form-filme').addEventListener('submit', async (e) => {
    e.preventDefault();

    const filme = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        genero: document.getElementById('genero').value,
        ano: parseInt(document.getElementById('ano').value),
        nota: parseFloat(document.getElementById('nota').value),
    };

    if (editandoId) {
        await fetch(`${API_URL}/${editandoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filme),
        });
        editandoId = null;
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filme),
        });
    }

    document.getElementById('form-filme').reset();
    carregarFilmes();
});

carregarFilmes();
