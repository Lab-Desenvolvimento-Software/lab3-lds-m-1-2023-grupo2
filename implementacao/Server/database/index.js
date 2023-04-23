import config from '../config/bd'
import {Sequelize} from 'sequelize'

import Produtos from '../models/Alunos';
import Usuarios from '../models/Empresas';
//importar modelos aqui


//inicializa os modelos e conecta ao bd

const models= [Produtos, Usuarios]

class Database{
    constructor(){
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }
    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        models.forEach((model) => {
          if (model.associate) {
            model.associate(this.connection.models);
          }
        });
    }
}

export default new Database();