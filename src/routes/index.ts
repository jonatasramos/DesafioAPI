/**
 * Importa todas as rotas do sistema
 *  
 * @author Jônatas Ramos
 */


import { Router, Request, Response } from 'express';
import letterRoute from './LetterRoute';
import authenticateRoute from './AuthenticateRoute';
import Jwt from '../services/Jwt';
import fs from 'fs';
import path from 'path';

const router = Router();

/**
 * Rota para status da api
 * 
 * @param {Request} req request
 * @param {Response} res response
 */
router.get('/api_status', Jwt.auth, (req: Request, res: Response) => {
    res.json({
      status: "ok"
    });
  }
);

/**
 * Rota para documentção da api
 * 
 * @param {Request} req request
 * @param {Response} res response
 */
router.get('/docs', (req: Request, res: Response) => {
  fs.readFile(path.resolve("docs/index.html"), 'utf8', async function(err, text){
    await res.send(text);
  });
});




/**
 * Rota de Cartas
 */
router.use('/letter', letterRoute);

/**
 * Rota Autenticação
 */
router.use('/auth', authenticateRoute);

export = router;