import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
 import Vantagens from '../models/Vantages';
 import nodemailer from 'nodemailer'
import Alunos from '../models/Alunos'
import Empresas from '../models/Empresas';


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
              IMG: req.body.img,
              empresaId: req.params.id //id da empresa

          });
            return res.status(200).json('Vantagem cadastrada com sucesso!');
          } catch (error) {
            return res.status(500).json({ error });
          }
    }

    async claim(idempresa, idaluno){

      const codigo = Math.random().toString(36).substring(2,9)
      console.log(codigo)
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });


      //achar email do parceiro
      try {
        const empresa = await Empresas.findByPk(idempresa, {
          attributes: ['EMAIL'],
        });
        const { EMAIL } = empresa;


            
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"lab3"', // sender address
          to: EMAIL, // list of receivers
          subject: "Resgate de Vantagem", // Subject line
          text: "codigo do cupom: "+codigo, // plain text body
        // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      } catch (error) {
        console.error(error);
      }
    
  
    //achar email do aluno

    try {
      const aluno = await Alunos.findByPk(idaluno, {
        attributes: ['EMAIL'],
      });
      const { EMAIL } = aluno;

          
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"lab3"', // sender address
        to: EMAIL, // list of receivers
        subject: "Resgate de Vantagem", // Subject line
        text: "codigo do cupom: "+codigo, // plain text body
      // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
      console.error(error);
    }

//=================email===================//

  
      return codigo;
      
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
