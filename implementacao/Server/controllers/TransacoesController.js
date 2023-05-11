

import Transacoes from '../models/Transacoes';
import professor from './ProfessorController';
import aluno from './AlunosController'

class TransacoesController{


    async index(req,res){
        try {
            const transacoes = await Transacoes.findAll({where:{
                remetenteId: req.params.id
            }

            })
            return res.status(200).json({transacoes});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }
    
  async create(req, res) {







    // front tem que enviar um tipo de usuario

    if(req.body.tipo_usuario=='professor'){
        professor.subtrairMoedas(req.body.quantidade)
        aluno.adicionarMoedas(req.body.quantidade)
    }


    try {
      await Transacoes.create({
        QUANTIDADE: req.body.quantidade,
        remetenteId: req.params.id,
        destinatarioId: req.body.destinatario
      }
      );
      res.status(200).json("transacao realizada com sucesso!");
    } catch (error) {
      res.status(500).json({ error });
    }
  }



}

export default new TransacoesController();