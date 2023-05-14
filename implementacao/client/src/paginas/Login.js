// Imagens
import logo from '../imagens/moeda-40x40.png'
// Scripts
import server from '../scripts/config.js'
// Libs
import axios from 'axios'
import { useRef } from 'react'
// Estilo
import './Login.css'
// Mui
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login = ()=> {

    let form = useRef(null)

    const login = async()=> {
        try{
            let data = new FormData(form.current)
            const res = await axios.post(`${server}/login`, data)
            console.log(res)
        }catch(erro){
            console.log(erro)
        }
    }

    return(
        <form id={'login'} ref={form}>

            <img src={logo} alt="Ícone de moeda"/>

           <TextField fullWidth id="username" label="Usuário" variant="outlined" name={'login'}/>
           <TextField fullWidth id="password" label="Senha" variant="outlined" name={'senha'}/>

           <Button onClick={login} fullWidth variant={'contained'}>Entrar</Button>

        </form>
    )
}

export default Login
