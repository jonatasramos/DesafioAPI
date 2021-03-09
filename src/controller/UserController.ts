import UserModel, { User } from '../models/UserModel';
import md5 from 'md5';
/**
 * Class Controller de atutenticações de usuários
 * 
 * @author Jônatas Ramos
 */
class UserController {

    /**
     * Busca um usuário no banco de dados
     * 
     * @return {User} user 
     */
    public async getUser(user: User): Promise<User[]> {
        try {
            return UserModel.find({
                login: user.login,
                password: md5(user.password)
            });
        } catch (error) {
            return <any>{'error': true, 'message': 'Usuário não encontrado!' };
        }
    };

}

export default new UserController;