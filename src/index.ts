import express from 'express';

import todosRouter from './routes/todos'

const app = express()

app.use(express.json())

app.use('/todo', todosRouter)

app.listen(5000)