const fs = require("fs");

console.log("Started Reading Files");
fs.readdir("./assets", (err, files) => {

    if (err) {
        throw err;
    }

    console.log("Finished!");
    console.log(files);
});

console.log("Proff this is running Asynchronously :)");