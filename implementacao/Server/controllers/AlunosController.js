import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import fs from 'fs'
import Alunos from '../models/Alunos';


class AlunosController{
    async index(req, res){
      console.log('pqp')
        const {
            NOME,
            CPF,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,

        } = req.query;

        //localhost:{port}/produtos?nome=iphone

        const page = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 25;

        let where = {};
        let order = [];

        if(NOME){
            where = {
                ...where,
                NOME:{
                    [Op.like]: NOME
                },
            };
        }

        if (createdBefore) {
            where = {
              ...where,
              createdAt: {
                [Op.gte]: parseISO(createdBefore),
              },
            };
          }

          if (createdAfter) {
            where = {
              ...where,
              createdAt: {
                [Op.lte]: parseISO(createdAfter),
              },
            };
        }

          if (updatedBefore) {
            where = {
              ...where,
              updatedAt: {
                [Op.gte]: parseISO(updatedBefore),
              },
            };
        }

          if (updatedAfter) {
            where = {
              ...where,
              updatedAt: {
                [Op.lte]: parseISO(updatedAfter),
              },
            };
        }
        if (sort) { // localhost:{PORT}?sort=id:desc,name
            order = sort.split(',').map((item) => item.split(':'));
        }
        try {
            const alunos = await Alunos.findAll({
              where,
              order,
              limit,
              offset: limit * page - limit,
            })
            return res.status(200).json({alunos});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }

    async create(req, res) {

        try{
          await Alunos.create({
            NOME: req.body.nome,
            EMAIL: req.body.email,
            CPF: req.body.cpf,
            RG: req.body.rg,
            LOGRADOURO: req.body.logradouro,
            CIDADE: req.body.cidade,
            BAIRRO: req.body.bairro,
            NUMERO: req.body.numero,
            INSTITUICAO: req.body.instituicao,
            CURSO: req.body.curso,
            MOEDAS: 0,

            // ASSOCIACAO AQUI

          },{
            // include: [ inserir associacao aqui ]
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

            NOME: req.body.nome,
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


}

export default new AlunosController();
