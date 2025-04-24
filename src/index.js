const express = require('express')
const app = express()
const { config } = require('dotenv');
config();
const port = process.env.PORT
const authRouter = require('./routes/authRouter')
app.use(express.json());

app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
})