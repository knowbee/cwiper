#!/usr/bin/env node
const { cwiper, transform } = require("./lib/cleaner");
const fs = require("fs");
const spinner = require("ora")();

if (process.argv.length < 3) {
  console.error(`Usage: cwiper --path <Path Name>`);
  process.exit(1);
}

process.argv.slice(2).forEach(cmd => {
  if (cmd === "--path" || cmd === "-p") {
    try {
      if (fs.existsSync(process.argv[3])) {
        cwiper
          .then(files => {
            files.forEach(file => {
              transform(file);
            });
            spinner.succeed("done");
          })
          .catch(error => {
            process.exit(1);
          });
      } else {
        console.log("");
        console.log("  $ cwiper --help");
        process.exit(0);
      }
    } catch (error) {
      console.log(error);
      console.log("invalid path");
    }
  }
});
