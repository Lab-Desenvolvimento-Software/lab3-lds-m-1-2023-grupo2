import { Router } from 'express';
import alunos from './controllers/AlunosController'
import empresas from './controllers/EmpresasController'


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
module.exports = router