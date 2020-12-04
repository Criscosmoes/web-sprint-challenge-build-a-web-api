const express = require('express');
const helmet = require('helmet'); 



//create server
const server = express();


//import routes
const actionRoutes = require('./actions/actions-router'); 
const projectRouter = require('./projects/projects-router')

//middlewares
server.use(express.json()); 
server.use(helmet()); 


//routes 
server.use('/api', actionRoutes); 
server.use('/api', projectRouter); 





module.exports = server;
