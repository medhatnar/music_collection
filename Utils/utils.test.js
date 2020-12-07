// @ts-nocheck
const { expect } = require("@jest/globals");
const { normalize } = require("./Utils");

describe("Utilities", () => {
    describe("normalize", () => {
        test("it removes any double quotes from a word", () => {
            const word = '"I" "love" "quoting" "quotes"';

            const normalizedWord = normalize(word);

            expect(normalizedWord).toBe("I love quoting quotes");
        });
    })
});
