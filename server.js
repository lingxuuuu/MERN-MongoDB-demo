// ***require statements and imports at the top***
const mongoose = require("mongoose");
const express = require("express"); //create an Express application
const cors = require('cors');

//***create my express app***
const app = express();

//***config middleware and settings***
app.use(cors());
app.use(express.json());

//***Connecting to MongoDB with Mongoose and name the db:drink-db***
mongoose.connect( 'mongodb://localhost/drink-db' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Establised a connection to the db'))
  .catch((err) => console.log('Something wrong when connecting to the db', err) );

//***create the database***
const DrinkSchema = new mongoose.Schema( 
    { name: {
        type: String,
        required: true,
        minlength: [2, 'Your drink name must be two or more characters'] //this is how you will do the validation
    },
      type: String,
      taste: String,
      amount: Number },
    { timestamps: true }
)

//***name the table to 'Drink' in the db, and put in the keyword called Drink***
const Drink = mongoose.model("Drink", DrinkSchema);


// The code below is when we want to get data from the FAKER API

// const faker = require("faker");

// class Fake{
//     constructor(){
//         this.name = `${faker.name.jobTitle()} ${faker.name.findName()} ${faker.name.lastName()}`
//         this.phrase = faker.hacker.phrase()
//     }
// }


//***routes in the middle***

// The code below shows how to get data from API
// app.get("/api", (req, res) => {
//     res.json({ data: new Fake() });
// });

//get-request: all drinks from the localhost:8000/drinks
app.get("/drinks", (req, res) => {
    Drink.find()
         .then(data => {
             console.log(data);
             res.json(data);
         })
         .catch(err => {
             console.log(err);
             res.json(err);
         })
})

//post-request: post a drink to the db
app.post('/drinks', (req, res) => {
    Drink.create(req.body)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
})

// this needs to below the other code blocks
app.listen( 8000, () => console.log(`Listening on port 8000`) );
