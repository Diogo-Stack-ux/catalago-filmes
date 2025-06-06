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

// Atualizar filme
async function updateFilme(id, filme) {
    const { nome, descricao, genero, ano, nota } = filme;
    await pool.query(
        'UPDATE filmes SET nome=$1, descricao=$2, genero=$3, ano=$4, nota=$5 WHERE id=$6',
        [nome, descricao, genero, ano, nota, id]
    );
}

// Excluir filme
async function deleteFilme(id) {
    await pool.query('DELETE FROM filmes WHERE id=$1', [id]);
}

module.exports = {
    getFilmes,
    addFilme,
    updateFilme,
    deleteFilme,
};


module.exports = {getFilmes, addFilme};