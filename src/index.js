const express = require('express')
const app = express()
const { config } = require('dotenv');
config();
const port = process.env.PORT


// routes
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRoutes')



app.use(express.json());

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
})