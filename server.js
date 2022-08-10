const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// An api that listens for read requests on the root route
app.get('/', async (request, response)=>{
    response.sendFile(__dirname + '/index.html');
})

// makes server listen for request on provided port if available or the local host port
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})