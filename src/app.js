import cookieParser from 'cookie-parser';
import express from 'express';
import userRoute from './routes/User.route.js'
import budgetRoute from './routes/Budget.route.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/users',userRoute)
app.use('/api/budget',budgetRoute)

export {app}