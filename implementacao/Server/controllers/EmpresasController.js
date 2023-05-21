import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import Usuarios from '../models/Usuarios';

import Empresas from '../models/Empresas';


//TODO FAZER AJUSTES EM EMPRESAS!!!!!

class EmpresasController{
    async index(req, res){


        try {
            const empresas = await Empresas.findAll({

            })
            return res.status(200).json({empresas});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }

    async create(req, res) {


      // const empresas =  {
      //   CNPJ: req.body.cnpj,
      // }



      //   try{        
      //     await Usuarios.create({
      //       TIPO: "empresa",
      //       LOGIN: req.body.login,
      //       SENHA: req.body.senha,
      //       NOME: req.body.nome,
    
      //       empresas: [empresas]
    
      //     },{
      //        include: [Empresas]
      //     });
      //     return res.status(200).json('Empresa cadastrado com sucesso!');   
      //   } catch (error) {
      //     return res.status(500).json({ error });
      //   }


        const usuarios =  {
          TIPO: "empresa",
          LOGIN: req.body.login,
          SENHA: req.body.senha,
          NOME: req.body.nome,
  
        }
  
  
  
          try{        
            await Empresas.create({
              CNPJ: req.body.cnpj,
      
              usuario: usuarios
      
            },{
               include: [Usuarios]
            });
            return res.status(200).json('Empresa cadastrado com sucesso!');   
          } catch (error) {
            return res.status(500).json({ error });
          }
    }

    async update(req, res) {
        try{        
            await Empresas.upsert({
            id: req.params.id,

            NOME: req.body.nome,
            CNPJ: req.body.cnpj,
          });
          return res.status(200).json('Informações alteradas com sucesso!');   
        } catch (error) {
          return res.status(500).json({ error });
        }
    }
  async delete(req, res) {
    try {
      await Empresas.destroy({ where: { id: req.params.id } });
      res.status(200).json('Empresa Excluida com sucesso!');
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async show(req, res) {
    try {
      const empresa = await Empresas.findByPk(req.params.id);
      res.status(200).json(empresa);
    } catch (error) {
      res.status(500).json({ error });
    }
  }


}

export default new EmpresasController();