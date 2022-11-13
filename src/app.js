
import express, { json } from 'express';
import morgan from 'morgan';
import pkg from '../package.json' assert { type: "json" };
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/user.routes.js';
import { createRoles } from './libs/initialSetup.js';






const app = express();
createRoles();

app.set('pkg',pkg)

app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description:   app.get('pkg').description,     
        version: app.get('pkg').version
    });
  });


app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);


export default app;

