import Sequelize, { Model } from 'sequelize';

class Empresas extends Model {
  static init(sequelize) {
    super.init(
      {

  
        CNPJ: {
          type: Sequelize.STRING,  
        },
      },
      {
        sequelize,
        modelName: 'empresas',
      },
    );
  }

  static associate(models) {

    this.belongsTo(models.usuarios, { foreignKey: 'usuarioId' });
    this.hasMany(models.vantagens, { foreignKey: 'empresaId' });

  }
}

export default Empresas;
