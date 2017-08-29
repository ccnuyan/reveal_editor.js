const fs = require('fs');

const body = fs.readFileSync('./image.png', 'binary');  // 输入
const image = new Buffer(body, 'binary').toString('base64'); // base64编码
const base64 = `data:image/png;base64,${image}`;
console.log(base64);

// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABXUlEQVRYR+2X4U3DMBBGXyeADYANYAIYgQ1oJ4ANgA1gAtgERmAD2g3YoOghG1nBsh1FThDi/qS1an/Pd1+u9oqFY7WwPgJcAE/A8cwwW2AjgB+OZhaPclsB9uHb3OX40v2TAIfALXAZMvsM3GdK3C0DD8D1QPARuBmMdQP4AA4GYhr9ZEmAXeY1H50B+4W9wpqW4i54IP2NHnA8jdEAsV+cAW8VCH2QmnAo7vRRAOmurLH19DklmgF8rd4BnzHMgJmYEs0A1vwqo+T4ZiSBc9ZhThOAxnspiAhQM6XTzZ5/ePoitvwmgFfgvLLLmikVdxOnYZ1mAFMldS1KplRU8dQ/TQA545VAcqY03W4gFXeNJoBcM6llIjVlKXtVALudr12vqAK0GG8KXBUgnpCmiJTm/gP8/gz0qv1w3aZW3BPmGyB3huspnK69i1czu9jctyPPieu5b0M/Mrs4wCf/JWVIBiGyfAAAAABJRU5ErkJggg==
