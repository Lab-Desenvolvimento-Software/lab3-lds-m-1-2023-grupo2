import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import fs from 'fs'
import Empresas from '../models/Empresas';


class EmpresasController{
    async index(req, res){
        const {
            NOME,
            CNPJ,
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
            const empresas = await Empresas.findAll({
              where,
              order,
              limit,
              offset: limit * page - limit,
            })
            return res.status(200).json({empresas});
          } catch (error) {
            return res.status(500).json({ error });
        }
    }

    async create(req, res) {

        try{        
          await Empresas.create({
            NOME: req.body.nome,
            CNPJ: req.body.cnpj,

            // ASSOCIACAO AQUI

          },{
            // include: [ inserir associacao aqui ]
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