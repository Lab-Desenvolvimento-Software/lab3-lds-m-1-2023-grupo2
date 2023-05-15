import Alunos from "../models/Alunos";
import Professores from "../models/Professores";
import Usuarios from "../models/Usuarios";



class LoginController{


    async login(req,res){
        console.log('teste')
        try {
            const usuario = await Usuarios.findOne({where:{
                LOGIN: req.body.login,
                SENHA: req.body.senha
            },
            include: [Professores, Alunos]})
            if(!usuario){
                return res.status(401).json("Usuario ou senha incorretos!");
            }
            else{
                console.log('oiiiiiiiiiiiiiiiiiiiii')
                return res.status(200).json(usuario);
            }


          } catch (error) {
            console.log(error)
            return res.status(500).json({ error });
        }
    }


}

export default new LoginController();