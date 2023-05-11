import config from '../config/bd'
import {Sequelize} from 'sequelize'

import Alunos from '../models/Alunos';
import Empresas from '../models/Empresas';
import Professores from '../models/Professores';
import Transacoes from '../models/Transacoes';
import Usuarios from '../models/Usuarios';

//importar modelos aqui


//inicializa os modelos e conecta ao bd

const models= [Alunos, Empresas, Professores, Transacoes, Usuarios]

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