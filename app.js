// app.js
const express = require('express');
const bodyParser = require('body-parser');
const encomenda = require('./routes/EncomendaRoute'); // Imports routes for the encomendas
const item = require('./routes/ItemRoute'); // Imports routes for the itens
const app = express();
const morgan = require('morgan');
const cors= require('cors');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user')

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://MongoJM:JM_2018@ds151523.mlab.com:51523/dbmongo';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('secret',config.secret); //secret variable
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/encomenda', encomenda);
app.use('/item', item);

var router = express.Router();   
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

//API ROUTES
app.get('/setup',function(req,res){
    var jon = new User({
        name: "Jon Snow",
        password: 'password',
        admin: true  
    })

    jon.save(function(err){
        if(err) throw err;

        console.log('User saved successfully');
        res.json({success:true});
    });
});

var apiRoutes = express.Router();

apiRoutes.get('/',function(req,res){
    res.json({message:'Welcome to our API'});
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  }); 
  // apply the routes to our application with the prefix /api
  app.use('/api', apiRoutes);

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
      name: req.body.name
    }, function(err, user) {
  
        if (err) throw err;

        if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
  

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
  
            // if user is found and password is right
            // create a token with only our given payload
            // we don't want to pass in the entire user since that has the password
            const payload = {admin: user.admin};
            var token = jwt.sign(payload, app.get('secret'), {
            //expiresInMinutes: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
            });
        } 
      }
  
    });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {       if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;         next();
        }
        });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });
  let port = process.env.PORT || 8080;

  //Configuration
  //var port = process.env.PORT || 8080;//used to create, sign, and verify tokens
  app.set('secret',config.secret); //secret variable
  
  //use morgan to log requests to the console
  app.use(morgan('dev'));
  
  app.get('/',function(req,res){
      res.send('The API is at http://localhost:' + port + '/api');
  });

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});