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
  try {
    if (!line) {
      console.error(
        "Please enter a command or a command with options in quotes."
      );
      console.log("\n", 'Example: show all by "played" "Pink Floyd" ');
    } else {
      const inputEntries = utils.normalizeEntries(line.split(' "'));
      const action = inputEntries.shift().toLowerCase().trim();

      if (action === "quit") {
        console.log("Bye!");
        return rl.close();
      }
      
      if (action === "add") {
        console.log(
          "\n",
          collection.add({ title: inputEntries[0], artist: inputEntries[1] }),
          "\n"
        );
      } else if (action === "play") {
        console.log("\n", collection.play({ title: inputEntries[0] }), "\n");
      } else {
        // all "show" commands covered here
        const actionFilters = action.split(" ");

        const showAll = actionFilters[1] === "all";

        const results = collection.show({
          filters: showAll ? inputEntries : [actionFilters[1], ...inputEntries],
        });

        for (const entry in results) {
          console.log(
            "\n",
            `${entry} by ${results[entry].artist} ${
              showAll ? `(${results[entry].played})` : ""
            }`,
            "\n"
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  rl.prompt();
});
