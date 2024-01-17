/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");


// Function to generate Markov text from input text

function generateText(text) {
     // Create a Markov Machine instance
     let mm = new markov.MarkovMachine(text);

     // Generate and print random text based on Markov chains
     console.log(mm.makeText());
}


// Function to read a file and generate Markov text.

function makeText(path) {
     // Read the file asynchronously
     fs.readFile(path, "utf8", function cb(err, data) {
          if (err) {
               // Handle errors when reading the file
               console.error(`ERROR! Cannot read the file: ${path}: ${err}`);
               process.exit(1);
          } else {
               // Generate Markov text from the file data
               generateText(data);
          }
     });
}

// Function to read a URL and generate Markov text.

async function makeURLText(url) {
     let resp;

     try {
          // Use axios to fetch data from the URL
          resp = await axios.get(url);
     } catch (err) {
          // Handle errors when fetching data from the URL
          console.error(`ERROR! Cannot read URL: ${url}: ${err}`);
          process.exit(1);
     }
     // Generate Markov text from the URL response data
     generateText(resp.data);
}


// Extract command-line arguments to determine file or URL input.
let [method, path] = process.argv.slice(2);


// Check the method (file or URL) and call the appropriate function

if (method === "file") {
     makeText(path);
} else if (method === "url") {
     makeURLText(path);
} else {
     // Handle unknown method error
     console.error(`ERROR! Unknown method: ${method}`);
     process.exit(1);
}