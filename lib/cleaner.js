const fs = require("fs");
const re_single_line_comments = /(\/\/)\s*.*/gm; // comments like this (//)
const re_empty_lines = /^\s*[\r\n]/gm;
const re_multiline_comments = /(\{\/\*|(\/\*)).*(\*\/\}|(\*\/))/gm; //comments like {/* */} or /* */
const re_hash_comments = /(\#)\s*.*/gm; // #
const re_lua_single = /\-\-\s+(.+)(?<!\>)$/gm; //comments like --
const re_lua_multi = /^(\-\-\[\[)([\s\S]*)\-\-\]\]$/gm;
const re_jsp = /(\<\%\-).*(\%\>)$/gm; //single and multi line : <%-- --%>
// Go deeper no matter how project is structured and get all files with real path
const files = [];
basedir = process.argv[3];

// This function will return list of all files in all directories and subdirectories
let deeper = (dir, filelist) => {
  filelist = filelist || [];
  // if a given path resolves to a file return that file and exit
  if (fs.statSync(dir).isFile()) {
    filelist.push(dir);
    return filelist;
  }
  f = fs.readdirSync(dir);
  dir = fs.realpathSync(dir);

  f.forEach(file => {
    file = dir + "\\" + file;
    if (fs.statSync(file).isDirectory()) {
      filelist = deeper(file, filelist);
    } else {
      filelist.push(file);
    }
  });
  return filelist;
};

let cwiper = new Promise((resolve, reject) => {
  try {
    const allfiles = resolve(deeper(basedir, files));
    return allfiles;
  } catch (error) {
    console.log("path is required: $cwiper --path <Path Name>");
    process.exit(1);
  }
});

// go over each line in a file if comments found remove them
const transform = file => {
  fs.writeFileSync(
    file,
    fs
      .readFileSync(file, "utf-8")
      .replace(re_single_line_comments, "") //
      .replace(re_multiline_comments, "") // remove comments from files like .yaml, .py, .ts , .js
      .replace(re_hash_comments, "") // remove comments from files like .yaml, .py
      .replace(re_lua_single, "")
      .replace(re_lua_multi, "")
      .replace(re_jsp, "")
      .replace(re_empty_lines, "")
  );
};
module.exports = {
  cwiper,
  transform
};
