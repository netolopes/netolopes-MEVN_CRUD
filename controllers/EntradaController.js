import models from '../models'


async function aumentarStock(idartigo,qtde){
    let {stock} = await models.Artigo.findOne({_id:idartigo});
    let nStock= parseInt(stock) + parseInt(qtde);
    const reg= await models.Artigo.findByIdAndUpdate({_id:idartigo},{stock:nStock})
}

async function diminuirStock(idartigo,qtde){
    let {stock} = await models.Artigo.findOne({_id:idartigo});
    let nStock= parseInt(stock) - parseInt(qtde);
    const reg= await models.Artigo.findByIdAndUpdate({_id:idartigo},{stock:nStock})
}

export default{
    add: async (req,res,next) =>{
        try {
            //veja doc mongoose
            const reg = await models.Entrada.create(req.body);
            //atualizar artigo
            let detalhes = req.body.detalhes;
            detalhes.map(function(x){
                    aumentarStock(x._id,x.qtde);
            });
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erroxx'
            });
            next(error);
        }
    },
    query: async (req,res,next) =>{
        try {
            //veja docum mongoose/query
           const reg =  await models.Entrada.findOne({_id:req.query._id})
            //relacionar por usuario  e pessoa - chv estrangeira -mostrar os nomes
           .populate('usuario',{nome:1})
           .populate('pessoa',{nome:1});
           if(!reg){
               res.status(404).send({
                msg:'Registro nao existe'
               });
           }else{
               res.status(200).json(reg);
           }
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro'
            });
            next(error);
        }
    },
    list: async (req,res,next) =>{
        try {
            //documen mongoose populate,etc
            // const reg =  await models.Entrada.find({},{createdAt:0}); -->0 nao mostar createdAt,1 mostar apenas createdAt
           //.sort({createdAt:1}) a-async, -1 desc, //valor 'i' -> coincidir entre maisculas e minusculas
           let valor=req.query.valor;
           const reg=await models.Entrada.find({$or:[{'num_comprovante':new RegExp(valor,'i')},{'serie_comprovante':new RegExp(valor,'i')}]})
          //mostrar os nomes usuario e pessoa
           .populate('usuario',{nome:1})
           .populate('pessoa',{nome:1})
           .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro , list'
            });
            next(error);
        }
    },
    /*
    update: async (req,res,next) =>{
       
        try {
            const reg =  await models.Entrada.findByIdAndUpdate({_id:req.body._id},{nome:req.body.nome,descricao:req.body.descricao });
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
            const reg =  await models.Entrada.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro, remove'
            });
            next(error);
        }
    },
    */
    activate: async (req,res,next) =>{
        try {
            const reg =  await models.Entrada.findByIdAndUpdate({_id:req.body._id},{estado:1});
            //atualizar artigo
            let detalhes = reg.detalhes;
            detalhes.map(function(x){
                    aumentarStock(x._id,x.qtde);
            });
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
            const reg =  await models.Entrada.findByIdAndUpdate({_id:req.body._id},{estado:0});
             //atualizar artigo
            let detalhes=reg.detalhes;
            detalhes.map(function(x){
                diminuirStock(x._id,x.qtde);
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro'
            });
            next(error);
        }
    },
    grafico12Meses:async(req,res,next) =>{
        try {
            const reg=await models.Entrada.aggregate(
                [
                    {
                        $group:{
                            _id:{
                                mes:{$month:"$createdAt"},
                                year:{$year: "$createdAt"}
                            },
                            total:{$sum:"$total"},
                            numero:{$sum:1}
                        }
                    },
                    {
                        $sort:{
                            "_id.year":-1,"_id.mes":-1
                        }
                    }
                ]
            ).limit(12);
            
            res.status(200).json(reg);
        } catch(e){
                res.status(500).send({
                    message:'Ocurrió un error'
                });
                next(e);
         }
    },
    consultaPorDatas: async (req,res,next) =>{
        try {
          
           let start=req.query.start;
           let end=req.query.end;
           const reg=await models.Entrada.find({"createdAt":{"$gte":start,"$lt":end}})
          //mostrar os nomes usuario e pessoa
           .populate('usuario',{nome:1})
           .populate('pessoa',{nome:1})
           .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro , list'
            });
            next(error);
        }
    }
}

