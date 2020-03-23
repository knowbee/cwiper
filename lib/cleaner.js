const fs = require("fs");
basedir = process.argv[3];
const re_single_line_comments = /^(\/\/\s*).*/gim; // comments like this (//)
const re_empty_lines = /^\s*[\r\n]/gm;
const re_multiline_comments = /\*[\s\S]*?\*/gim;
const files = fs.readdirSync(basedir);

module.exports = {
  soclean: () => {
    files.forEach(filename => {
      filedir = fs.realpathSync(basedir + "/" + filename);
      content = fs.readFileSync(filedir, "utf-8");
      fs.writeFileSync(
        filedir,
        content
          .replace(re_empty_lines, "")
          .replace(re_single_line_comments, "")
          .replace(re_multiline_comments, "")
      );
    });
  }
};
