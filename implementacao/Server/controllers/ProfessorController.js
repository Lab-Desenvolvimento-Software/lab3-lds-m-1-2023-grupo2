
import { Sequelize } from 'sequelize';
import Professores from '../models/Professores';


class ProfessorController{





  async showMoedas(req, res) {
    try {
      const moedas_professor = await Professores.findByPk(req.params.id,{attributes: ['NOME', 'MOEDAS']});
      res.status(200).json(moedas_professor);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async adicionarMoedas(req,res){


  }

  async subtrairMoedas(quantidade,id){


    console.log('subtraindo moedas')

    try {
      await Professores.update({
        MOEDAS: Sequelize.literal(`MOEDAS - ${quantidade}`)
      }, {
        where: { usuarioId: id }
      });
      return "sucesso";
    } catch (error) {
      console.log(error)
      return error;
    }


  }

  async getMoedas(req, res){


    console.log('pegando moedas.')

    try {
      const MOEDAS = await Professores.findByPk(req.params.id, {
        attributes: ['MOEDAS'],
      });
      return res.status(200).json(MOEDAS);
    } catch (error) {
      console.log(error)
      return error;
    }

  }

  }








export default new ProfessorController();
