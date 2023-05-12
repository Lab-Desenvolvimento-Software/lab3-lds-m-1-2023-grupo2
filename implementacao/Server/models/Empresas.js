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
// inserir associacoes

  }
}

export default Empresas;
