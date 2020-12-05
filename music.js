#! /usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to your music collection!");

const DATABASE = {};

class MusicCollection {
  constructor() {
    this.database = {};
  }

  add(title, artist) {
    const normalizedTitle = title.replace(/\"/g, "");
    const normalizedArtist = artist.replace(/\"/g, "");

    if (this.database.hasOwnProperty(normalizedTitle)) {
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
    const normalizedTitle = title.replace(/\"/g, "");

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

  filter(filters) {
    console.log("filters", filters);
    if (!filters) return this.database;

    let index = filters.length - 1;
    let filteredLibrary = JSON.parse(JSON.stringify(this.database));

    while (index >= 0) {
      for (const entry in filteredLibrary) {
        const normalizedFilter = filters[index].replace(/\"/g, "");
        const values = Object.values(filteredLibrary[entry]);
        console.log(
          "values",
          values,
          values.includes(normalizedFilter),
          normalizedFilter
        );
        if (!values.includes(normalizedFilter)) {
          delete filteredLibrary[entry];
        }
      }
      index -= 1;
      console.log(this.database);
    }

    return filteredLibrary;
  }
}

const collection = new MusicCollection();

rl.prompt();

rl.on("line", (line) => {
  const inputEntries = line.split(' "');
  const action = inputEntries.shift().toLowerCase().trim();

  switch (action) {
    case "add":
      collection.add(inputEntries[0], inputEntries[1]);
      break;
    case "play":
      collection.play(inputEntries[0]);
      break;
    case "show all":
      collection.showAll(null);
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
    default:
      console.log(`Sorry we do not support the action ${action} currently.`);
  }
  rl.prompt();
});

// rl.on("line", (line) => {
//   const inputs = line.split(' "');
//   console.log("inputs", inputs);

//   if (inputs[0] === "add") {
//     const title = `"${inputs[1]}`;
//     const artist = inputs[2].slice(0, inputs[2].length - 1);

//     if (DATABASE.hasOwnProperty(title)) {
//       console.log("An album of this title already exists in your collection.");
//     }

//     DATABASE[title] = { artist, playStatus: "unplayed" };

//     console.log("\n", `Added ${title} by ${artist}`, "\n");
//   } else if (inputs[0] === "play") {
//     const title = `"${inputs[1]}`;
//     if (DATABASE.hasOwnProperty(title)) {
//       console.log(
//         "\n",
//         `You're listening to ${title} by ${DATABASE[title].artist}`
//       );
//       DATABASE[title].playStatus = "played";
//     } else {
//       console.log("YOUR MUSIC COLLECTION DOES NOT CONTAIN THIS TITLE");
//     }
//   } else if (inputs[0] === "show unplayed") {
//     for (const entry in DATABASE) {
//       if (DATABASE[entry].playStatus === "unplayed") {
//         console.log("\n", `${entry} by ${DATABASE[entry].artist}`);
//       }
//     }
//   } else if (inputs[0] === "show all") {
//     for (const entry in DATABASE) {
//       console.log(
//         "\n",
//         `${entry} by ${DATABASE[entry].artist} (${DATABASE[entry].playStatus})`
//       );
//     }
//   } else if (inputs[0] === "show all by") {
//     const artist = inputs[1].slice(0, inputs[1].length - 1);
//     for (const entry in DATABASE) {
//       if (DATABASE[entry].artist === artist) {
//         console.log(
//           "\n",
//           `${entry} by ${DATABASE[entry].artist} (${DATABASE[entry].playStatus})`
//         );
//       }
//     }
//   } else if (inputs[0] === "show unplayed by") {
//     const artist = inputs[1].slice(0, inputs[1].length - 1);
//     for (const entry in DATABASE) {
//       if (
//         DATABASE[entry].artist === artist &&
//         DATABASE[entry].playStatus === "unplayed"
//       ) {
//         console.log("\n", `${entry} by ${DATABASE[entry].artist})`);
//       }
//     }
//   }

//   rl.prompt();
// });
