const express = require('express');

const app = express()

const routes = require('./routes/index');

app.use(routes);

app.use(express.json())

const startServer = () => {
    app.listen(5000, () => {
        console.log(`[Server]: Сервер запущен на порте 5000!`)
    })
}

startServer()