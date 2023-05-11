import Sequelize, { Model } from 'sequelize';


class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {

        TIPO:Sequelize.STRING,
        LOGIN: Sequelize.STRING,
        SENHA: Sequelize.STRING,

      },
      {
        sequelize,
        modelName: 'usuarios',
      },
    );
  }

  static associate(models) {
    this.hasOne(models.alunos);
    this.hasOne(models.professores);

    this.hasMany(models.transacoes);

  }

}

export default Usuarios;
