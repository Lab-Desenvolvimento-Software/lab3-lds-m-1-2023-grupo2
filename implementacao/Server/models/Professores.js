import Sequelize, { Model } from 'sequelize';

class Professores extends Model {
  static init(sequelize) {
    super.init(
      {


        CPF:{
          type: Sequelize.STRING,
        },

        DEPARTAMENTO:{
          type: Sequelize.STRING,
        },

        INSTITUICAO:{
          type: Sequelize.STRING,
        },

        MOEDAS:{
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'professores',
      },
    );
  }

  static associate(models) {
   // inserir associacoes
   this.belongsTo(models.usuarios, { foreignKey: 'usuarioId' });

  }
}

export default Professores;
