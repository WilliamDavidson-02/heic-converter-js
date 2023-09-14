# HEIC to JPG converter

The converter will convert Iphone HEIC images to jpg format using [**heic-converter**](https://www.npmjs.com/package/heic-convert)

## prerequisite

- Node.js

## Installation

**Clone the repository**

```bash
git clone https://github.com/WilliamDavidson-02/heic-converter-js.git
```

**Install dependencies**

npm
```bash
npm install
```
yarn
```bash
yarn install
```

## Configuration

Create a new files called **files** and save it in the same directory as the converter script is in.

```javascript
// The directory where your HEIC images are stored
const inputDirectory = './files'; 
```

## Running the converter

```bash
node converter.js
```