// only leaves word with alphanumeric characters and white space

const normalize = (word = "") => {
  return word.replace(/["]+/g, "");
};
const normalizeEntries = (entries = [""]) => {
  return entries.map((entry) => normalize(entry));
};

module.exports = { normalize, normalizeEntries };
