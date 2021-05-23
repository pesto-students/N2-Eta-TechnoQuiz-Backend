const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.get('/',(req,res) => {
    res.send("It's not a good time to be here");
})

app.listen(port, () => {
    console.log("Div Test"); 
})