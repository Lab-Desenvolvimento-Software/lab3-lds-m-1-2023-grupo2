
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
import { Readable } from 'stream';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
function formatTransactionForTable(transaction) {
  const usuarioNome = transaction.destinatario ? transaction.destinatario.NOME : transaction.remetente ? transaction.remetente.NOME : 'N/A';
  return [
    transaction.id,
    transaction.QUANTIDADE,
    new Date(transaction.createdAt).toLocaleString(),
    usuarioNome
  ];
}


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
    try {
      const transacoesSaida = await Transacoes.findAll({
        where: {
          remetenteId: req.params.id,
        },
        attributes: ['id', 'QUANTIDADE', 'createdAt'],
        include: [{
          model: Usuarios,
          as: 'destinatario', 
          attributes: ['NOME'], 
        }]
      });
      
      const transacoesEntrada = await Transacoes.findAll({
        where: {
          destinatarioId: req.params.id,
        },
        attributes: ['id', 'QUANTIDADE', 'createdAt'],
        include: [{
          model: Usuarios,
          as: 'remetente', 
          attributes: ['NOME'], 
        }]
      });
      
      // Preparar estrutura do documento
      const docDefinition = {
        content: [
          { text: 'Relatório de Extrato', style: 'header' },
          { text: 'Transações de Saída', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: [
                [
                  { text: '#', color: 'white', fillColor: 'red' }, 
                  { text: 'Quantidade', color: 'white', fillColor: 'red' },
                  { text: 'Data e Hora', color: 'white', fillColor: 'red' }, 
                  { text: 'Destinatário', color: 'white', fillColor: 'red' },
                ],
                ...transacoesSaida.map(formatTransactionForTable)
              ],
            },
          },
          { text: 'Transações de entrada', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: [
                [
                  { text: '#', color: 'white', fillColor: 'green' }, 
                  { text: 'Quantidade', color: 'white', fillColor: 'green' }, 
                  { text: 'Data e Hora', color: 'white', fillColor: 'green' }, 
                  { text: 'Remetente', color: 'white', fillColor: 'green' },
                ],
                ...transacoesEntrada.map(formatTransactionForTable)
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
        },
      };

      const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBuffer((buffer) => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      
      res.setHeader('Content-Disposition', 'attachment;filename=extrato.pdf');
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    }

  async create(req, res) {
    // front tem que enviar um tipo de usuario


    try {
      console.log('teste')
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

 
  }

}

export default new TransacoesController();