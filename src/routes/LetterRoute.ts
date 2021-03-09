import { Router, Request, Response } from 'express';
import LetterController from '../controller/LetterController';
import { validateLetterCreate, validateLetterUpdate, validateLetterDelete } from '../services/Validations';
import { validate } from 'express-validation';
import Jwt from '../services/Jwt';

/**
 * Classe responsável pelas rotas das cartas
 * 
 * @author Jônatas Ramos
 */
class LetterRoute {

  /**
   * @var {Router} router
   */
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * Pegas todas as cartas cadastradas
   * 
   * @param {Request} req request
   * @param {Response} res respose
   */
  public get(req: Request, res: Response) {
    let id: number = req.params.id ? +req.params.id : 0;
    
    if (id) {
      LetterController.getById(id).then((letter) =>{
        res.json(letter);
      });
    } else {
      LetterController.get().then((letter) =>{
        res.json(letter);
      });
    }
  }

  /**
   * Cria uma nova carta
   * 
   * @param {Request} req request
   * @param {Response} res respose
   */
  public async create(req: Request, res: Response) {
    LetterController.create(req.body).then((result) => {
      res.json(result);
    });
  }

  /**
   * Atualiza um ou mais itens da carta
   * 
   * @param {Request} req request
   * @param {Response} res respose
   */
  public async update(req: Request, res: Response) {
    
    LetterController.update(req.body).then((result) => {
      let letter: any = result;
      if (letter) {
        res.json({
          'ok': true,
          'message': 'Item atualizado!'
        });   
      } else {
        res.json({
          'error': true,
          'message': 'Item não encontrado!' 
        });  
      }
      
    });

  }

  /**
   * Exclui uma carta
   * 
   * @param {Request} req request
   * @param {Response} res respose
   */
  public async destroy(req: Request, res: Response) {
    LetterController.destroy(req.body.id).then((result) => {
      let letter: any = result;
      
      if (letter) {
        res.json({
          'ok': true,
          'message': 'Item deletado!'
        });   
      } else {
        res.json({
          'error': true,
          'message': 'Erro ao deletar item!' 
        });  
      }
      
    });

  }

  /**
   * Inicia as rotas
   */
  init(): void {
    this.router.get('/:id?', Jwt.auth,  this.get);
    this.router.post('/create', Jwt.auth, validate(validateLetterCreate, {}, {abortEarly: true}), this.create);
    this.router.post('/update', Jwt.auth, validate(validateLetterUpdate, {}, {abortEarly: true}), this.update);
    this.router.post('/destroy', Jwt.auth, validate(validateLetterDelete, {}, {abortEarly: true}),this.destroy);
  }
}

const letterRouter = new LetterRoute;
letterRouter.init();

export default letterRouter.router;