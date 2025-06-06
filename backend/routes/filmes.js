const express = require('express');
const router = express.Router();
const { getFilmes, addFilme } = require('../models/filmesModel');

router.get('/', async (req, res) => {
    try {
        const filmes = await getFilmes();
        res.json(filmes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        await addFilme(req.body);
        res.status(201).json({ mensagem: 'Filme cadastrado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar filme' });
    }
});

// PUT - Atualizar filme
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await updateFilme(id, req.body);
        res.json({ mensagem: 'Filme atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
});

// DELETE - Excluir filme
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteFilme(id);
        res.json({ mensagem: 'Filme excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir filme' });
    }
});

module.exports = router;
