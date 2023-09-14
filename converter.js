const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');
const readline = require('readline');

let outputFilename = ''; //base name of converted file

// The directory where your HEIC images are stored
const inputDirectory = './heic-files'; 
let counterFilesLength = 0;


// The directory where you want to save the converted JPG images
const outputDirectory = './jpg-files';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the file base name: {enter name, not the rest}-{fileNumber}.jpg ', function(fileName) {
  outputFilename = fileName;
  handleFileConversion();
  rl.close();
})


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
  
          const outputFilePath = path.join(outputDirectory, `${outputFilename}-${counterFilesLength}.jpg`);
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
