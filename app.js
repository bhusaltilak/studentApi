const express = require('express');
const dotenv=require('dotenv');
dotenv.config();
const port =process.env.PORT || 4000;
const app = express();
const swaggerUi= require("swagger-ui-express");
const swaggerJsdocs = require("swagger-jsdoc")
const swaggerData = require('./docs/swagger');
const bodyParser = require('body-parser');

const studentRoutes = require('./Routes/studentRoutes');
const userRoutes = require("./Routes/userRoutes");

app.use(express.json());


app.use('/post',studentRoutes);
app.use("/user",userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdocs(swaggerData)));



app.listen(port,(req,res)=>{
    console.log(`listening on the port ${port}`);
})