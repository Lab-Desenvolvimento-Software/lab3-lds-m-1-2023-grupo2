import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
 import Vantagens from '../models/Vantages';


//TODO FAZER AJUSTES EM EMPRESAS!!!!!

class VantagensController{
    async index(req, res){ // para os alunos


        try {
            const vantagens = await Vantagens.findAll({


            })
            return res.status(200).json({vantagens});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }

    async indexEmpresa(req, res){ // para os alunos


        try {
            const vantagens = await Vantagens.findAll({
                where: {
                    empresaId: req.params.id
                }
            })
            return res.status(200).json({vantagens});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }

    async create(req, res) {

          try{
            await Vantagens.create({
              NOME: req.body.nome,
              DESCRICAO: req.body.descricao,
              VALOR: req.body.valor,
              empresaId: req.params.id //id da empresa

          });
            return res.status(200).json('Vantagem cadastrada com sucesso!');
          } catch (error) {
            return res.status(500).json({ error });
          }
    }

  async delete(req, res) {
    try {
      await Vantagens.destroy({ where: { id: req.params.id } });
      res.status(200).json('Vantagem Excluida com sucesso!');
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default new VantagensController();
