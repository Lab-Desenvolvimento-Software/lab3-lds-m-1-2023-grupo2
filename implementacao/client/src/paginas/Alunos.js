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
            setAlunos(res.data.alunos)
        }catch(erro){
            console.log(erro)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'MOEDAS', headerName: 'Moedas', width: 100 },
        { field: 'EMAIL', headerName: 'E-mail', width: 230 },
        { field: 'CPF', headerName: 'CPF', width: 140 },
        { field: 'RG', headerName: 'RG', width: 140 },
        { field: 'CURSO', headerName: 'Curso', width: 150 },
        { field: 'INSTITUICAO', headerName: 'Instituição', width: 100 },
        { field: 'LOGRADOURO', headerName: 'Logradouro', width: 200 },
        { field: 'NUMERO', headerName: 'Número', width: 130 },
        { field: 'BAIRRO', headerName: 'Bairro', width: 130 },
    ]

    return(
        <>
        <h2>Alunos</h2>

        <DataGrid
            rows={alunos}
            columns={columns}
            initialState={{pagination: {paginationModel: {pageSize: 50}}}}
            pageSizeOptions={[50]}
        />
        </>
    )
}

export default Alunos
