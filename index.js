const fs = require("fs");

const basedir = __dirname + "/data/";
const re_single_line_comments = /^(\/\/\s*).*/gim; // comments like this (//)
const files = fs.readdirSync(basedir);

files.forEach(filename => {
  filedir = fs.realpathSync(basedir + filename);
  content = fs.readFileSync(filedir, "utf-8");
  fs.writeFileSync(filedir, content.replace(re_single_line_comments, ""));
});
