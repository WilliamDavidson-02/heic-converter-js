const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');
console.log('Starting conversion ....')

// The directory where your HEIC images are stored
const inputDirectory = './heic-files'; 
console.log("🚀 ~ file: converter.js:8 ~ inputDirectory:", inputDirectory)
//windows const inputDirectory = 'C:/Users/YourUsername/Desktop/myHEICFiles';
// const inputDirectory = '/Users/YourUsername/Desktop/myHEICFiles'; // Change 'YourUsername' to your actual username


// The directory where you want to save the converted JPG images
const outputDirectory = './jpg-files';
console.log("🚀 ~ file: converter.js:15 ~ outputDirectory:", outputDirectory)
// windows const outputDirectory = 'C:/Users/YourUsername/Desktop/myJPGFiles'; 
// const outputDirectory = '/Users/YourUsername/Desktop/myJPGFiles'; // Change 'YourUsername' to your actual username

// Read the list of files in the input directory
fs.readdir(inputDirectory, async (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }
  
  // Loop through each file in the directory
  for (const file of files) {
    const inputFilePath = path.join(inputDirectory, file);
    console.log("🚀 ~ file: converter.js:29 ~ fs.readdir ~ inputFilePath:", inputFilePath)

    // Check if the file is a HEIC file
    if (path.extname(inputFilePath).toLocaleLowerCase() === '.heic') {
      try {
        const inputBuffer = fs.readFileSync(inputFilePath);
        console.log("🚀 ~ file: converter.js:35 ~ fs.readdir ~ inputBuffer:", inputBuffer)
        
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 1
        });
        console.log("🚀 ~ file: converter.js:42 ~ fs.readdir ~ outputBuffer:", outputBuffer)

        const outputFilePath = path.join(outputDirectory, `${path.basename(file, '.heic')}.jpg`);
        fs.writeFileSync(outputFilePath, outputBuffer);
        console.log("🚀 ~ file: converter.js:46 ~ fs.readdir ~ outputFilePath:", outputFilePath)

        console.log(`Successfully converted ${file} to JPG.`);
      } catch (conversionError) {
        console.error(`Error converting ${file}: ${conversionError}`);
      }
    }
  }
});
