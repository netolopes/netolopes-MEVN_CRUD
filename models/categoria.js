import mongoose,{Schema} from 'mongoose';
//schema , ver na Documenacao Mongoose

const categoriaSchema = new Schema({

    nome:{type:String,maxlength:50,unique:true,required:true},
    descricao:{type:String,maxlength:255},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

const Categoria = mongoose.model('categoria',categoriaSchema);

export default Categoria;