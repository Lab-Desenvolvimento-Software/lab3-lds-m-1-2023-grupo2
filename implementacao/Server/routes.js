import { Router } from 'express';
import alunos from './controllers/AlunosController'
import empresas from './controllers/EmpresasController'
import professores from './controllers/ProfessorController'
import login from './controllers/LoginController'
import transacoes from './controllers/TransacoesController'
import vantagens from './controllers/VantagensController'

//controllers

//config
const router = new Router();


//CRUD EDNPOINT
//alunos
router.get('/alunos', alunos.index)
router.post('/alunos', alunos.create)
router.delete('/alunos/:id', alunos.delete)
router.put('/alunos/:id', alunos.update)
router.get('/alunos/:id', alunos.show)


//empresas
router.get('/empresas', empresas.index)
router.post('/empresas', empresas.create)
router.delete('/empresas/:id', empresas.delete)
router.put('/empresas/:id', empresas.update)
router.get('/empresas/:id', empresas.show)

//professores

//transacoes

router.get('/transacoes/:id', transacoes.index) // /transacoes/:id  enviar apenas id pelo parametro, recebe transacoes de entrada e de saida (dois objetos)
router.post('/transacoes/:id', transacoes.create) // /transacoes/:id
// post precisa mandar: tipo_usuario ='professor', quantidade, id (usuario e nao do professor/aluno. O mesmo que ta nos parametros do get, esse e o remetente, no caso o professor). destinatario -> o id do aluno que vai receber (se for fazer um dropdown, pega o atributo usuarioId do aluno e envia).

//login

router.post('/login', login.login)// /login -> envia no body login e senha, salva os dados de retorno na session
router.get('/vantagens',vantagens.index )
router.get('/vantagens/:id',vantagens.indexEmpresa )
router.post('/vantagens/:id',vantagens.create )



router.get('/professorMoedas/:id', professores.showMoedas)
module.exports = router