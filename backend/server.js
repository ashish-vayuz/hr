import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import connectDB from './config/db.js'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'

//Routes
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import challengeRoutes from './routes/challengeRoute.js'
import participate from './routes/participateRoute.js'
import adminRoutes from './routes/adminRoutes.js'
import cmsRoutes from './routes/cmsRoutes.js'

dotenv.config()

connectDB()
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())



app.use('/users', userRoutes)
app.use('/category', categoryRoutes)
app.use('/challenge', challengeRoutes)
app.use('/participation', participate)
app.use('/admin', adminRoutes)
app.use("/cms", cmsRoutes);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}



//Error Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))