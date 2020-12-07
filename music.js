#! /usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const utils = require("./Utils/utils");
const { MusicCollection } = require("./MusicCollection/MusicCollection");

const collection = new MusicCollection();

console.log("Welcome to your music collection!");

rl.prompt();

rl.on("line", (line) => {
  if (!line) {
    console.error("Please enter a command or a command with options in quotes.");
    console.log("\n", 'Example: show all by "played" "Pink Floyd" ');
  } else {
    const inputEntries = utils.normalizeEntries(line.split(' "'));
    const action = inputEntries.shift().toLowerCase().trim();

    try {
      switch (action) {
        case "add":
          collection.add({ title: inputEntries[0], artist: inputEntries[1] });
          break;
        case "play":
          collection.play({ title: inputEntries[0] });
          break;
        case "show all":
          collection.show({ displayPlayStatus: true });
          break;
        case "show all by":
          collection.show({ filters: inputEntries, displayPlayStatus: true });
          break;
        case "show unplayed":
          collection.show({ filters: ["unplayed"] });
          break;
        case "show unplayed by":
          collection.show({ filters: ["unplayed", ...inputEntries] });
          break;
        case "quit":
          console.log("Bye!");
          return rl.close();
        default:
          console.error(
            "\n",
            `Sorry we do not support the command ,${action}, currently.`
          );
      }
    } catch (error) {
      console.error(error);
    }
  }

  rl.prompt();
});
