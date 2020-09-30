const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
//use cors module for MAking http request more easily while working on project
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const app = express();

// app.use(express.status('static',option));

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
app.get('/', (req, res)=>{   
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{   
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.get('/about', (req, res)=>{   
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/service', (req, res)=>{   
    const params = {}
    res.status(200).render('service.pug', params);
})

app.get('/ClassInfo', (req, res)=>{   
    const params = {}
    res.status(200).render('ClassInfo.pug', params);
})

app.post('/contact', (req, res)=>{   
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.status(200).send("This item has been saved in database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(8000, ()=>{
    console.log(`The application started successfully on port 8000`);
});
