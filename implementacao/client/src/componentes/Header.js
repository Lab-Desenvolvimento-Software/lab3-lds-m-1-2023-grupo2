// Imagens
import logo from '../imagens/moeda-40x40.png'
// Estilo
import './Header.css'
// Libs
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// MUI
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ()=> {

    const navigate = useNavigate()

    const [user_type, setUserType] = useState()

    const clearStorage = ()=> {
        sessionStorage.clear()
    }

    useEffect(()=> {
        if(sessionStorage.getItem("id")){
            navigate('/alunos')
            setUserType(sessionStorage.getItem("tipo"))
        }else{
            navigate('/login')
        }
    },[])

    return(
        <>
        <header>
            <div>
                <h1>S.M.E</h1>
                <img id={'logo'} src={logo} alt="Ícone de moeda"/>
            </div>
            <nav>
                <Link to={'/alunos'}>Alunos</Link>
                <div className={"nav-divider"}></div>
                <Link to={'/empresas'}>Empresas</Link>
                <div className={"nav-divider"}></div>
                <Link to={`/extrato/${user_type}`}>Extrato</Link>
                <div className={"nav-divider"}></div>
                <Link to={`/login`} onClick={clearStorage}><LogoutIcon/></Link>
            </nav>
        </header>
        <section id={'main'}>

            <Outlet></Outlet>

        </section>
        </>
    )
}

export default Header
