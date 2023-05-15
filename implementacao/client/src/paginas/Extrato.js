// MUI
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// Scripts
import server from '../scripts/config.js'
// Libs
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
// Estilo
import './Extrato.css'

const Empresas = ()=> {

    useEffect(()=> {
        getExtrato()
    },[])

    const flattenObject = (ob)=> {
        const toReturn = {};

        Object.keys(ob).map(i => {
          if (typeof ob[i] === 'object' && ob[i] !== null) {
            const flatObject = flattenObject(ob[i]);
            Object.keys(flatObject).map(x => {
              toReturn[`${i}.${x}`] = flatObject[x];
              return x;
            });
          } else {
            toReturn[i] = ob[i];
          }
          return i;
        });
        return toReturn;
    }

    let { tipo } = useParams()

    const [extrato, setExtrato] = useState([])

    let form = useRef(null)

    const getExtrato = async()=> {
        try{
            const res = await axios.get(`${server}/transacoes/${sessionStorage.getItem("id")}`)
            setExtrato(res.data.map((jorge) => flattenObject(jorge)))
            console.log(res.data.map((jorge) => flattenObject(jorge)))
        }catch(erro){
            console.log(erro)
            toast.error('Erro durante o carregamento das transações.', {toastId: 'falha'})
        }
    }

    const columns = [
        // qnt destinatario
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'QUANTIDADE', headerName: 'Quantia', width: 150 },
        { field: 'remetente.NOME', headerName: 'Remetente', width: 150 },
        { field: 'destinatario.NOME', headerName: 'Destinatário', width: 150 }
    ]

    const postTransacao = async(e)=> {
        e.preventDefault()
        try{
            let data = new FormData(form.current)
            data.append("tipo_usuario", `${tipo}`);

            const res = await axios.post(`${server}/transacoes/${sessionStorage.getItem("id")}`, data, {headers: {'Content-Type': 'application/json'}})

            toast.success('Transação realizada com sucesso.', {toastId: 'sucesso'})
            getExtrato()
        }catch(erro){
            console.log(erro)
            toast.error('Erro durante a transação.', {toastId: 'falha'})
        }
    }

    return(
        <>
        <h2>Extrato</h2>

        {
            tipo === 'professor' &&

            <form id={'transacao'} ref={form} onSubmit={postTransacao}>

                <h3>Nova transação</h3>

                <TextField size={'small'} required fullWidth label="Quantidade" variant="outlined" name={'quantidade'} type={'number'}/>
                <TextField size={'small'} required fullWidth label="Destinatario" variant="outlined" name={'destinatario'} type={'number'}/>
                <TextField size={'small'} required fullWidth label="Mensagem" variant="outlined" name={'mensagem'}/>

                <Button type={'submit'} fullWidth variant={'contained'}>Entrar</Button>

            </form>
        }



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
