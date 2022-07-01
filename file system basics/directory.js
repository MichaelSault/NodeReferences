const fs = require("fs");

if (fs.existsSync("storage-files")) {
    console.log("This directory already exits at this location");
} else {
    fs.mkdir("storage-files", err => {
        if (err) {
            throw err;
        }
    
        console.log("directory created");
    });
}
