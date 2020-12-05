#! /usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to your music collection!");

class MusicCollection {
  constructor() {
    this.database = {};
  }

  add(title, artist) {
    const normalizedTitle = this.normalize(title);
    const normalizedArtist = this.normalize(artist);

    if (this.database.hasOwnProperty(this.normalize(title))) {
      console.log("An album of this title already exists in your collection.");
    } else {
      this.database[normalizedTitle] = {
        title: normalizedTitle,
        artist: normalizedArtist,
        playStatus: "unplayed",
      };
      console.log(
        "\n",
        `Added ${this.database[normalizedTitle].title} by ${this.database[normalizedTitle].artist}`
      );
    }
  }

  play(title) {
    const normalizedTitle = this.normalize(title);

    if (this.database.hasOwnProperty(normalizedTitle)) {
      this.database[normalizedTitle].playStatus = "played";
      console.log(
        "\n",
        `You're listening to ${normalizedTitle} by ${this.database[normalizedTitle].artist}`
      );
    } else {
      console.log(
        "This album does not exist in your music collection. Please add it first"
      );
    }
  }

  showAll(inputs = []) {
    const filteredResults = this.filter(inputs);

    for (const entry in filteredResults) {
      console.log(
        "\n",
        `${entry} by ${filteredResults[entry].artist} (${filteredResults[entry].playStatus})`
      );
    }
  }

  showUnplayed(inputs = []) {
    const filteredResults = this.filter(inputs);

    for (const entry in filteredResults) {
      console.log("\n", `${entry} by ${filteredResults[entry].artist}`);
    }
  }

  filter(filters = []) {
    if (filters.length < 1) return this.database;

    let currentIndex = filters.length - 1;
    const filteredLibrary = JSON.parse(JSON.stringify(this.database));

    while (currentIndex >= 0) {
      for (const entry in filteredLibrary) {
        const normalizedFilter = this.normalize(filters[currentIndex]);
        const entryValues = Object.values(filteredLibrary[entry]);

        if (!entryValues.includes(normalizedFilter)) {
          delete filteredLibrary[entry];
        }
      }

      currentIndex -= 1;
    }

    return filteredLibrary;
  }

  normalize(word) {
    return word.replace(/\"/g, "");
  }
  normalizeEntries(entries = [""]) {
    return entries.map((entry) => this.normalize(entry));
  }
}

const collection = new MusicCollection();

rl.prompt();

rl.on("line", (line) => {
  const inputEntries = line.split(' "');
  const action = inputEntries.shift().toLowerCase().trim();

  switch (action) {
    case "add":
      collection.add(...inputEntries);
      break;
    case "play":
      collection.play(...inputEntries);
      break;
    case "show all":
      collection.showAll();
      break;
    case "show all by":
      collection.showAll(inputEntries);
      break;
    case "show unplayed":
      collection.showUnplayed(["unplayed"]);
      break;
    case "show unplayed by":
      collection.showUnplayed(["unplayed", ...inputEntries]);
      break;
    case "quit":
      console.log("Bye!");
      return rl.close();
    default:
      console.log(`Sorry we do not support the action ${action} currently.`);
  }
  rl.prompt();
});
