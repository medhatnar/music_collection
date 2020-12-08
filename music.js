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

      if (action.includes("add")) {
        console.log(
          "\n",collection.add({ title: inputEntries[0], artist: inputEntries[1] }),"\n"
        );

      } else if (action.includes("play") && !action.includes("show")) {
        console.log("\n", collection.play({ title: inputEntries[0] }), "\n");

      } else if(action.includes("show ")) {
        // all "show" commands covered here
        const showFilters = action.split(" ");
        const showAll = showFilters[1] === "all";

        const results = collection.show({
          filters: showAll ? inputEntries : [showFilters[1], ...inputEntries],
        });

        for (const entry in results) {
          console.log(
            "\n",
            `${results[entry].title} by ${results[entry].artist} ${
              showAll ? `(${results[entry].played})` : ""
            }`
          );
        }
      } else {
        throw new Error (`Sorry we currently do not support the command ${action}.`)
      }
    }
  } catch (error) {
    console.log(error);
  }
  rl.prompt();
});
