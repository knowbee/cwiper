const { soclean } = require("./lib/cleaner");
const fs = require("fs");
const spinner = require("ora")();

if (process.argv.length < 3) {
  console.error(`Usage: soclean --path <Path Name>`);
  process.exit(1);
}

process.argv.slice(2).forEach(cmd => {
  if (cmd === "--path" || cmd === "-p") {
    try {
      if (fs.existsSync(process.argv[3])) {
        soclean();
      } else {
        console.log("");
        console.log("  $ soclean --help");
        process.exit(0);
      }
      spinner.succeed("done");
    } catch (error) {
      console.log(error);
      console.log("invalid path");
    }
  }
});
