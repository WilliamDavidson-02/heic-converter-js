const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');
const readline = require('readline');

let outputFilename = '';
let counterFilesLength = 0;
let directoryPath;

// The directory where your HEIC images are stored
const inputDirectory = './files'; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

askQuestion('Enter the folder name: ')
  .then((directoryDirection) => {
    directoryPath = path.join(__dirname, `./files/${directoryDirection}`);
    fs.mkdir(directoryPath, (err) => {
      if (err) return console.error(err);
  });
    return askQuestion('Enter the file base name: ');
  })
  .then((fileName) => {
    outputFilename = fileName;
    handleFileConversion();
    rl.close();
  })
  .catch((error) => {
    console.error(error);
    rl.close();
  });



// Read the list of files in the input directory
function handleFileConversion() {
  fs.readdir(inputDirectory, async (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
    console.log('Starting conversion ....')
    let counterFilesRemaining = files.length;
    
    // Loop through each file in the directory
    for (const file of files) {
      const inputFilePath = path.join(inputDirectory, file);
  
      // Check if the file is a HEIC file
      if (path.extname(inputFilePath).toLocaleLowerCase() === '.heic') {
        try {
          const inputBuffer = fs.readFileSync(inputFilePath);
          
          const outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 1
          });
  
          const outputFilePath = path.join(directoryPath, `${outputFilename}-${counterFilesLength}.jpg`);
          fs.writeFileSync(outputFilePath, outputBuffer);
  
          counterFilesLength++
          counterFilesRemaining--
          console.log(`Successfully converted ${outputFilename}-${counterFilesLength}.jpg to JPG, ${counterFilesLength} files converted ${counterFilesRemaining} left.`);
        } catch (conversionError) {
          console.error(`Error converting ${outputFilename}-${counterFilesLength}.jpg: ${conversionError}`);
        }
      }
    }
  });
}