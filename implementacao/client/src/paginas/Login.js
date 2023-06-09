// Imagens
import logo from '../imagens/moeda-40x40.png'
// Scripts
import server from '../scripts/config.js'
// Libs
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// Estilo
import './Login.css'
// Mui
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login = ()=> {

    const navigate = useNavigate()

    let form = useRef(null)

    const login = async(e)=> {
        e.preventDefault()
        try{
            let data = new FormData(form.current)

            const res = await axios.post(`${server}/login`, data, {headers: {'Content-Type': 'application/json'}})

            console.log(res)

            sessionStorage.setItem("id", `${res.data.id}`) // ID do usuário
            sessionStorage.setItem("tipo", `${res.data.TIPO}`) // aluno, professor, empresa

            res.data.TIPO === 'empresa' && sessionStorage.setItem("id_empresa", `${res.data.empresa.id}`)
            res.data.TIPO === 'aluno' && sessionStorage.setItem("id_aluno", `${res.data.aluno.id}`)
            res.data.TIPO === 'professor' && sessionStorage.setItem("id_professor", `${res.data.professore.id}`)

            navigate('/')
            toast.success('Login efetuado com sucesso.', {toastId: 'sucesso'})
        }catch(erro){
            console.log(erro)
            toast.error('Login ou senha incorretos.', {toastId: 'falha'})
        }
    }

    return(
        <form id={'login'} ref={form} onSubmit={login}>

            <img src={logo} alt="Ícone de moeda"/>

            <TextField required fullWidth id="username" label="Usuário" variant="outlined" name={'login'}/>
            <TextField required type="password" fullWidth id="password" label="Senha" variant="outlined" name={'senha'}/>

            <Button type={'submit'} fullWidth variant={'contained'}>Entrar</Button>

        </form>
    )
}

export default Login
