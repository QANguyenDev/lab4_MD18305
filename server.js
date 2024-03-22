const express = require('express')
const multer = require('multer')
var fs = require('fs')
const app = express()
const port = 3000
app.listen(port, () => {
    console.log('Server dang chay cong: ', port)
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html')
})

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        var dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        let fileName = file.originalname;
        let newFileName = fileName
        // arr = fileName.split('.');

        // let newFileName = '';

        // for (let i = 0; i < arr.length; i++) {
        //     if (i != arr.length - 1) {
        //         newFileName += arr[i];
        //     } else {
        //         newFileName += ('-' + Date.now() + '.' + arr[i]);
        //     }
        // }

        cb(null, newFileName)
    }
})

var upload = multer({ storage: storage })

app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})