const express = require('express')
const app = express()
const { config } = require('dotenv');
config();
const port = process.env.PORT


// routes
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRoutes')
const educationRouter = require('./routes/educationRoutes')
const experienceRouter = require('./routes/experienceRouter')
const moduleRouter = require('./routes/moduleRoutes')
const quizRouter = require('./routes/quizRouter')
const companyRouter = require('./routes/companyRoutes')
const vacancyRouter = require('./routes/vacancyRoutes')



app.use(express.json());

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/education', educationRouter)
app.use('/experience', experienceRouter)
app.use('/module', moduleRouter)
app.use('/quiz', quizRouter)
app.use('/company', companyRouter)
app.use('/vacancy', vacancyRouter)






app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
})