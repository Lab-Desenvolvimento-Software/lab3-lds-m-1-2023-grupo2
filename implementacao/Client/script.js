const TABLE_BODY = document.querySelector('#table-hidder>table>tbody')

const whichEntity = (entity)=> {
    TABLE_BODY.innerHTML = ''
    if(entity == 0){
        getEntity('alunos')
    }else if(entity == 1){
        getEntity('empresas')
    }
}

const getEntity = async() => {
    try{
        const data = await fetch('http://')
    }catch(erro){

    }
}
