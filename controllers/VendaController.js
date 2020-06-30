import models from '../models';
async function aumentarStock(idartigo,qtde){
    let {stock}=await models.Artigo.findOne({_id:idartigo});
    let nStock=parseInt(stock)+parseInt(qtde);
    const reg=await models.Artigo.findByIdAndUpdate({_id:idartigo},{stock:nStock});
}

async function diminuirStock(idartigo,qtde){
    let {stock}=await models.Artigo.findOne({_id:idartigo});
    let nStock=parseInt(stock)-parseInt(qtde);
    const reg=await models.Artigo.findByIdAndUpdate({_id:idartigo},{stock:nStock});
}

export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Venda.create(req.body);
            //Actualizar stock
            let detalhes=req.body.detalhes;
            detalhes.map(function(x){
                diminuirStock(x._id,x.qtde);
            });
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            const reg=await models.Venda.findOne({_id:req.query._id})
            .populate('usuario',{nome:1})
            .populate('pessoa',{nome:1});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Venda.find({$or:[{'num_comprovante':new RegExp(valor,'i')},{'serie_comprovante':new RegExp(valor,'i')}]})
            .populate('usuario',{nome:1})
            .populate('pessoa',{nome:1,direcao:1,num_documento:1,telefone:1,email:1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    /*
    update: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nome:req.body.nome,descripcion:req.body.descripcion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    */
    activate: async (req,res,next) => {
        try {
            const reg = await models.Venda.findByIdAndUpdate({_id:req.body._id},{estado:1});
            //Actualizar stock
            let detalhes=reg.detalhes;
            detalhes.map(function(x){
                diminuirStock(x._id,x.qtde);
            });
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    desactivate:async (req,res,next) => {
        try {
            const reg = await models.Venda.findByIdAndUpdate({_id:req.body._id},{estado:0});
            //Actualizar stock
            let detalhes=reg.detalhes;
            detalhes.map(function(x){
                aumentarStock(x._id,x.qtde);
            });
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    grafico12Meses:async(req,res,next) =>{
        try {
            const reg=await models.Venda.aggregate(
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
           const reg=await models.Venda.find({"createdAt":{"$gte":start,"$lt":end}})
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
