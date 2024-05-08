const express = require('express');
const app = express();
const { ServerConfig, DB} = require('./config/');


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.listen(ServerConfig.PORT,async()=>{
    console.log(`Successfully started the server on PORT:${ServerConfig.PORT}`);
    console.log('Server is running on http://localhost:'+ServerConfig.PORT);
    await DB.DBconnect();
});