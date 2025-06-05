const db = require('../db');

async function getFilmes() {
    const {rows} = await db.query('SELECT * FROM filmes ORDER BY id DESC');
    return rows;  
}

async function addFilme({nome,descrição,genero,ano,nota}) {
    const query = 'INSERT INTO filmes (nome,descrição,genero,ano,nota) VALUES ($1,$2,$3,$4,$5)';
    const values = [nome,descrição,genero,ano,nota];
    await db.query(query,values);

}

module.exports = {getFilmes, addFilme};