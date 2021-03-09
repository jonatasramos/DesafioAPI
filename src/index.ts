/**
 * Arquivo responsável por executar as configurações do servidor 
 * 
 * @author Jônatas Ramos
 */
import * as http from 'http';
import App from './services/App';
import Database from './services/Database';
import { ValidationError } from 'express-validation';
const PORT: any = process.env.PORT || 8080;

App.set('port', PORT);

App.use(function (err: any, req: any, res: any, next: any) {
    // Retora o erro das validações
    if (err instanceof ValidationError) { 
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
});

const server = http.createServer(App);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

// Executa a conexxão com o banco de dados
Database.connect();

/**
 * Tratamento de erros
 * 
 * @param error 
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;

    console.log(`ERROR: ${error.code}`);
    process.exit(1);
}

/**
 * Configurações ao rodar o server
 */
function onListening(): void {
    let addr: any = server.address();

    console.log(`Server rodado na porta: ${addr.port}`);
}