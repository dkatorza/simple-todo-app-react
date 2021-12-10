// const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

// Express App Config
const session = expressSession({
    secret: 'shisha2015',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(express.json())
app.use(session)
app.use(express.static('public'))


if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const todoRoutes = require('./api/todo/todo.routes')

//routes
app.use('/api/todo', todoRoutes)

app.get('/**', (req, res) => {
    console.log('req',req.body);
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
