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
import './Vantagens.css'

const Vantagens = ()=> {

    let { tipo } = useParams()

    const [vantagens, setVantagens] = useState('')

    let form = useRef(null)

    const getVantagens = async()=> {
        try{
            let route = tipo !== 'empresa' ? `${server}/vantagens` : `${server}/vantagens/${sessionStorage.getItem("id_empresa")}`

            const res = await axios.get(route)

            console.log(res)

            setVantagens(res.data.vantagens)
        }catch(erro){
            console.log(erro)
            toast.error('Erro durante o carregamento das vantagens.', {toastId: 'falha'})
        }
    }

    const postVantagem = async(e)=> {
        e.preventDefault()
        if(e.target.valor.value <= 0){
            return toast.warning('Valor do produto deve ser maior que zero.', {toastId: 'falha'})
        }
        try{
            let data = new FormData(form.current)

            const res = await axios.post(`${server}/vantagens/${sessionStorage.getItem("id_empresa")}`, data, {headers: {'Content-Type': 'application/json'}})

            toast.success('Vantagem cadastrada com sucesso.', {toastId: 'sucesso'})
            getVantagens()
        }catch(erro){
            console.log(erro)
            toast.error('Erro durante o cadastro de vantagens.', {toastId: 'falha'})
        }
    }

    const buyVantagem = async(aluno, quantidade, destinatario, e)=> {
        e.preventDefault()
        try{
            let data = new FormData()

            data.append('tipo_usuario', 'aluno')
            data.append('quantidade', quantidade)
            data.append('destinatario', destinatario)

            const res = await axios.post(`${server}/transacoes/${aluno}`, data, {headers: {'Content-Type': 'application/json'}})

            console.log(res)

            toast.success('Vantagem adquirida com sucesso.', {toastId: 'sucesso'})
        }catch(erro){
            console.log(erro)
            toast.error('Erro durante a compra da vantagem.', {toastId: 'falha'})
        }
    }

    useEffect(()=> {
        getVantagens()
    },[])

    return(
        <>
        <h2>Vantagens</h2>

        {
            tipo === 'empresa' &&

            <form id={'transacao'} ref={form} onSubmit={postVantagem}>

                <h3>Nova vantagem</h3>

                <TextField size={'small'} required fullWidth label="Nome" variant="outlined" name={'nome'}/>
                <TextField size={'small'} required fullWidth label="Descrição" variant="outlined" name={'descricao'}/>
                <TextField size={'small'} required fullWidth label="Valor" variant="outlined" name={'valor'} type={'number'}/>
                <TextField size={'small'} required fullWidth label="URL Imagem" variant="outlined" name={'img'} type={'number'}/>

                <Button type={'submit'} fullWidth variant={'contained'}>Adicionar</Button>

            </form>
        }

        <section id={'vantagens'}>

            {vantagens && vantagens.map(item=>

                <div key={item.id}>
                    <h4>{item.NOME}</h4>
                    <img src={item.IMG}></img>
                    <p>{item.DESCRICAO}</p>
                    <p className={'preco'}>${item.VALOR}</p>
                    {tipo === 'aluno' &&
                        <Button variant={'contained'} onClick={(e)=> buyVantagem(sessionStorage.getItem("id_aluno"), item.VALOR, item.empresaId, e)}>Adquirir</Button>
                    }

                </div>
            )}

        </section>

        </>
    )
}

export default Vantagens
