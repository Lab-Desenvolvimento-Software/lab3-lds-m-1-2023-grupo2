import Sequelize, { Model } from 'sequelize';


class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {

        TIPO:Sequelize.STRING,
        LOGIN: Sequelize.STRING,
        SENHA: Sequelize.STRING,
        NOME: Sequelize.STRING,

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

    this.hasOne(models.empresas);

    this.hasMany(models.transacoes, {as: 'destinatario', foreignKey: 'destinatarioId' });
    this.hasMany(models.transacoes, {as: 'remetente', foreignKey: 'remetenteId' });

  }

}

export default Usuarios;
