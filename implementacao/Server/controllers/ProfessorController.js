
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

  async subtrairMoedas(quantidade){

  }



  


}

export default new ProfessorController();