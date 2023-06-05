
import { Op } from 'sequelize';
import Transacoes from '../models/Transacoes';
import professor from './ProfessorController';
import aluno from './AlunosController'
import nodemailer from 'nodemailer'
import Professores from '../models/Professores';
import Alunos from '../models/Alunos';
import Usuarios from '../models/Usuarios';
import vantagens from './VantagensController';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class TransacoesController{


    async index(req,res){
        try {
            
            const transacoes = await Transacoes.findAll({where:{

                    [Op.or]: [
                      {  remetenteId: req.params.id},
                      {  destinatarioId: req.params.id}
                    ]
            
            },
            include: [{ model: Usuarios, as: 'remetente' },
            { model: Usuarios, as: 'destinatario' }]})

            return res.status(200).json(transacoes);

          } catch (error) {
            console.log(error)
            return res.status(500).json({ error });
        }
    }

  async extratoPdf(req,res){
    // try {
    //   const transacoesSaida = await Transacoes.findAll({
    //     where: {
    //       remetenteId: req.params.id,
    //     },
    //   });
    //   const transacoesEntrada = await Transacoes.findAll({
    //     where: {
    //       destinatarioId: req.params.id,
    //     },
    //   });

    //   // Preparar estrutura do documento
    //   const docDefinition = {
    //     content: [
    //       { text: 'Relatório de Extrato', style: 'header' },
    //       { text: 'Transações de Saída', style: 'subheader' },
    //       ...transacoesSaida.map((transaction) =>
    //         JSON.stringify(transaction)
    //       ), 
    //       { text: 'Transações de entrada', style: 'subheader' },
    //       ...transacoesEntrada.map((transaction) =>
    //         JSON.stringify(transaction)
    //       ), // JSON.stringify por outra funcao de formatação
    //     ],
    //     styles: {
    //       header: {
    //         fontSize: 18,
    //         bold: true,
    //         margin: [0, 0, 0, 10],
    //       },
    //       subheader: {
    //         fontSize: 16,
    //         bold: true,
    //         margin: [0, 10, 0, 5],
    //       },
        
    //     },
    //   };

    //   const pdfDoc = pdfMake.createPdf(docDefinition);
    //   pdfDoc.getBuffer((buffer) => {
    //     res.setHeader('Content-Disposition', 'attachment;filename=extrato.pdf'); //browser faz o download do arquivo
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.send(buffer);
    //   });
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).json({ error });
    // }
    const docDefinition = {
      content: [
        'This is a test PDF',
      ],
    };
    
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBuffer((buffer) => {
      res.setHeader('Content-Disposition', 'attachment;filename=extrato.pdf'); 
      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    });
  }
    
  async create(req, res) {
    // front tem que enviar um tipo de usuario

    if(req.body.tipo_usuario=='professor'){
        professor.subtrairMoedas(req.body.quantidade, req.params.id )
        aluno.adicionarMoedas(req.body.quantidade, req.body.destinatario)
        

//=================email===================//
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
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"lab3"', // sender address
      to: "ericjardim007@gmail.com", // list of receivers
      subject: "Moedas enviadas", // Subject line
      text: req.body.mensagem, // plain text body
     // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//=================email===================//

    }else{
      if(req.body.tipo_usuario=='aluno'){

        aluno.subtrairMoedas(req.body.quantidade, req.params.id)

        vantagens.claim(req.body.destinatario,req.params.id)


          return res.status(200).json({message:"Vantagem reinvindicada com sucesso! Um codigo foi enviado ao seu email!"})

        


      }
    }

    try {
      await Transacoes.create({
        QUANTIDADE: req.body.quantidade,

        remetenteId: req.params.id,

        destinatarioId: req.body.destinatario
      }
    );



      return res.status(200).json("transacao realizada com sucesso!");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

}

export default new TransacoesController();