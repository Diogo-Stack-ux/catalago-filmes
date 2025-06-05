const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👉 Rota para listar todos os filmes
app.get('/api/filmes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM filmes ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 👉 Rota para adicionar um filme
app.post('/api/filmes', async (req, res) => {
    const { nome, descricao, genero, ano, nota } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO filmes (nome, descricao, genero, ano, nota) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, descricao, genero, ano, nota]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 👉 Rota para editar um filme
app.put('/api/filmes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, genero, ano, nota } = req.body;
    try {
        const result = await pool.query(
            'UPDATE filmes SET nome=$1, descricao=$2, genero=$3, ano=$4, nota=$5 WHERE id=$6 RETURNING *',
            [nome, descricao, genero, ano, nota, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 👉 Rota para deletar um filme
app.delete('/api/filmes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM filmes WHERE id = $1', [id]);
        res.json({ message: 'Filme deletado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
