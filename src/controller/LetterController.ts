import LetterModel, { Letter } from '../models/LetterModel';
/**
 * Class Controller de cartas
 * 
 * @author Jônatas Ramos
 */

class LetterController {
    /**
     * Pegas todas as cartas do sistema
     * 
     * @return {Object} Letter
     */
    public async get(): Promise<Letter[]> {
        try {
            return LetterModel.find();
        } catch (error) {
            return <any>{'error': true, 'message': 'Erro ao buscar items!' };
        }
    };

    /**
     * Retorna uma carta pelo id
     * 
     * @param {Number} id
     * @return {Object} letter
     */
    public async getById(id: number): Promise<Letter[]> {
        try {
            return LetterModel.find({ id: id });
        } catch (error) {
            return <any>{'error': true, 'message': 'Erro ao buscar item!' };
        }
    };

    /**
     * Cria uma nova carta
     * 
     * @param {Object} letter
     * @return {Object} Letter
     */
    public async create(data: Letter): Promise<Letter> {

        try {
            let {
                sender_name,
                sender_adress,
                text,
                status
            } = data;

            let letter = new LetterModel({
                sender_name: sender_name,
                sender_adress: sender_adress,
                text: text,
                status: status
            });

            return letter.save();
        } catch (error) {
            return <any>{'error': true, 'message': 'Ocorreu um erro no cadastro!' };
        }

    }

    /**
     * Atualiza uma carta
     * 
     * @param {Object} letter
     * @return {Object} Letter
     */
    public async update(letter: Letter): Promise<void> {
        try {
            return <any>LetterModel.findOneAndUpdate({id: letter.id}, {
                $set: letter
            });
        } catch (error) {
            return <any>{};
        }
    }

    /**
     * Remove uma carta do banco de dados
     * 
     * @param {Object} id
     * @return {Object} Letter
     */
    public async destroy(id: number): Promise<void> {
        try {
            return <any>LetterModel.findOneAndRemove({id: id});
        } catch (error) {
            return <any>{'error': true, message: 'Erro ao deletar item'};
        }
    }

}

export default new LetterController;