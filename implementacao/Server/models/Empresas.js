import Sequelize, { Model } from 'sequelize';

class Empresas extends Model {
  static init(sequelize) {
    super.init(
      {

        NOME: {
          type: Sequelize.STRING,  
        },
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
