const TABLE_BODY = document.querySelector('#table-hidder>table>tbody')

const POST_DIV = document.getElementById('post-div')
const POST_FORM_ALUNO = document.getElementById('post-form-aluno')
const POST_FORM_EMPRESA = document.getElementById('post-form-empresa')

const UPDATE_DIV = document.getElementById('update-div')
const UPDATE_FORM_ALUNO = document.getElementById('update-form-aluno')
const UPDATE_FORM_EMPRESA = document.getElementById('update-form-empresa')

let edit_id;

POST_DIV.style.display = 'none'
function togglePostDiv(){
    if(POST_DIV.style.display == 'none'){
        POST_DIV.style.display = 'block'
    }else{
        POST_DIV.style.display = 'none'
    }
}
UPDATE_DIV.style.display = 'none'
function toggleUpdateDiv(){
    if(UPDATE_DIV.style.display == 'none'){
        UPDATE_DIV.style.display = 'block'
    }else{
        UPDATE_DIV.style.display = 'none'
    }
}

// ENTIDADES =======================================

// ALUNOS

const getAlunos = async() => {
    TABLE_BODY.innerHTML = ''
    try{
        const data = await fetch('http://localhost:2345/alunos')
        const rows = await data.json()
        console.log(rows)
        for(let item in rows.alunos){
            TABLE_BODY.innerHTML += `
            <tr>
                <th scope="row">${rows.alunos[item].id}</th>
                <td>${rows.alunos[item].NOME}</td>
                <td>${rows.alunos[item].EMAIL}</td>
                <td>${rows.alunos[item].RG}</td>
                <td>${rows.alunos[item].LOGRADOURO}</td>
                <td>${rows.alunos[item].CIDADE}</td>
                <td>${rows.alunos[item].BAIRRO}</td>
                <td>${rows.alunos[item].NUMERO}</td>
                <td>${rows.alunos[item].INSTITUICAO}</td>
                <td>${rows.alunos[item].CURSO}</td>
                <td>${rows.alunos[item].MOEDAS}</td>
                <td><button onclick="deleteAluno(${rows.alunos[item].id})" class="delete-button">Excluir</button></td>
                <td><button onclick="getSingleAluno(${rows.alunos[item].id})" class="edit-button">Editar</button></td>
            </tr>
            `
        }
    }catch(erro){
        alert('Não foi possível acessar a lista de alunos cadastrados.')
        console.log(erro)
    }
}

const deleteAluno = async(id) => {
    try{
        const data = await fetch(`http://localhost:2345/alunos/${id}`, {
            method: 'DELETE',
        })
        const res = await data.json()
        console.log(res)
        alert(res)
        getAlunos()
    }catch(erro){
        alert('Não foi possível deletar o cadastro do aluno.')
        console.log(erro)
    }
}

const postAluno = async(e) => {
    e.preventDefault()
    try{
        const data = await fetch('http://localhost:2345/alunos', {
            method: "POST",
            body: JSON.stringify({
                nome: e.target.nome.value,
                email: e.target.email.value,
                rg: e.target.rg.value,
                logradouro: e.target.logradouro.value,
                cidade: e.target.cidade.value,
                bairro: e.target.bairro.value,
                numero: e.target.numero.value,
                instituicao: e.target.instituicao.value,
                curso: e.target.curso.value
            }),
            headers: {"Content-type": "application/json"}
        })
        const res = await data.json()
        alert(res)
        console.log(res)
        getAlunos()
    }catch(erro){
        alert('Não foi possível cadastrar um novo aluno.')
        console.log(erro)
    }
}

const getSingleAluno = async(id)=> {
    toggleUpdateDiv()
    edit_id = id
    try{
        const data = await fetch(`http://localhost:2345/alunos/${id}`)
        const aluno = await data.json()
        console.log(aluno)
        let inputs = UPDATE_FORM_ALUNO.querySelectorAll('input')
        inputs[0].value = aluno.NOME
        inputs[1].value = aluno.EMAIL
        inputs[2].value = aluno.RG
        inputs[3].value = aluno.LOGRADOURO
        inputs[4].value = aluno.CIDADE
        inputs[5].value = aluno.BAIRRO
        inputs[6].value = aluno.NUMERO
        inputs[7].value = aluno.INSTITUICAO
        inputs[8].value = aluno.CURSO
    }catch(erro){
        alert('Não foi possível acessar acessar os dados do aluno desejado.')
        console.log(erro)
    }
}

const updateAluno = async(e)=> {
    e.preventDefault()
    try{
        const data = await fetch(`http://localhost:2345/alunos/${edit_id}`, {
            method: "PUT",
            body: JSON.stringify({
                nome: e.target.nome.value,
                email: e.target.email.value,
                rg: e.target.rg.value,
                logradouro: e.target.logradouro.value,
                cidade: e.target.cidade.value,
                bairro: e.target.bairro.value,
                numero: e.target.numero.value,
                instituicao: e.target.instituicao.value,
                curso: e.target.curso.value
            }),
            headers: {"Content-type": "application/json"}
        })
        const res = await data.json()
        alert(res)
        console.log(res)
        getAlunos()
    }catch(erro){
        alert('Não foi possível editar o cadastro do aluno.')
        console.log(erro)
    }
}

// EMPRESAS

const getEmpresas = async() => {
    TABLE_BODY.innerHTML = ''
    try{
        const data = await fetch('http://localhost:2345/empresas')
        const rows = await data.json()
        console.log(rows)
        for(let item in rows.empresas){
            TABLE_BODY.innerHTML += `
            <tr>
                <th scope="row">${rows.empresas[item].id}</th>
                <td>${rows.empresas[item].NOME}</td>
                <td>${rows.empresas[item].CNPJ}</td>
                <td><button onclick="deleteEmpresa(${rows.empresas[item].id})" class="delete-button">Excluir</button></td>
                <td><button onclick="getSingleEmpresa(${rows.empresas[item].id})" class="edit-button">Editar</button></td>
            </tr>
            `
        }
    }catch(erro){
        alert('Não foi possível acessar a lista de empresas cadastradas.')
        console.log(erro)
    }
}

const deleteEmpresa = async(id) => {
    try{
        const data = await fetch(`http://localhost:2345/empresas/${id}`, {
            method: 'DELETE',
        })
        const res = await data.json()
        console.log(res)
        alert(res)
        getEmpresas()
    }catch(erro){
        alert('Não foi possível deletar o cadastro da empresa.')
        console.log(erro)
    }
}

const postEmpresa = async(e) => {
    e.preventDefault()
    try{
        const data = await fetch('http://localhost:2345/empresas', {
            method: "POST",
            body: JSON.stringify({
                nome: e.target.nome.value,
                cnpj: e.target.cnpj.value,
            }),
            headers: {"Content-type": "application/json"}
        })
        const res = await data.json()
        alert(res)
        console.log(res)
        getEmpresas()
    }catch(erro){
        alert('Não foi possível cadastrar um novo aluno.')
        console.log(erro)
    }
}

const getSingleEmpresa = async(id)=> {
    toggleUpdateDiv()
    edit_id = id
    try{
        const data = await fetch(`http://localhost:2345/empresas/${id}`)
        const empresa = await data.json()
        console.log(empresa)
        let inputs = UPDATE_FORM_EMPRESA.querySelectorAll('input')
        inputs[0].value = empresa.NOME
        inputs[1].value = empresa.CNPJ
    }catch(erro){
        alert('Não foi possível acessar acessar os dados da empresa desejada.')
        console.log(erro)
    }
}

const updateEmpresa = async(e)=> {
    e.preventDefault()
    try{
        const data = await fetch(`http://localhost:2345/empresas/${edit_id}`, {
            method: "PUT",
            body: JSON.stringify({
                nome: e.target.nome.value,
                cnpj: e.target.cnpj.value,
            }),
            headers: {"Content-type": "application/json"}
        })
        const res = await data.json()
        alert(res)
        console.log(res)
        getEmpresas()
    }catch(erro){
        alert('Não foi possível editar o cadastro da empresa.')
        console.log(erro)
    }
}

// EVENTOS ========================================

POST_FORM_ALUNO.addEventListener('submit', postAluno)
POST_FORM_EMPRESA.addEventListener('submit', postEmpresa)

UPDATE_FORM_ALUNO.addEventListener('submit', updateAluno)
UPDATE_FORM_EMPRESA.addEventListener('submit', updateEmpresa)
