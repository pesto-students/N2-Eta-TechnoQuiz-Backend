// const express = require('express');
// const app = express();
var http = require('http');
const port = process.env.port || 3000;
console.log("Grabbed Port",port)

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//   })


var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.write("Server Teting");
    res.end();    
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');