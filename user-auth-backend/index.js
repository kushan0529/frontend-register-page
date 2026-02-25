import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import control2 from './app/controller2/Note-control.js';
import mongoose from 'mongoose';
import configureDB from './config/db.js';
import cors from 'cors';
import morgan from 'morgan';
import authenticateUser from './app/middlewares/user-authentication.js';
import authorizeUser from './app/middlewares/user-authorization.js';
import Usercntrl from './app/controllers/user-control.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

configureDB();
app.get('/api/users/account', authenticateUser, Usercntrl.account);
app.post('/api/users/register', (req, res, next) => {
    console.log('Register payload:', req.body);
    next();
}, Usercntrl.register);
app.post('/api/users/login', Usercntrl.login);

app.get('/api/users/all', authenticateUser, authorizeUser(['admin', 'moderator']), Usercntrl.list);
app.delete('/api/users/delete/:id', authenticateUser, authenticateUser, Usercntrl.delete);

app.get('/list', authenticateUser, control2.list);
app.get('/show/:noteid', authenticateUser, control2.show);
app.post('/create', authenticateUser, control2.create);
app.put('/update/:id', authenticateUser, control2.update);
app.delete('/delete/:id', authenticateUser, control2.delete);

app.listen(port, () => {
    console.log('server is running ' + port);
});


