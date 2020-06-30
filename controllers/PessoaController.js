import models from '../models'

export default{
    add: async (req,res,next) =>{
        try {
           
            const reg = await models.Pessoa.create(req.body);
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro'
            });
            next(error);
        }
    },
    query: async (req,res,next) =>{
        try {
            //veja docum mongoose/query
           const reg =  await models.Pessoa.findOne({_id:req.query._id});
           if(!reg){
               res.status(404).send({
                msg:'Registro nao existe'
               });
           }else{
               res.status(200).json(reg);
           }
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro, add'
            });
            next(error);
        }
    },
    list: async (req,res,next) =>{
        try {
            //documen mongoose populate,etc
            // const reg =  await models.Pessoa.find({},{createdAt:0}); -->0 nao mostar createdAt,1 mostar apenas createdAt
           //.sort({createdAt:1}) a-async, -1 desc, //valor 'i' -> coincidir entre maisculas e minusculas
           let valor=req.query.valor;
           const reg=await models.Pessoa.find({$or:[{'nome':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}]},{createdAt:0})
           .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro , list'
            });
            next(error);
        }
    },
    listClientes: async (req,res,next) =>{
        try {
            //documen mongoose populate,etc
            // const reg =  await models.Pessoa.find({},{createdAt:0}); -->0 nao mostar createdAt,1 mostar apenas createdAt
           //.sort({createdAt:1}) a-async, -1 desc, //valor 'i' -> coincidir entre maisculas e minusculas
           let valor=req.query.valor;
           const reg=await models.Pessoa.find({$or:[{'nome':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}],'tipo_pessoa':'Cliente'},{createdAt:0})
           .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro , list'
            });
            next(error);
        }
    },
    listFornecedores: async (req,res,next) =>{
        try {
            //documen mongoose populate,etc
            // const reg =  await models.Pessoa.find({},{createdAt:0}); -->0 nao mostar createdAt,1 mostar apenas createdAt
           //.sort({createdAt:1}) a-async, -1 desc, //valor 'i' -> coincidir entre maisculas e minusculas
           let valor=req.query.valor;
           const reg=await models.Pessoa.find({$or:[{'nome':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}],'tipo_pessoa':'Fornecedor'},{createdAt:0})
           .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro , list'
            });
            next(error);
        }
    },
    update: async (req,res,next) =>{
       
        try {

            //verifica se Pessoa quer atualizar  o password
            let pas = req.body.password;
            const reg0 = await models.Pessoa.findOne({_id:req.body._id});
            if (pas!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }                 
          
            const reg =  await models.Pessoa.findByIdAndUpdate({_id:req.body._id},{tipo_pessoa:req.body.tipo_pessoa,nome:req.body.nome,tipo_documento:req.body.tipo_documento,num_documento:req.body.num_documento,direcao:req.body.direcao,telefone:req.body.telefone,email:req.body.email });
           res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro ,update'
            });
            next(error);
        }
    },
    remove: async (req,res,next) =>{
        try {
            const reg =  await models.Pessoa.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro, remove'
            });
            next(error);
        }
    },
    activate: async (req,res,next) =>{
        try {
            const reg =  await models.Pessoa.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro'
            });
            next(error);
        }
    },
    desactivate: async (req,res,next) =>{
        try {
            const reg =  await models.Pessoa.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro'
            });
            next(error);
        }
    }
}

