require("dotenv").config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const TodosRouter = require("./controllers/todos");

const app = express();

//middleware
app.use(cors());
app.use(express.json());//get data from client side
app.use(morgan('dev'))

app.use('/todos', TodosRouter)

app.get('/',(req,res)=>{
    res.send('hello world')
})

// get .env variables
const {DATABASE_URL, SECRET, PORT} = process.env


// turn on the server (the listener)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})