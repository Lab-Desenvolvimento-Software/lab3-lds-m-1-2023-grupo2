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
        { field: 'EMAIL', headerName: 'E-mail', width: 130 },
        { field: 'CPF', headerName: 'CPF', width: 130 },
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
