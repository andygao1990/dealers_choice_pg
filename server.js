const { client, syncAndSeed} = require ('./')
const express = require ('express')
const path = require('path')

const app = express()

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', async (req, res, next) => {
    try {
        const response = await client.query('SELECT * FROM book')
        const books = response.rows
        res.send(`
        <html>
            <head>
            <link rel='stylesheet' href='/assets/styles.css' />
            </head>
            <body>
                <h1>Book World</h1>
                <h2>Books</h2>
                <ul>
                ${
                    books.map( book => `
                        <li>
                        <a href='/books/${book.id}'>
                        ${book.name}
                        </a>
                        </li>
                    `).join('')
                }
                </ul>
            </body>
        </html>
        `)
    }
    catch (ex) {
        next(ex)
    }
})

app.get('/books/:id', async (req, res, next) => {
    try {
        const response = await client.query('SELECT * FROM book WHERE id=$1', [req.params.id])
        const book = response.rows[0]
        res.send(`
        <html>
            <head>
            <link rel='stylesheet' href='/assets/styles.css' />
            </head>
            <body>
                <h1>Book World</h1>
                <h2><a href='/'>Books</a> (${book.name}) </h2>
                <p>
                    ${book.content}
                </p>
            </body>
        </html>
        `)
    }
    catch (ex) {
        next(ex)
    }
})


const port = process.env.PORT || 3000

const setUp = async () => {
    try {
        await client.connect()
        await syncAndSeed()
        console.log('connected to database')
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch (ex) {
        console.log(ex)
    }
    
}

setUp()