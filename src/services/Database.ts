import mongoose from 'mongoose';
import dotenv from 'dotenv';

/**
 * Configurações de variaveis de ambiente
 */
dotenv.config({
    path: process.env.NODE_ENV == "test" ? ".env.test" : ".env"
});

/**
 * Classe de conexão com o banco de dados
 * 
 * @author Jônatas Ramos
 */
class Database {

    /**
     * @var {String} uri - Url do banco de dados
     */
    public uri: any = process.env.MONGODB_URI;

    /**
     * @var {Object} db - Instância da conexão
     */
    public db: any;

    /**
     * Conecta com o banco de dados
     */
    public async connect() {
        mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);

        this.db = mongoose.connection;

        this.db.on('open', () => {
            if (process.env.NODE_ENV != "test") {
                console.log('Conexão estabelecida com banco de dados !')
            }
        });

        this.db.on('error', () => {
            console.log('Erro ao conectar o banco de dados !')
        });
    }

    /**
     * Fecha a conexão com o banco
     */
    public close(): void {
        this.db.close();
    }

}

export default new Database;