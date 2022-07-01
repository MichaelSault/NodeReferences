const fs = require("fs");

fs.readFile("./assets/readMe.md", "UTF-8", (err, text) => {

    if(err) {
        console.log(`An error has occured: ${err.message}`);
        process.exit();
    }

    console.log("File Contents Read");
    console.log(text);
});

