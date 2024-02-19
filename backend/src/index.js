const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('complete');
})
.catch(err => {
    console.error(err);
})


app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.send(error.message || 'it is an error');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../uploads')));
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.listen(4000, () => {
   console.log(`${port}`) ;
});