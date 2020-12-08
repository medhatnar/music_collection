class MusicCollection {
  constructor() {
    this.database = {};
  }

  add({ title, artist }) {
    if (!title || !artist)
      throw new Error("Please provide both an album's title and artist in separate quotes.");
    if (this.database.hasOwnProperty(title.toUpperCase()))
      throw new Error(
        `An album with the title, '${this.database[title.toUpperCase()].title}', already exists in your collection.`
      );
    
    const caseInsensitiveTitle = title.toUpperCase();

    this.database[caseInsensitiveTitle] = {
      title,
      artist,
      played: "unplayed",
    };

    console.log(
      "\n",
      `Added "${this.database[caseInsensitiveTitle].title}" by ${this.database[caseInsensitiveTitle].artist}`,
      "\n"
    );
  }

  play({ title }) {
    if (!title) throw new Error("Please provide an album title to play in quotes.");

    const caseInsensitiveTitle = title.toUpperCase();

    if (this.database.hasOwnProperty(caseInsensitiveTitle)) {
      this.database[caseInsensitiveTitle].played = "played";

      console.log(
        "\n",
        `You're listening to ${this.database[caseInsensitiveTitle].title} by ${this.database[caseInsensitiveTitle].artist}`,
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
        `${filteredResults[entry].title} by ${filteredResults[entry].artist} ${
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
