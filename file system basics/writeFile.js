const fs = require("fs");

const md = `

#This is a new file
====================

ES6 Template Strings are cool.  They honor whitespace.

* Template Strings
* Node File System
* Readline CLIs

`;

fs.writeFile("./assets/notes.md", md.trim(), err => {
    if (err) {
        throw err;
    }
    console.log("file saved");
});