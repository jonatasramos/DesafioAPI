import { Router, Request, Response } from 'express';
import UserController from '../controller/UserController';
import { validateUser } from '../services/Validations';
import { validate } from 'express-validation';
import Jwt from '../services/Jwt';

/**
 * Classe responsável pelas rotas das autenticações
 * 
 * @author Jônatas Ramos
 */
class AuthenticateRoute {

    /**
    * @var {Router} router
    */
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
    * Responsável por gerar o token
    * 
    * @param {Request} req request
    * @param {Response} res respose
    */
    public getToken(req: Request, res: Response) {

        try {
            UserController.getUser(req.body).then((user: any) => {
                if (typeof user[0] != "undefined") {
                    let id: number = +user[0]._id
                    let token = Jwt.generateToken(id) || null;

                    if (token) {
                        res.json({
                            'token': token
                        });
                    } else {
                        res.json({
                            'error': true,
                            'message': 'Erro ao gerar token.'
                        });
                    }
                } else {
                    res.json({
                        'error': true,
                        'message': 'Usuário não encontrado.'
                    });
                }
            });
        } catch (error) {
            res.json({
                'error': true,
                'message': 'Erro ao autenticar usuário.'
            })
        }
    }

    /**
   * Inicia as rotas
   */
    init(): void {
        this.router.post('/token', validate(validateUser, {}, { abortEarly: true }), this.getToken);
    }
}

const userRouter = new AuthenticateRoute;
userRouter.init();

export default userRouter.router;