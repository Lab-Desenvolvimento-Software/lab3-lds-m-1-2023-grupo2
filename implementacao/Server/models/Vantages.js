import Sequelize, { Model } from 'sequelize';


class Vantagens extends Model {
  static init(sequelize) {
    super.init(
      {

        NOME: {
        type: Sequelize.STRING,
        allowNull: true,
        },
        DESCRICAO: {
        type: Sequelize.STRING,
        allowNull: true,
        },
        VALOR: {
        type: Sequelize.INTEGER,
        allowNull: false,
        },

      },
      {
        sequelize,
        modelName: 'vantagens',
      },
    );
  }

  static associate(models) {
    // inserir associacoes
    this.belongsTo(models.empresas, {foreignKey: 'empresaId' });
 
   }

}

export default Vantagens;
