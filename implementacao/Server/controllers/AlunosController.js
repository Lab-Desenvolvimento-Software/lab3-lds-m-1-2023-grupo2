import { Op, Sequelize } from 'sequelize';
import { parseISO } from 'date-fns';

import Alunos from '../models/Alunos';
import Usuarios from '../models/Usuarios';


class AlunosController{
    async index(req, res){
      
        try {
            const alunos = await Alunos.findAll({
            })
            return res.status(200).json({alunos});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }



    async create(req, res) {

      const alunos = {
          
            EMAIL: req.body.email,
            CPF: req.body.cpf,
            RG: req.body.rg,
            LOGRADOURO: req.body.logradouro,
            CIDADE: req.body.cidade,
            BAIRRO: req.body.bairro,
            NUMERO: req.body.numero,
            INSTITUICAO: req.body.instituicao,
            CURSO: req.body.curso,
            MOEDAS: 0
      }


      //MUDAR ISSO NO FRONT
      try{
        await Usuarios.create({
          TIPO: "aluno",
          LOGIN: req.body.login,
          SENHA: req.body.senha,
          NOME: req.body.nome,

          alunos: alunos

        },{
           include: [Alunos]
        });
        return res.status(200).json('Aluno cadastrado com sucesso!');
      } catch (error) {
        return res.status(500).json({ error });
      }
  }

    async update(req, res) {
        try{
            await Alunos.upsert({
            id: req.params.id,
            EMAIL: req.body.email,
            CPF: req.body.cpf,
            RG: req.body.rg,
            LOGRADOURO: req.body.logradouro,
            CIDADE: req.body.cidade,
            BAIRRO: req.body.bairro,
            NUMERO: req.body.numero,
            INSTITUICAO: req.body.instituicao,
            CURSO: req.body.curso,
            MOEDAS: req.body.moedas,

          });
          return res.status(200).json('Informações alteradas com sucesso!');
        } catch (error) {
          return res.status(500).json({ error });
        }
    }
  async delete(req, res) {

    //colocar destroy no usuario ao inves do aluno
    try {
      await Alunos.destroy({ where: { id: req.params.id } });
      res.status(200).json('Aluno Excluido com sucesso!');
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async show(req, res) {
    
    try {
      const aluno = await Alunos.findByPk(req.params.id);
      res.status(200).json(aluno);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async adicionarMoedas(quantidade, id){

    try {
      await Alunos.update({
        MOEDAS: Sequelize.literal(`MOEDAS + ${quantidade}`)
      },{where: {usuarioId: id}})
      return "sucesso"
    } catch (error) {
      return error
    }

  }

  async subtrairMoedas(quantidade,id){


    console.log('subtraindo moedas')

    try {
      await Alunos.update({
        MOEDAS: Sequelize.literal(`MOEDAS - ${quantidade}`)
      }, {
        where: { id: id }
      });
      return "sucesso";
    } catch (error) {
      console.log(error)
      return error;
    }


  }

}

export default new AlunosController();
