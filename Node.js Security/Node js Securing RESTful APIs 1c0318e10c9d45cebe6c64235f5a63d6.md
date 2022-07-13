# Node.js Securing RESTful APIs

Created: July 13, 2022 3:02 PM
Tags: In Progress, Node.js, RESTful APIs, Study

# Introduction:

- Top Security Attacks/Threats
- OWASP
- Basic understanding of node.js and npm
- Experience with JavaScript

---

# 1. Setting Up

### Security threats overview

- OWASP
    - Number one resource for the recent threats
- Top 5 Security Threats
    - Injection attacks
    - Broken Authentication
    - Sensitive data exposure
    - XML entities
        - XML injection
    - Broken access control

### Intro to OWASP

- www,owasp.org
- has code snippets to demonstrate how to protect against threats
- has a vulnerability section to help learn about the newest threats

### Intro to JWT

- JSON Web Tokens
- best way to securely transmit information between two parties across the web
    - can be used to authenticate a user

# 2. Setting Up the Node API

### Base project template intro

- install the following dependencies
    - `npm init`
    - `npm install body-parser express mongoose nodemon`
    - `npm install --save-dev babel-cli babel-preset-env babel-preset-stage-0`
        - you must then update the stage-0 dependency as it has been depreciated
            - use npx upgrade
- update scripts in ***package.json***

```jsx
"scripts": {
    "start": "nodemon ./index.js --exec babel-node -e js"
  }
```

### Create a user model

```jsx
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});
```

### Add bcrypt password hashing

- install bcrypt
    - `npm i bcrypt jsonwebtoken`
- add a function to UserModel to compare the password with the hashed password
    
    ```jsx
    import mongoose from 'mongoose';
    import bcrypt from 'bcrypt';
    
    const Schema = mongoose.Schema;
    
    export const UserSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        hashPassword: {
            type: String,
            required: true
        },
        created_date: {
           type: Date,
           default: Date.now 
        }
    });
    
    UserSchema.methods.comparePassword = (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword);
    }
    ```
    

---

# 3. Securing the Node API

### Add the handlers for loginRequired

- build a userController file to handle a number of user authentication functions
    - check if a user is logged in (loginRequired)
    - register a user
    - login a user

```jsx
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {UserSchema} from '../models/userModel';

const User = mongoose.model('User', UserSchema);

// function to check if a user is logged in/authorized
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized user!"});
    }
}

// function to register a new user (w/ hashPassword security)
export const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    })
}

// Function to log in a user and return a signed JWT if the user is found
export const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({message: 'Authentication failed.  No user found'});
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({message: 'Authentication failed.  Incorrect password'});
            } else {
                return res.json({token: jwt.sign({ email: user.email, username: user.username, _id: user.id}, 'RESTFULAPIs')});
            }
        }
    })
}
```

### Finalize secured endpoints

- check if the user is logged in before proceeding
- build endpoints for HTTP requests and for login functions inside of crmRoutes.js

```jsx
import { 
    addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact,
    deleteContact 
} from '../controllers/crmController';

import {login, register, loginRequired} from '../controllers/userControllers';

const routes = (app) => {
    app.route('/contacts')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, loginRequired, getContacts)
    
    // POST endpoint
    .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
    // get specific contact
    .get(loginRequired, getContactWithID)
    
    // put request
    .put(loginRequired, updateContact)

    // delete request
    .delete(loginRequired, deleteContact);

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/login')
        .post(login);
}

export default routes;
```

- add JWT setup to the index.js fil

```jsx
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import jsonwebtoken from 'jsonwebtoken';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) =>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        })
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
```

### Postman

- run the server with `npm start`
- test with postman
    - **GET** request as an unauthorized user
        
        ![Untitled](Node%20js%20Securing%20RESTful%20APIs%201c0318e10c9d45cebe6c64235f5a63d6/Untitled.png)
        
    - **POST** to create a new user
        
        ![Untitled](Node%20js%20Securing%20RESTful%20APIs%201c0318e10c9d45cebe6c64235f5a63d6/Untitled%201.png)
        
    - **POST** request to login (get the auth token)
        
        ![Untitled](Node%20js%20Securing%20RESTful%20APIs%201c0318e10c9d45cebe6c64235f5a63d6/Untitled%202.png)
        
    - **GET** request for a list of contacts as an authorized user (w/ Token Authentication)
        
        ![Untitled](Node%20js%20Securing%20RESTful%20APIs%201c0318e10c9d45cebe6c64235f5a63d6/Untitled%203.png)
        

---

# 3. Other Options for securing APIs

### Alternatives for securing APIs

- Firebase (cloud based data)
    - allows you to only focus on the front end
    - examples:
        - Firebase, Azure, Cloud MongoDB, AWS
- Lookback, SailsJS, strapi
    - otherframeworks that can provide similar security to what we built today
- Auth0
    - Manages usermanagement for you to allow/block access to specific parts of your website

---

# Next Steps

- Build more models, relationships, user roles
- keep an eye on OWASP
- Look into other more in-depth courses
    - as security is a huge topic to cover