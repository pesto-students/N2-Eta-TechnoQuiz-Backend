const express = require('express');
const app = express();
const mongo = require('mongoose');
const dotenv = require('dotenv');
//Import Routes
const authRoute = require('./routes/auth/auth');
const leaderBoardRoute = require('./routes/leaderboard/leaderboard');
dotenv.config();
//Connect to DB
mongo.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true },()=>console.log("Connected to DB"))

//MiddleWare
app.use(express.json());

//Route Middelware 
app.use('/api/user',authRoute);
app.use('/api/leaderBoard',leaderBoardRoute);

app.listen(3000,()=> console.log("Server up and running")); 
