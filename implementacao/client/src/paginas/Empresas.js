// MUI
import { DataGrid } from '@mui/x-data-grid';
// Scripts
import server from '../scripts/config.js'
// Libs
import { useState, useEffect } from 'react'
import axios from 'axios'

const Empresas = ()=> {

    useEffect(()=> {
        getEmpresas()
    },[])

    const [empresas, setEmpresas] = useState([])

    const getEmpresas = async()=> {
        try{
            const res = await axios.get(`${server}/empresas`)
            setEmpresas(res.data.empresas)
        }catch(erro){
            console.log(erro)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'CNPJ', headerName: 'CNPJ', width: 150 },
        { field: 'EMAIL', headerName: 'E-mail', width: 200 },
    ]

    return(
        <>
        <h2>Empresas</h2>

        <DataGrid
            rows={empresas}
            columns={columns}
            initialState={{pagination: {paginationModel: {pageSize: 50}}}}
            pageSizeOptions={[50]}
        />
        </>
    )
}

export default Empresas
