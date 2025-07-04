//address of server is https://localhost:3000
//ip of server is 127.0.0.1:3000
// to run the server use command: npm run dev

const express = require('express')
const app = express()
const PORT = 3000 

//route is further subdirectory --> direct request to body of code and locations are called endpoints
//req = request, res = response

let data = ['randallboggs']

app.use(express.json()) // <-- middleware to parse json data from request body

//website and api endpoints
//website --> send back HTML and come when user enters url in browser
app.get('/', (req, res) => {

    res.send(`
       
        <body 
            style ="background:blue; color:orange;"> 
            <h1>DATA:</h1>
                <p>${JSON.stringify(data)}</p>
                <a href="/dashboard">Dashboard</a>
        </body>
        `)
        })

app.get('/dashboard', (req, res) => {
    res.send(`
        <body>
        <h1>dashboard</h1>
        <a href="/">Home</a>
        </body>
`)
})


//api endpoint --> when user enters stuff and sends it to the server, the server processes it and sends back a response
//CRUD = Method operations 
//C = create-post, R = read-get, U = update-put, D = delete-delete

app.get('/api/data', (req, res) =>{
    console.log('Sending data')
    res.send(data)
})


//posting data to the server
app.post('/api/data', (req, res) => {
    //someone wants to create user for sign up
    //user presses sign up after entering data and browser sends a request to the server to handle action
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log('Deleted last entry (last from array)')
    res.sendStatus(203)
})

app.listen(PORT, () => console.log('Server is running on port: ' + PORT))