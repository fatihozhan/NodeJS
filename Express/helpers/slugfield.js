const slugify = require("slugify");

const options = {
  replacement: "-", // replace spaces with replacement,
  remove: null, // regex to remove characters,
  lower: true, // result in lower case
  strict: false, // strip special characters except replacement,
  locale: "tr",
  trim: true, // trim leading and trailing replacement chars
};

module.exports = (text) => {
  return slugify(text, options);
};
