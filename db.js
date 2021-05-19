const pg = require ('pg')

const client  = new pg.Client('postgres://localhost/book_world_db')

const syncAndSeed = async () => {
    const SQL = `
        DROP TABLE IF EXISTS book;
        CREATE TABLE book (
            id INTEGER PRIMARY KEY,
            name VARCHAR (100) NOT NULL
        );
      INSERT INTO book (id, name) VALUES (1, 'Book 1');
      INSERT INTO book (id, name) VALUES (2, 'Book 2');
      INSERT INTO book (id, name) VALUES (3, 'Book 3');
      INSERT INTO book (id, name) VALUES (4, 'Book 4');
      INSERT INTO book (id, name) VALUES (5, 'Book 5');
    `;

    await client.query(SQL);
}

module.exports = {
    client,
    syncAndSeed
}