const express = require('express')
const app = express()
const cors = require('cors');
const { config } = require('dotenv');
config();
const port = process.env.PORT || 3000


// routes
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRoutes')
const educationRouter = require('./routes/educationRoutes')
const experienceRouter = require('./routes/experienceRouter')
const moduleRouter = require('./routes/moduleRoutes')
const quizRouter = require('./routes/quizRouter')
const companyRouter = require('./routes/companyRoutes')
const vacancyRouter = require('./routes/vacancyRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const bookRoutes = require('./routes/bookRoutes')
const mentorRoutes = require('./routes/mentorRoutes')




app.use(cors());
app.use(express.json());

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/education', educationRouter)
app.use('/experience', experienceRouter)
app.use('/module', moduleRouter)
app.use('/quiz', quizRouter)
app.use('/company', companyRouter)
app.use('/vacancy', vacancyRouter)
app.use('/applications', applicationRoutes)
app.use('/mentor', mentorRoutes)
app.use('/book', bookRoutes)









app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
})