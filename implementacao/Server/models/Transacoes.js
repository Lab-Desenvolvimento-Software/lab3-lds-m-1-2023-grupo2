import Sequelize, { Model } from 'sequelize';


class Transacoes extends Model {
  static init(sequelize) {
    super.init(
      {

        QUANTIDADE:Sequelize.INTEGER,
        NOME_DESTINATARIO: Sequelize.STRING,



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
