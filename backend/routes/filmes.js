const express = requiere('express');
const router = express.Router();
const {getFilmes, addFilme} = require('../models/filmesModel');

router.get('/', async (req, res) => {
    try {
        const filmes = await getFilmes();
        res.json(filmes);
    } catch (err) {
        res.status(500).json({message: err.message});

    }
 });

 router.post('/', async (req, res) => {
    try {
        await addFilme(req.body);
        res.status(201).json({mensagem: 'Filme cadastrado com sucesso'});
    } catch (err) {
        res.status(500).json({error: 'erro ao cadastrar filme'});
    }
 });

 module.exports = router;