#! /usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const utils = require("../Utils/utils.js");

console.log("Welcome to your music collection!");

class MusicCollection {
  constructor() {
    this.database = {};
    this.PLAYED = "played";
    this.UNPLAYED = "unplayed";
  }

  add({ title, artist }) {
    if (this.database.hasOwnProperty(title)) {
      console.log(
        "\n",
        "An album with this title already exists in your collection."
      );
    } else {
      this.database[title] = {
        title,
        artist,
        playStatus: this.UNPLAYED,
      };
      console.log(
        "\n",
        `Added ${this.database[title].title} by ${this.database[title].artist}`
      );
    }
  }

  play({ title }) {
    if (this.database.hasOwnProperty(title)) {
      this.database[title].playStatus = this.PLAYED;
      console.log(
        "\n",
        `You're listening to ${title} by ${this.database[title].artist}`
      );
    } else {
      console.log(
        "\n",
        `The album ${title} does not exist in your music collection. Please add it first.`
      );
    }
  }

  show({ inputs = [], displayStatus = false }) {
    const filteredResults = this.filter({ filters: inputs });

    for (const entry in filteredResults) {
      console.log(
        "\n",
        `${entry} by ${filteredResults[entry].artist} ${
          displayStatus ? `(${filteredResults[entry].playStatus})` : ""
        }`
      );
    }
  }

  filter({ filters = [] }) {
    if (filters.length < 1) return this.database;

    let currentIndex = filters.length - 1;
    const databaseCopy = JSON.parse(JSON.stringify(this.database));

    while (currentIndex >= 0) {
      for (const entry in databaseCopy) {
        const entryValues = Object.values(databaseCopy[entry]);
        if (!entryValues.includes(filters[currentIndex])) {
          delete databaseCopy[entry];
        }
      }

      currentIndex -= 1;
    }

    return databaseCopy;
  }
}

const collection = new MusicCollection();

rl.prompt();

rl.on("line", (line) => {
  const inputEntries = utils.normalizeEntries(line.split(' "'));
  const action = inputEntries.shift().toLowerCase().trim();

  switch (action) {
    case "add":
      collection.add({ title: inputEntries[0], artist: inputEntries[1] });
      break;
    case "play":
      collection.play({ title: inputEntries[0] });
      break;
    case "show all":
      collection.show({ displayStatus: true });
      break;
    case "show all by":
      collection.show({ inputs: inputEntries, displayStatus: true });
      break;
    case "show unplayed":
      collection.show({ inputs: ["unplayed"] });
      break;
    case "show unplayed by":
      collection.show({ inputs: ["unplayed", ...inputEntries] });
      break;
    case "quit":
      console.log("Bye!");
      return rl.close();
    default:
      console.log(
        "\n",
        `Sorry we do not support the command ${action} currently.`
      );
  }
  rl.prompt();
});
