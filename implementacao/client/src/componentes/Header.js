// Imagens
import logo from '../imagens/moeda-40x40.png'
// Estilo
import './Header.css'
// Libs
import { Link, Outlet } from 'react-router-dom'

const Header = ()=> {
    return(
        <>
        <header>
            <div>
                <h1>S.M.E</h1>
                <img src={logo} alt="Ícone de moeda"/>
            </div>
            <nav>
                <Link to={'/alunos'}>Alunos</Link>
                <div className={"nav-divider"}></div>
                <Link to={'/empresas'}>Empresas</Link>
            </nav>
        </header>
        <section id={'main'}>

            <Outlet></Outlet>

        </section>
        </>
    )
}

export default Header
