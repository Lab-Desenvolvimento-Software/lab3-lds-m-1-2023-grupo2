// Estilo
import './App.css';
// libs
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Componentes
import Alunos from './paginas/Alunos.js'
import Empresas from './paginas/Empresas.js'
import Header from './componentes/Header.js'

function App() {
  return (
    <>

    <BrowserRouter>

      <Routes>

        <Route path={'/'} element={<Header/>}>

          <Route path={'/alunos'} element={<Alunos/>}/>
          <Route path={'/empresas'} element={<Empresas/>}/>

        </Route>

      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App;
