const express = require('express');
const path = require('path');
const app = express();
//const bodyparser = require('body-parser');   --->>  it can be usefull for us to store data in database(mongodb) using express(post request)
const mongoose = require('mongoose');
const { stringify } = require('querystring');

// it will create a database of name contactDance
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const port = 8000;

//define mongoose schema...
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    age : String,
    contact_no: String,
    about : String
  });

// convert into a model...here collection will create of name  -> contact_dance .... now, we can store data.
const Contact = mongoose.model('contact_dance', contactSchema);

// static files...
app.use('/static', express('static'));
app.use(express.urlencoded());   // to get the data

//pug specific stuff

app.set('view enginne', 'pug'); // set the templete engine as pug
app.set('views', path.join(__dirname,'views')); // Set the views directory.

//End Points
app.get('/', (req,res)=>{
    res.status(200).render('home.pug');
})

app.get('/contact', (req,res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save()                                                     // to save data in database
    .then(()=>{                                                       // to give response after saving data.
        res.send("data saved in database succefully")
    })
    .catch(()=>{                                                      // if error occure then give response.
        res.status("400").send("data was not saved to database.")
    });

})

//listen website
app.listen(port,()=>{
    console.log(`server is succesfully started on port ${port}`);
})