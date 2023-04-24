const TABLE_BODY = document.querySelector('#table-hidder>table>tbody')
const POST_DIV = document.getElementById('post-div')

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
        console.log(erro)
    }catch(erro){
        console.log(erro)
        TABLE_BODY.innerHTML = `
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td><button onclick="deleteAluno()" class="delete-button">Excluir</button></td>
        </tr>
        `
    }
}

const deleteAluno = async() => {
    alert('deletado')
}

const postAluno = async() => {
    alert('deletado')
}

// EMPRESAS

const getEmpresas = async() => {
    TABLE_BODY.innerHTML = ''
    try{
        const data = await fetch('http://localhost:2345/alunos')
        const rows = await data.json()
        console.log(erro)
    }catch(erro){
        console.log(erro)
        TABLE_BODY.innerHTML = `
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td><button onclick="deleteEmpresa()" class="delete-button">Excluir</button></td>
        </tr>
        `
    }
}

const deleteEmpresa = async() => {
    alert('deletada')
}

const postEmpresa = async() => {
    alert('deletado')
}
