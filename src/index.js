const express = require('express')
const app = express()
const { config } = require('dotenv');
config();
const port = process.env.PORT

app.use('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
})