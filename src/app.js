import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import authRouter from './api/routes/auth-router.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/public', express.static('public'));
app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.send('Welcome to my REST API!');
});

export default app;
