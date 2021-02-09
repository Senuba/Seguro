//modulos de terceros
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const session = require('express-session'); //req.session
const bcrypt = require('bcrypt');

console.log(`${ __dirname }`);
console.log(`--${process.env.NODE_ENV}--`);


if (process.env.NODE_ENV === 'development') {
    console.log('si');

    require('dotenv').config({
        path: `${__dirname}/../.env.development`
    })
} else {
    console.log('no');
    require('dotenv').config()
}

//no pude sacarla del .env
//const URL_MONGO = process.env.URL_MONGO;

const URL_MONGO = 'mongodb+srv://kauel-seguro:gp2tnxlKlsvmuiGN@kauel.ffgo1.mongodb.net/seguro?retryWrites=true&w=majority'




//modulos locales
const todosRouters = require('./router/index');

//////// expres/////////////
const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(bodyParser.json());
app.use(fileUpload({

    limits: { fileSize: 1 * 1024 * 1024 },
    abortOnLimit: true
}));

app.use(session({
    secret: 'secret2',
    resave: false,
    saveUninitialized: true, //Crea la cookie id al inicio default
    cookie: { secure: false },
    httpOnly: false
}))

todosRouters(app);

//////// handler /////////////
app.use((error, req, res, next) => {
    console.log(error);

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        result: false,
        message: message,
        data: data
    })

});



mongoose.connect(URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Mongo OK...');

    app.listen(process.env.PORT || 4000, () => {
        console.log('Server Ok...');
    })

}).catch((err) => console.log(err));