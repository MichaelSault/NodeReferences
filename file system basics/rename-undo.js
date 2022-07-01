const fs = require("fs");

fs.renameSync("./assets/colorData.json", "./assets/colors.json");

fs.rename("./storage-files/notes.md", "./assets/notes.md", err => {
    if (err) {
        throw err;
    }
});

setTimeout(() => {
    fs.unlinkSync("./assets/ale.jpg");
}, 4000);