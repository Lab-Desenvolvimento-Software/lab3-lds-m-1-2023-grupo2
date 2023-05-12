

import Transacoes from '../models/Transacoes';
import professor from './ProfessorController';
import aluno from './AlunosController'

class TransacoesController{


    async index(req,res){
        try {
            const transacoesSaida = await Transacoes.findAll({where:{
                remetenteId: req.params.id
            }})
            const transacoesEntrada = await Transacoes.findAll({where:{
              destinatarioId: req.params.id
          }})
            return res.status(200).json({entrada: transacoesEntrada, saida: transacoesSaida});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }
    
  async create(req, res) {
    // front tem que enviar um tipo de usuario

    if(req.body.tipo_usuario=='professor'){
        professor.subtrairMoedas(req.body.quantidade, req.params.id )
        aluno.adicionarMoedas(req.body.quantidade, req.body.destinatario)
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