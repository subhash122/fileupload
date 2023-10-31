require('dotenv').config()
const express = require('express');
const FilesController = require('./controllers/filesController');
const { parseFile } = require('./utils');
const cors = require('cors')
const app = express();
const port = process.env.PORT;


app.use(cors())
app.use(express.json())

app.get('/file/:id', FilesController.getFile)
app.post('/file', parseFile, FilesController.uploadFile)



app.listen(port, () => {
    console.log(`listening on port: ${port}`)
});
