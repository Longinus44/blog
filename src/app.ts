import express from 'express'
import knex from 'knex'
import Objection from 'objection'
import config from './knexfile'
import cors from 'cors'
import { AppConfig } from './App/Config/appConfig'
import bodyParser from 'body-parser'
import BlogRoute from './App/Routes/blogRoute'
import UserRoute from "./App/Routes/userRoute"

const port = AppConfig.port
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use('/blog', BlogRoute)
app.use('/user', UserRoute)

export const DB = Objection.Model.knex(knex(config.development))

app.listen(port,() => {
    console.log(`app is live on ${AppConfig.serverHost}${port}`);
    
})