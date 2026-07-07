/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import * as fs from 'node:fs';

// get the user's input and saves it in website.text
inquirer
  .prompt([
    {name: "text", message: "What do you want to be in the QR: "}
  ])
  .then((answers) => {
    var website = answers.text;
    var qr_svg = qr.image(website, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr-site.png'));
    console.log("")
    fs.writeFile("website.txt", website, (err) => {
        if (err) {
            console.log(err);
        }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

