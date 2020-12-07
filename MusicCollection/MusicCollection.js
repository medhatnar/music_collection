class MusicCollection {
  constructor() {
    this.database = {};
  }

  add({ title, artist }) {
    if (!title || !artist)
      throw new Error("Please provide both an album's title and artist.");
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

    return `Added "${this.database[caseInsensitiveTitle].title}" by ${this.database[caseInsensitiveTitle].artist}`;
  }

  play({ title }) {
    if (!title) throw new Error("Please provide an album title to play.");

    const caseInsensitiveTitle = title.toUpperCase();

    if (this.database.hasOwnProperty(caseInsensitiveTitle)) {
      this.database[caseInsensitiveTitle].played = "played";
      
      return `You're listening to ${this.database[caseInsensitiveTitle].title} by ${this.database[caseInsensitiveTitle].artist}`;
    } else {
      throw new Error(
        `The album, '${title}', does not exist in your music collection. Please add it first.`
      );
    }
  }

  show({ filters = [] }) {
    const filteredResults =
      filters.length < 1 ? this.database : this.filter({ filters });

    return filteredResults;
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
