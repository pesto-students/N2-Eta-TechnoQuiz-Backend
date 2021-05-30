const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
require('./database/config');

//Import Routes
const cron = require('./routes/cron');
const authRoute = require('./routes/auth/auth');
const leaderBoardRoute = require('./routes/leaderboard/leaderboard');
const category = require('./routes/categories/categories');
const quiz = require('./routes/quiz/quiz');
const score = require('./routes/score/score');
const payment = require('./routes/payment/payment');

//MiddleWare
app.use(express.json());

//Route Middelware
app.use('/api/user',authRoute);
app.use('/api/leaderBoard',leaderBoardRoute);
app.use('/api/category',category);
app.use('/api/quiz',quiz);
app.use('/api/score',score);
app.use('/api/pay',payment);

app.listen(3000,()=> console.log("Server up and running")); 
