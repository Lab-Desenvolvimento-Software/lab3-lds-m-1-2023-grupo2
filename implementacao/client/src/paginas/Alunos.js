// MUI
import { DataGrid } from '@mui/x-data-grid';
// Scripts
import server from '../scripts/config.js'
// Libs
import { useState, useEffect } from 'react'
import axios from 'axios'

const Alunos = ()=> {

    useEffect(()=> {
        getAlunos()
    },[])

    const [alunos, setAlunos] = useState([])

    const getAlunos = async()=> {
        try{
            const res = await axios.get(`${server}/alunos`)
            setAlunos(res)
        }catch(erro){
            console.log(erro)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', width: 130 },
        { field: 'cpf', headerName: 'CPF', width: 130 }
      ]

    const rows = alunos

    return(
        <>
        <h2>Alunos</h2>

        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
        />
        </>
    )
}

export default Alunos
