const fs = require("fs");

fs.writeFile("data.txt", "Hello from NodeJS!", (err) => {
    if (err) {
        console.log(err);
    }
})

fs.readFile("data.txt", 'utf8', (err,data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
})