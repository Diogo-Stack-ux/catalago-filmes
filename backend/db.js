const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:diogo9121@localhost:5432/catalago',
});

module.exports = pool;
