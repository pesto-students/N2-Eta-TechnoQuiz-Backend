const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send("It's not a good time to be here");
})
app.listen(3000, () => {
    console.log("Div Test"); 
})