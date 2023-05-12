import Sequelize, { Model } from 'sequelize';

class Alunos extends Model {
  static init(sequelize) {
    super.init(
      {

        
        EMAIL:{
          type: Sequelize.STRING,
        },
        CPF:{
          type: Sequelize.STRING,
        },

        RG:{
          type: Sequelize.STRING,
        },
        LOGRADOURO:{
          type: Sequelize.STRING,
        },
        CIDADE:{
          type: Sequelize.STRING,
        },
        BAIRRO:{
          type: Sequelize.STRING,
        },
        NUMERO:{
          type: Sequelize.STRING,
        },
        INSTITUICAO:{
          type: Sequelize.STRING,
        },
        CURSO:{
          type: Sequelize.STRING,
        },
        MOEDAS:{
          type: Sequelize.INTEGER,
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
   this.belongsTo(models.usuarios, { foreignKey: 'usuarioId' });

  }
}

export default Alunos;
