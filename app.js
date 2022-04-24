//importing expresss
const express = require('express');
const app=express();
//importing path
const path = require('path');
//importing body parser
const bodyparser = require('body-parser');
const port = 80;

// importing mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {
                    useNewUrlParser: true
                    
});

//define mangoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    query: String,

});


const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))
//app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})


app.get('/about', (req, res) => {

    
    res.status(200).render('about.pug');
})

app.get('/service', (req, res) => {


    res.status(200).render('service.pug');
})

app.get('/class', (req, res) => {

    
    res.status(200).render('class.pug');
})



app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    
    myData.save().then(()=>{
        res.send('Submitted successfully')
        }).catch(()=>{
            res.status(400).send('item was not saved to the databse')
    });


    //res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
