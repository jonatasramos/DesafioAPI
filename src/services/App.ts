import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from "dotenv";
import helmet from "helmet";
import routes from '../routes/'

dotenv.config({
    path:process.env.NODE_ENV == "test" ? ".env.test" : ".env"
});

/**
 * Classe App para configurações do server
 * 
 * @author Jonatas Ramos
 */
class App {
    
    /**
     * @var {Object} express - Instância de express
     */
    public express: express.Application;
    
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.headers();
        dotenv.config();
    }
    
    /**
     * Definições de middler
     */ 
    private middleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    /**
     * Definições de header
     */
    private headers(): void {
        this.express.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'content-type');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Credentials', "true");
        });
    }

    /**
     * Definições de rotas
     */
    private routes(): void {
        
        // Rotas da api
        this.express.use("/api", routes);
    }
}
export default new App().express;