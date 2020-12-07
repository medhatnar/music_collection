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
      played: false,
    };

    return `Added "${this.database[title].title}" by ${this.database[title].artist}`;
  }

  play({ title }) {
    if (this.database.hasOwnProperty(title)) {
      this.database[title].played = true;

      return `You're listening to ${title} by ${this.database[title].artist}`;
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
