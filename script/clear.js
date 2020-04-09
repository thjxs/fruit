const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '../images');
const imgSet = new Set(fs.readdirSync(root));
const whitelist = ['collections.json'];

for (let i = 0; i < whitelist.length; i += 1) {
  imgSet.delete(whitelist[i]);
}
for (let i of imgSet) {
  console.log(i);
  fs.unlink(path.join(root, i), () => {
    // dont care
  });
}
