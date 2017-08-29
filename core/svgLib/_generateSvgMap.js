import fs from 'fs';
import humps from 'humps';

const svgFiles = fs.readdirSync('./');
const filepath = './_svgMap.gen.js';
const objects = [];

svgFiles.forEach((file) => {
  if (file.indexOf('.svg') >= 0) {
    const objectname = humps.pascalize(file.substr(0, file.length - 4));
    fs.appendFileSync(filepath, `import ${objectname} from './${file}';\n`);
    objects.push(objectname);
  }
});

fs.appendFileSync(filepath, 'export default {\n');
objects.forEach((obj) => {
  fs.appendFileSync(filepath, `${obj},\n`);
});

fs.appendFileSync(filepath, '};\n');

