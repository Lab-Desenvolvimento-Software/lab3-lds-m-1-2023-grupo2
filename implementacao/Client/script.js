const TABLE_BODY = document.querySelector('#table-hidder>table>tbody')
const POST_DIV = document.getElementById('post-div')
const POST_FORM_ALUNO = document.getElementById('post-form-aluno')
const POST_FORM_EMPRESA = document.getElementById('post-form-empresa')

POST_DIV.style.display = 'none'
function togglePostDiv(){
    if(POST_DIV.style.display == 'none'){
        POST_DIV.style.display = 'block'
    }else{
        POST_DIV.style.display = 'none'
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

// EVENTOS

POST_FORM_ALUNO.addEventListener('submit', postAluno)
POST_FORM_EMPRESA.addEventListener('submit', postEmpresa)
