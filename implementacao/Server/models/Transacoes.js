import Sequelize, { Model } from 'sequelize';


class Transacoes extends Model {
  static init(sequelize) {
    super.init(
      {

        QUANTIDADE:Sequelize.INTEGER,
        ENTRADA: Sequelize.INTEGER,
        SAIDA: Sequelize.INTEGER,

      },
      {
        sequelize,
        modelName: 'transacoes',
      },
    );
  }

  static associate(models) {
    // inserir associacoes
    this.belongsTo(models.usuarios, { foreignKey: 'destinatarioId' });
    this.belongsTo(models.usuarios, { foreignKey: 'remetenteId' });
 
   }

}

export default Transacoes;
