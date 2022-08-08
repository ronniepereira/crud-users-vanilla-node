import express from 'express'
import { userController } from './controllers/userController';
import cors from 'cors';
import "dotenv/config";

const app = express();
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api/user', userController);

app.listen(process.env.PORT, () => {
    return console.log(`API Listen on Port: ${process.env.PORT}`)
})