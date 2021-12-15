const express =require('express')
require('dotenv').config({path:'./.env'})
require('./bd')
const app = express()

app.use(express.json())

app.get("/all",(req,res,next)=>{
    const person=Person.find();
    res.status(200).json({person})
})

app.get("/user/:id",(req,res,next)=>{
    const person= Person.findById(req.params.id)
    res.status(200)
})

//Creation of the person with the given prototype.
let galo=new Person({
    name:"Abdoulaye",
    age:39,
    favoriteFoods:["raisin"]
})
galo.save((error,data)=>{
    if(error){
        console.log(error);
    }
    else{
        done(null,data)
    }
})

//Create many records with model.create().
const Model = mongoose.Model;
var arrayOfPeople=[
    {name:"Moussa",age:28,favoriteFoods:["Sandwich"]},
    {name:"Oumar",age:22,favoriteFoods:["Yassa"]},
    {name:"Astou",age:23,favoriteFoods:["Hamburger"]}
];

var createManyPeople = function(arrayOfPeople,done) {
    Model.create(arrayOfPeople, (error, data) => {
      if(error) {
         done(error); 
      } 
      else{
          done(null, data);
      }
    }) 
};

//Use model.find() to search your database
Person.find({name:"Abdoulaye"},(error,done)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})

//Use model.findById() to Search Your Database By _id.
//5d273f9ed58f5e7093b549b0 is just a example of id.
Person.findById('5d273f9ed58f5e7093b549b0',(error,data)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})

//Perform Classic Updates by Running Find, Edit, then Save.
  var findEditThenSave = function(personId, done) {
    var foodToAdd = "hamburger";
    Person.findById(personId, function(error, data) {
      if (error) {
        done(error);
      }
  
      data.favoriteFoods.push(foodToAdd);
      data.save((error, data) => (error ? done(error) : done(null, data)));
    });
  };

//Perform New Updates on a Document Using model.findOneAndUpdate().
  var findAndUpdate = function(personName, done) {
    var ageToSet = 26;
  
    Person.findOneAndUpdate(
        {name: personName}, 
        {age: ageToSet}, 
        {new: true}, 
        (err, data) => {
        if (err) {
           done(err); 
        }
        done(null, data);
      }
    )
  };

//Delete One Document Using model.findByIdAndRemove.
  var removeById = function(personId, done) {
    Model.findByIdAndRemove(personId, (error, data) => 
    error ? 
    done(error) 
    : done(null, data));
    };


//MongoDB and Mongoose - Delete Many Documents with model.remove().
    var removeManyPeople = function(done) {
        var nameToRemove = Abdoulaye;
        Person.remove({name:nameToRemove},(error,data)=>{
        if(error)
            return console.log(error);
        done(null,data);
    });
};

//Chain Search Query Helpers to Narrow Search Results
var queryChain = function(done) {
    var foodToSearch = burrito;
    Person.find({ favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function(error, people) {
        console.log(people);
    });
    };