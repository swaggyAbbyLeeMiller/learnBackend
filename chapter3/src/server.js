import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000 //checks if port environment variable is set, otherwise defaults to 5000


//get filepath from url of curr module
const __filename = fileURLToPath(import.meta.url)
//get directory name from filepath
const __dirname = dirname(__filename)


// MIDDLEWARE
//tell it exactly where public directory is
//tell express to serve all files from public folder as static files

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

//endpoint for serving html file from pulic directory
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))  //join current directory with pulic folder
})




//Routes
app.use('/auth', authRoutes)
app.use('/todo', todoRoutes)






//always have this at bottom of code
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
