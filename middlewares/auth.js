import tokenService from '../services/token';
export default {
    verifyUsuario: async (req,res,next) => {
        if (!req.headers.token){
            console.log('User No token');
            return res.status(404).send({
                message: 'No token'
            
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor' || response.rol=='Supervisor'){
            next();
        } else{
            console.log('No autorizado');
            return res.status(403).send({
                message: 'No autorizado'
                
            });
        }
    },
    verifyAdministrador: async (req,res,next) => {
        if (!req.headers.token){
            console.log('Adm No Token');
            return res.status(404).send({
                message: 'No token'
           
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador'){
            next();
        } else{
            console.log('Adm No autorizado');
            return res.status(403).send({
                message: 'No autorizado'
               
            });
        }
    },
    verifySupervisor: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol=='Supervisor'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyVendedor: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    }
}