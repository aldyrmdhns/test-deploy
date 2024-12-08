if (NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require('express')
const app = express()
const PORT = process.env.PORT

app.get('/test', (req, res) => {
    res.send('Its a Success')
})

app.listen(PORT, () => {
    console.log(`-> Listening on port: ${PORT}`);
})

