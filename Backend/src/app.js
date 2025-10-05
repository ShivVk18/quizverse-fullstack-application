import express from 'express'
import cors from 'cors'

const app = express() 

app.use(cors({
     origin:"*" 
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

import routes from './routes/index.routes.js'
app.use('/api/v1',routes)

export {app}