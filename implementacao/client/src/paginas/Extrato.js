// MUI
import { DataGrid } from '@mui/x-data-grid';
// Scripts
import server from '../scripts/config.js'
// Libs
import { useState, useEffect } from 'react'
import axios from 'axios'

const Empresas = ()=> {

    useEffect(()=> {
        getExtrato()
    },[])

    const [extrato, setExtrato] = useState([])

    const getExtrato = async()=> {
        try{
            const res = await axios.get(`${server}/transacoes`)
            // setEmpresas(res)
            console.log(res)
        }catch(erro){
            console.log(erro)
        }
    }

    const columns = [
        // qnt destinatario
        { field: '', headerName: 'ID Remetente', width: 150 },
        { field: 'nome', headerName: 'ID Destinatário', width: 150 },
        { field: 'cnpj', headerName: 'Quantia', width: 150 }
    ]

    return(
        <>
        <h2>Extrato</h2>

        <DataGrid
            rows={extrato}
            columns={columns}
            initialState={{pagination: {paginationModel: {pageSize: 50}}}}
            pageSizeOptions={[50]}
        />
        </>
    )
}

export default Empresas
