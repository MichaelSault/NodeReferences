# Node.js: Security

Created: July 13, 2022 6:34 PM
Tags: Completed, Node.js, Security, Study

# Introduction:

- Close to 80% of web apps are unsecured and vulnerable to attacks
- What tools to use to test your level of security
- Basic understanding of Node.js and npm
- Basic understanding of ES6

---

# 1. Security Overview

### Security threats overview

- **OWASP**
    - Open Web Application Security Project
    - Community/social networks for OWASP
    - They have solution in the form of code snippets for common attacks
    - Read through the vulnerability section to know where you might be vulnerable to attacks
- **OWASP NodeGoat Project**
    - the same information, but specifically about Node.js
- **OWASP top 10 threats in Node.js**
    - Injection
    - Broken Authentication
    - XML External Entities (XXE)
    - Insecure DOR
    - Security Misconfiguration
    - Sensitive Data
    - Access Controls
    - CSRF
    - Insecure Components
    - Redirects
- For node specifically
    - [nodegoat.herokuapp.com](http://nodegoat.herokuapp.com) → tutorial guide
- **Cross-site scripting**
    
    [XSS game](https://xss-game.appspot.com/)
    
- DOS Attack
    - usually accomplished by overwhelming the server with requests
    - use of complicated regular expressions to make the server unavailable
        - looping instructions
    - Minimize
        - input forms are sanitized and validated
        - mechanisms to prevent looping/data creation
        - avoid writing your own regular expressions
            - use validator.js or safe-regex package for regex
- Server-Side Injection
    - inject untrusted data into the server w/ command or query
    - use eval(), setTimeout(), etc to render server useless
    - read a response call to a node server → steal data
    - Minimize
        - Always validate and sanitize input
        - don’t use eval(), setTimeout(), setInterval() to parse input
        - use safer JSON.parse or parseXxx (ie. parseInt() )
        - use strict code

---

# 2. Best Practices: Packages

### Base project template overview

- just your basic node.js, express and mongoDB project
    - crmModels
    - crmRoutes
    - public static files
    - package.json

### Maintain package dependencies

- one of the biggest things to secure your application
- packages are updated when a vulnerability is discovered
- npm audit lists the number of vulnerabilities
- npm outdated tells you if your packages are outdated
    - npm install packagename@newestversion
    
    ```jsx
    PS C:\Users\micha\Desktop\NodeJS Security> npm outdated                   
    Package   Current   Wanted  Latest  Location               Depended by    
    mongoose  4.13.21  4.13.21   6.4.4  node_modules/mongoose  NodeJS Security
    nodemon    1.19.4   1.19.4  2.0.19  node_modules/nodemon   NodeJS SecurityPS 
    
    C:\Users\micha\Desktop\NodeJS Security> npm install mongoose@6.4.4 nodemon@2.0.19
    
    added 30 packages, removed 114 packages, changed 13 packages, and audited 
    424 packages in 3s
    
    16 packages are looking for funding
      run `npm fund` for details
    
    8 vulnerabilities (2 low, 6 high)
    
    Some issues need review, and may require choosing
    a different dependency.
    
    Run `npm audit` for details.
    ```
    

---

# 3. Best Practices: Data

### Data handling with type and validation

- define a type for each of the elements in your schema
- use validator.js to tell the schema what you expect to see from the data
    - import validator from ‘validator’
        - external library found from github
    - or find another method for validating the input data

### Prepared statements for SQL/NoSQL

- he basically just says to use mongoose

### Set proper HTTP headers with Helmet

- download Helmet to gain access to a number of presets to protect from common attacks
    - comes with documentation
    - `npm install helmet`
    - `import helmet from 'helmet';`
    - at the top of the file use `app.use(helmet());` for minimal protection

### Encrypt user data and session management

- tool called crypto
- encrypt sensitive data from end to end
- nodejs.org/api/crypto.html#crypto_crypto
- manage your sessions and don’t leave sensitive data in the localStorage
- developer.mozilla.org/en-US/docs/web/API/Window/localStorage
    - use sessionStorage instead of localStorage
        - this way the sensitive data is removed when the user leaves your site

---

# 4. Best Practices: Server Level

### Use secure HTTPS protocol

- HTTPS = Secured web browsing
- communication between user and webpage are encrypted
- make sure your domain has an SSL certificate
    - [letsencrypt.org](http://letsencrypt.org) (certifcate provider)

### Rate limit against DoS attacks

- Express Rate Limit Module
    - `npm install express-rate-limit`
    - setup a rate limit s.t. every 15 minutes you can only do 100 requests per IP
    
    ```jsx
    import RateLimit from 'express-rate-limit';
    
    // rate limit setup
    const limiter = new RateLimit({
        windowMs: 15*60*1000, //15 minutes
        max: 100, //limit of number of requests per IP
        delayMs: 0 //no delay until limit hit
    });
    ```
    

### Use csurf to prevent CSRF attacks

- Cross Site Request Forgery forces a log on victims browser to send an HTTP request
- github express/csurf
- include cookieParser and csurf
    
    ```jsx
    import cookieParser from 'cookie-parser';
    import csrf from 'csurf';
    
    // csurf setup
    const csrfProtection = csrf({ cookie: true })
    ```
    

### Cookie Attributes

- determine the proper use of cookie sessions
- secure
    - only through HTTPS
- HttpOnly
    - prevents JS
- Domain
    - specific URL or path
- Expiry
    - when the cookie expires
- Packages:
    - [https://github.com/pillarjs/cookies](https://github.com/pillarjs/cookies)
        - base cookies package that comes with JS
    - [https://github.com/expressjs/cookie-session](https://github.com/expressjs/cookie-session)
        - import cookie session
        - app.use and specify cookie options
        - easier to set up more complex cookie sessions (easier syntax)

---

# 5. Tools for Testing

### OWASP Dependency Check

- tool that analyses your projects dependencies for known issues
- download command line file
- ***paste .exe file in terminal*** —project “Test dependencies” —scan ***project you want to scan***
- jeremylong.github.io/DependencyCheck/general/thereport.html
    - will walk you through how to read the report

### Find Vulnerabilities with Snyk

- [https://snyk.io](https://snyk.io)
- sign up as a developer
- you can link it to your github to have it check your projects
- it will give you the potential issues and how you should fix them

### Penetration testing with Burp Suite

- is a similar tool to Snyk
- the premium version is much more in-depth
- it is more geared towards small businesses

---

# Next Steps

- always be vigilant
- check back with OWASP often
- always double check that your code is secure
- look into security concerning other parts of your website
    - not JUST node.js