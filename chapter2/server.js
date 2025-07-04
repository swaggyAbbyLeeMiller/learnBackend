//address of server is https://localhost:3000
//ip of server is 127.0.0.1:3000
// to run the server use command: npm run dev

const express = require('express')
const app = express()
const PORT = 3000 

//route is further subdirectory --> direct request to body of code and locations are called endpoints
//req = request, res = response

let data = {
    name: 'randall'
}

//website and api endpoints
//website --> send back HTML and come when user enters url in browser
app.get('/', (req, res) => {

    res.send('<h1>Homepage!<h1>')
})

app.get('/dashboard', (req, res) => {
    res.send('<h1>Dashboard!<h1>')
})


//api endpoint --> when user enters stuff and sends it to the server, the server processes it and sends back a response

app.get('/api/data', (req, res) =>{
    console.log('Sending data')
    res.send(data)
})



app.listen(PORT, () => console.log('Server is running on port: ' + PORT))