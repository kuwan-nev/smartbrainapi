const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		port : '5432',
		user : 'postgres',
		password : '123',
		database : 'smartbrain'
  	}
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {res.send("Its all good")})
app.post('/signin', signIn.handleSignIn(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleAPI(req, res)})

app.listen(3001, ()=> {
	console.log('app is running on port 3001')
})