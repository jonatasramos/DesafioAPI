import JsonWebToken from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
/**
 * Class para manipulação dos serviços do jsonwebtoken
 * 
 * @author Jônatas Ramos
 */
class Jwt {
   
    /**
     * Gera um token através de um id
     * 
     * @param {Number} id
     * @retunr token
     */ 
    public generateToken(id: number) {
        let secret: string = process.env.JWT_SECRET || "secret";
        if (id != null) {
            return JsonWebToken.sign({ id }, secret, {
                expiresIn: 1800 // 30min
            });
        }
    }

    /**
     * Faz a validação do token
     * 
     * @param {Object} req 
     * @param {Response} res
     * @param {NextFunction} next
     */
    auth(req: any, res: Response, next: NextFunction) {
        let token: any = req.headers['x-access-token'] || "";
        let secret: any = process.env.JWT_SECRET || "secret";

        if (!token) {
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        }
        JsonWebToken.verify(token, secret, function(err: any, decoded: any) {
            if (err) {
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            }
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}

export default new Jwt;