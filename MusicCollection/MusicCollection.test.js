// @ts-nocheck
const { MusicCollection } = require("./MusicCollection");

describe("MusicCollection", () => {
  describe("add", () => {
    test("it creates a music entry in class database", () => {
      const title = "Blonde";
      const artist = "Frank Ocean";
      const musicCollection = new MusicCollection();

      const result = musicCollection.add({ title, artist });

      expect(musicCollection.database).toStrictEqual({
        [title.toUpperCase()]: { title, artist, played: "unplayed" },
      });
    });

    test("it throws error when not all arguments are passed", () => {
      const title = "Blonde";
      const musicCollection = new MusicCollection();

      const notPassingAllParams = () => musicCollection.add({ title });

      expect(notPassingAllParams).toThrowError(
        new Error(
          "Please provide both an album's title and artist in separate quotes."
        )
      );
    });

    test("it throws error when trying to add an existing title", () => {
      const title = "Blonde";
      const artist = "Frank Ocean";
      const anotherArtist = "Bob Dylan";
      const musicCollection = new MusicCollection();

      musicCollection.add({ title, artist });
      const tryToAddExistingTitle = () =>
        musicCollection.add({ title, artist: anotherArtist });

      expect(tryToAddExistingTitle).toThrow(
        new Error(
          `An album with the title, '${title}', already exists in your collection.`
        )
      );
    });
  });

  describe("play", () => {
    test("it updates title as played", () => {
      const title = "Blonde";
      const artist = "Frank Ocean";
      const musicCollection = new MusicCollection();

      musicCollection.add({ title, artist });
      expect(musicCollection.database[title.toUpperCase()]).toHaveProperty(
        "played",
        "unplayed"
      );

      musicCollection.play({ title });
      expect(musicCollection.database[title.toUpperCase()]).toHaveProperty(
        "played",
        "played"
      );
    });

    test("throws error if title does not exist in collection", () => {
      const title = "Blonde";
      const musicCollection = new MusicCollection();

      const addingNonExistingTitle = () => musicCollection.play({ title });

      expect(addingNonExistingTitle).toThrowError(
        `The album, '${title}', does not exist in your music collection. Please add it first.`
      );
    });

    test("throws error if no title is passed", () => {
      const musicCollection = new MusicCollection();

      const addingNonExistingTitle = () =>
        musicCollection.play({ title: undefined });

      expect(addingNonExistingTitle).toThrowError(
        "Please provide an album title to play in quotes."
      );
    });
  });

  describe("show", () => {
    test("prints filtered results formatted", () => {
      const title = "Blonde";
      const artist = "Frank Ocean";
      const musicCollection = new MusicCollection();
      const logger = jest.spyOn(console, "log");

      musicCollection.add({ title, artist });

      musicCollection.show({ displayPlayStatus: true });

      expect(logger).toHaveBeenLastCalledWith(
        "Blonde by Frank Ocean (unplayed)"
      );
    });
  });

  describe("filter", () => {
    test("it provides all album entries that pass filters", () => {
      const title = "Blonde";
      const artist = "Frank Ocean";
      const musicCollection = new MusicCollection();

      musicCollection.add({ title, artist });

      const filteredResults = musicCollection.filter.call(musicCollection, {
        filters: [artist],
      });

      expect(filteredResults).toEqual(
        expect.objectContaining({
          [title.toUpperCase()]: expect.objectContaining({ artist }),
        })
      );
    });
  });
});
