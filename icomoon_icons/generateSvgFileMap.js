import fs from 'fs';

const svgFiles = fs.readdirSync('../public/icomoon/SVG');
const filepath = './_svgFilesMap.js';

fs.appendFileSync(filepath, 'const svgFiles = {};\n');
fs.appendFileSync(filepath, '/* eslint-disable dot-notation */');

fs.appendFileSync(filepath, '\n');

svgFiles.forEach((file) => {
  if (file.indexOf('.svg') >= 0) {
    fs.appendFileSync(filepath, `svgFiles['${file.substr(0, file.length - 4)}'] = '${file}';\n`);
  }
});

fs.appendFileSync(filepath, '\n');

fs.appendFileSync(filepath, 'export default svgFiles;\n');

