class MusicCollection {
  constructor() {
    this.database = {};
  }

  add({ title, artist }) {
    if (!title || !artist)
      throw new Error("Please provide both an album's title and artist.");
    if (this.database.hasOwnProperty(title))
      throw new Error(
        `An album with the title, '${title}', already exists in your collection.`
      );

    this.database[title] = {
      title,
      artist,
      played: "unplayed",
    };

    console.log(
      "\n",
      `Added "${this.database[title].title}" by ${this.database[title].artist}`,
      "\n"
    );
  }

  play({ title }) {
    if (this.database.hasOwnProperty(title)) {
      this.database[title].played = "played";

      console.log(
        "\n",
        `You're listening to ${title} by ${this.database[title].artist}`,
        "\n"
      );
    } else {
      throw new Error(
        `The album, '${title}', does not exist in your music collection. Please add it first.`
      );
    }
  }

  show({ filters = [], displayPlayStatus = false }) {
    const filteredResults =
      filters.length < 1 ? this.database : this.filter({ filters });

    for (const entry in filteredResults) {
      console.log(
        `${entry} by ${filteredResults[entry].artist} ${
          displayPlayStatus ? `(${filteredResults[entry].played})` : ""
        }`
      );
    }
  }

  filter({ filters }) {
    const filteredResults = {};

    for (const entry in this.database) {
      const entryValues = Object.values(this.database[entry]);
      let entryMatchAllFilters = true;

      filters.forEach((filter) => {
        if (!entryValues.includes(filter)) {
          entryMatchAllFilters = false;
        }
      });

      if (entryMatchAllFilters) filteredResults[entry] = this.database[entry];
    }

    return filteredResults;
  }
}

module.exports = { MusicCollection };
