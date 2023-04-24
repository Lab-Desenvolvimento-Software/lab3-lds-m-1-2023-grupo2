import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';




// CONFIGURAÇÕES DE SERVIDOR
class App {
    constructor() { // construtor do Servidor
      this.server = express();
      this.middlewares();
      this.routes();
    }
  
    middlewares() {
      this.server.use(express.json());
      this.server.use(cors()); // passar por cima do Access-Control-Allow-Origin
      this.server.use(express.urlencoded({ extended: false }));

    }
  
    routes() {
      this.server.use(routes);
    }
    
  }
  
  export default new App().server;
  