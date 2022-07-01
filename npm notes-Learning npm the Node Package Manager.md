# Learning npm the Node Package Manager

Created: July 1, 2022 1:56 PM
Tags: Completed, Study

## 1. Introduction & Installation

- adding, updating or removing a package
- cache, audits, scripting, more+

### What are packages and npm?

- package.json is basically the map of your file
    - file(s) combined together to build a function
- search on [https://www.npmjs.com/](https://www.npmjs.com/) for a package to add functionality

### Installing Node/npm on Windows

- TLDR; Node.js will install npm as part of it’s installation process

---

## 2. Getting Started with npm

### Initializing a package.json file

- use `npm init` to generate a new package.json file
    - answer the on screen prompts to populate information about the package

### Adding node packages

- installed locally
    - inside package files
- globaly
    - on entire system
        - stored in %AppData%\npm\node_modules
        - same commands as local packages but with -g or -global after the command
- install with: npm install “package name”
- npm install babel-cli babel-preset-stage-0 babel-preset-es2015 `--save-dev`
    - causes the dependency to be excluded from the final build
    
    ```jsx
    "devDependencies": {
        "babel-cli": "^6.26.0",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1"
      }
    ```
    

### Updating a package

- `npm install eslint@5.2.0 -g` do install a specific version
- `npm outdated` looks for any outdated dependencies
- you can always just use `npm install` to update to the most recent version

### Removing a package

- `npm uninstall "package name”`

### Semantic versioning

- 1.4.2
    - 1.x.x is the major release
    - x.4.x is the minor release
    - x.x.2 is the patch release
- ^1.x.x indicates all minor releases and patches are okay
    - form of semantic versioning

### Package-lock.json

- the **package.json** is the input where as **package-lock.json** is the output
    - I don’t really understand what that means?
- **package-lock.json** takes priority when installing dependencies
- 

---

## 3. Advanced Subjects

### Working with an npm cache

- sometimes the npm cache will “get confused”
    - use:
        - `npm cache verify`
            - runs report to verifty cache
        - `npm cache clean --force`
            - force is needed since it will try to tell you that the cache self heals

### Run an npm audit

- will check dependencies to see if it’s safe to use
- requires version 6+ of npm to work properly
- `npm audit`
    - detailed report for when the terminal gives you warning
    - low or moderate are okay
    - high or critical should be fixed immediately
    - indicates if it is a dependency of something so we know where the error is coming from
    - best to install/update specific dependencies of an npm package, instead of just trying to reinstall the entire package

### Scripting in package.json

```jsx
"scripts": {
	"start": "nodemon ./index.js --exec babel-node -e js"
}
```

### Introduction to npx

- npx was created to reduce package-pollution in your global directories
- ex. angular
    - `npx -p @angular/cli ng new my app`
        - temp install of angular which will self delete after creating the app
- ex. cowsay
    
    ```jsx
    PS C:\Users\micha\Desktop\npm practice> npx cowsay this is cool!
     _______________
    < this is cool! >
     ---------------
            \   ^__^
             \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||
    ```
    
    ```jsx
    "scripts": {
    	"createang": "npx -p @angular/cli ng new my app"
    }
    ```
    

### Alternatives to npm

- package-lock.json originated in yarn and was later implemented in npm
- yarn is similar to npm
    - created by facebook
    - slightly faster but requires a package manager
    - npx yarn lets you use yarn without installing
- ni
    - a.k.a better-npm
    - `npx -p better-npm-install ni`
- all of these are similar, just with a slightly different approach

---

## Conclusion and Next Steps

- learning more about Node.js
    - building API with express
- React
- Angular
- security subjects with JavaScript
- npm publishing
    - package management