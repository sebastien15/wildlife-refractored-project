import express, { Router } from 'express';
import dotenv from 'dotenv';
import router from './routes/index';
import ejs from 'ejs';
import  path from 'path';
import axios from 'axios';
import cookieParser from'cookie-parser';
import searchForToken from './middlewares/adminDataFromCookies';
import AdminAuthentication from './middlewares/tokenCheck'

const app  = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname + '/public')));


const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started at:.... ${port}`));
app.use(router);
// app.use(cookieParser)
let animals ;
let animal;
let admin;
const fetchSingle = (id)=>{
    axios.get(`http://localhost:5000/api/animals/${id}`)
    .then(function (response) {
      animal = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    })
}
const fetchAnimals = ()=>{
  axios.get('http://localhost:5000/api/animals')
    .then(function (response) {
      animals = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    })
}
fetchAnimals()
const getAdminDataFromAuth = async (auth)=>{
  const adminData = await searchForToken(auth)
  admin = adminData.decoded
}
app.get("/",(req,res)=>{
    let indexOfauth = req.headers.cookie.search('auth') + 5
    if (req.headers.cookie[indexOfauth] == undefined) {
      admin = {}
    } else {
        getAdminDataFromAuth(req.headers.cookie)
    }
    
    res.render('index',{admin:admin});
});
app.get("/animals",(req,res)=>{
    fetchAnimals()
    let indexOfauth = req.headers.cookie.search('auth') + 5
    if (req.headers.cookie[indexOfauth] == undefined) {
      admin = {}
    } else {
        getAdminDataFromAuth(req.headers.cookie)
    }    
    res.render('animals',{animals: animals,admin:admin});
});
app.get("/addAnimal",AdminAuthentication,(req,res)=>{
  let indexOfauth = req.headers.cookie.search('auth') + 5
    if (req.headers.cookie[indexOfauth] == undefined) {
      admin = {}
    } else {
        getAdminDataFromAuth(req.headers.cookie)
    }
    res.render('addAnimal',{admin:admin});
});
app.get("/editAnimal/:id",AdminAuthentication,(req,res)=>{
  let indexOfauth = req.headers.cookie.search('auth') + 5
    if (req.headers.cookie[indexOfauth] == undefined) {
      admin = {}
    } else {
        getAdminDataFromAuth(req.headers.cookie)
    }
  fetchSingle(req.params.id)
    res.render('editAnimal',{animal: animal,admin:admin});
});
app.get("/singleAnimal/:id",(req,res)=>{
  let indexOfauth = req.headers.cookie.search('auth') + 5
    if (req.headers.cookie[indexOfauth] == undefined) {
      admin = {}
    } else {
        getAdminDataFromAuth(req.headers.cookie)
    }
  fetchSingle(req.params.id)
    res.render('singleAnimal',{animal: animal,admin:admin});
});

