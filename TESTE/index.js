import express from "express";
import {router as userRouter}  from "./routes/user.js";
import {main} from './db/conn.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));

app.use('/user', userRouter);

app.listen(port);