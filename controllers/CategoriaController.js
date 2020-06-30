import models from '../models'
//import { query } from 'express';


export default{
    add: async (req,res,next) =>{
        try {
            //veja doc mongoose
            const reg = await models.Categoria.create(req.body);
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
           const reg =  await models.Categoria.findOne({_id:req.query._id});
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
            // const reg =  await models.Categoria.find({},{createdAt:0}); -->0 nao mostar createdAt,1 mostar apenas createdAt
           //.sort({createdAt:1}) a-async, -1 desc, //valor 'i' -> coincidir entre maisculas e minusculas
           let valor=req.query.valor;
           const reg=await models.Categoria.find({$or:[{'nome':new RegExp(valor,'i')},{'descricao':new RegExp(valor,'i')}]},{createdAt:0})
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
            const reg =  await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nome:req.body.nome,descricao:req.body.descricao });
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
            const reg =  await models.Categoria.findByIdAndDelete({_id:req.body._id});
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
            const reg =  await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
            const reg =  await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                msg:'Ocoreu um erro'
            });
            next(error);
        }
    }
}

