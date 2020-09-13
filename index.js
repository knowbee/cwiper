#!/usr/bin/env node
const { cwiper, transform } = require("./lib/cleaner");
const fs = require("fs");
const spinner = require("ora")();
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
clear();
console.log(
  chalk.magenta(figlet.textSync("cwiper", { horizontalLayout: "full" }))
);

process.argv.slice(2).forEach(cmd => {
  if (cmd === "--path" || cmd === "-p") {
    try {
      if (fs.existsSync(process.argv[3])) {
        cwiper
          .then(files => {
            files.forEach(file => {
              transform(file);
            });
            spinner.succeed("YEAH!! :)");
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
  if (cmd === "--version" || cmd === "-v") {
    console.log("1.0.2");
  }
});
