import Sequelize, { Model } from 'sequelize';

class Alunos extends Model {
  static init(sequelize) {
    super.init(
      {

        NOME: {
          type: Sequelize.STRING,
  
        },
        EMAIL:{
          type: Sequelize.STRING,
        },
        CPF:{
          type: Sequelize.STRING,
        },
  
        RG:{
          type: Sequelize.FLOAT,
        },
        LOGRADOURO:{
          type: Sequelize.FLOAT,
        },
        CIDADE:{
          type: Sequelize.STRING,
        },
        BAIRRO:{
          type: Sequelize.STRING,
        },
        NUMERO:{
          type: Sequelize.FLOAT,
        },
        INSTITUICAO:{
          type: Sequelize.STRING,
        },
        CURSO:{
          type: Sequelize.STRING,
        },
        MOEDAS:{
          type: Sequelize.FLOAT,
        },
      },
      {
        sequelize,
        modelName: 'alunos',
      },
    );
  }

  static associate(models) {
   // inserir associacoes
   

  }
}

export default Alunos;
