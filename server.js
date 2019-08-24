require('dotenv').config();
const express = require('express')
const next = require('next')
const path = require('path')
const multer = require('multer');
const formData = multer();

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use(formData.array())
    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    server.use(handler)

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> [${dev ? 'Development' : 'Production'}] Ready on http://localhost:${port}`)
    })
}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})
