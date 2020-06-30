//*Com instalacao e configuracao do BABEL ecma6, pode implementar  "import" e tirar as constantes "const"
//const express = require('express');
import express from 'express';
import morgan  from 'morgan';
import cors  from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

//conexao cm base de dados
const uri = '#';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

mongoose.connect(uri, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    () => { console.log('Conectado a MongoDB..') },
    /** handle initial connection error */
    err => { console.log(err) }
  );

const app = express();

//combined->  interceptar toda a requisição que chegar ,capturar dados
//app.use(morgan('combined'));
//o método, saída e tempo de resposta
//app.use(morgan('tiny'));
app.use(morgan('dev'));
//CORS, Habilitar requisicoes js  entre dois ou mais servidores
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

//documentacao express
//app.get("/test", (req, res) => {
 //   res.send("olá DevPleno")
//});


app.use('/api',router);
//porta padrao 3000, caso nao seja setado porta
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.log('server na porta ' + app.get('port'));
    //verificar qual diretorio:  console.log(__dirname + '\\public');
    console.log(path.join(__dirname,'public'));
    
});