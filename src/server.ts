import Express from 'express';

import createUser from './controllers/UserController';
import createPost, { deletePost, listPost, updatePost } from './controllers/PostController';

const app = Express();
app.use(Express.json());

const PORTA = 2000;

app.get('/', (request, response) => {
    return response.send ({message: 'Oi, debs'});
})

app.post('/createUser', createUser);
app.post('/createPost', createPost);
app.get('/listPost/:id', listPost);
app.put('/updatePost/:id', updatePost);
app.delete('/deletePost/:id', deletePost);

app.listen(PORTA, () => {
    console.log(`Servidor rodando em ${PORTA}`);
});