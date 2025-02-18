const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http');
const database = require("./database");

app.use(cors({
    origin: '*'
}));
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const usersRoute = require('./routes/users');
const sorteiosRoute = require('./routes/sorteio');
const paymentRoute = require('./routes/payment');
const ebookviewerRoute = require('./routes/ebookviewer');
const conexaoRoute = require('./routes/conexao');

app.use('/users', usersRoute);
app.use('/sorteios', sorteiosRoute);
app.use('/payment', paymentRoute);
app.use('/ebookviewer', ebookviewerRoute);
app.use('/conexao', conexaoRoute);

/*(async () => {
    try {
        // Sincronizando o banco de dados. Aqui estamos dizendo ao Sequelize para sincronizar as tabelas.
        await database.sync({ alter: true });  // Usando `alter: true` para tentar corrigir a estrutura, incluindo novas colunas, tabelas e relações.

        // Se as tabelas não existirem, elas serão criadas, e se já existirem, o Sequelize tentará ajustá-las
        console.log("Banco de dados sincronizado com o novo campo!");

        // Caso necessário, você pode adicionar dados de teste ou inicializar qualquer outra coisa aqui

    } catch (error) {
        console.error("Erro ao sincronizar o banco de dados:", error);
    }
})()*/

if(process.env.DEVELOPMENT_MODE == "true"){
    var httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT);
}else{
    var httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT);
}
