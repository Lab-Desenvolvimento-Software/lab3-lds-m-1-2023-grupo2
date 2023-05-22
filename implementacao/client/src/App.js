// Estilo
import './App.css';
// Libs
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes
import Alunos from './paginas/Alunos.js'
import Empresas from './paginas/Empresas.js'
import Login from './paginas/Login.js'
import Extrato from './paginas/Extrato.js'
import Vantagens from './paginas/Vantagens.js'
import Header from './componentes/Header.js'

function App() {

  return (
    <>

    <BrowserRouter>

      <Routes>

        <Route path={'/login'} element={<Login/>}/>

        <Route path={'/'} element={<Header/>}>

          <Route path={'/alunos'} element={<Alunos/>}/>
          <Route path={'/empresas'} element={<Empresas/>}/>
          <Route path={'/extrato/:tipo'} element={<Extrato/>}/>
          <Route path={'/vantagens/:tipo'} element={<Vantagens/>}/>

        </Route>

      </Routes>

    </BrowserRouter>

    <ToastContainer position={"top-center"} autoClose={3000}/>

    </>
  )
}

export default App;
