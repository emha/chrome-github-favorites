/**
 * Create element from HTML
 *
 * @param {string} htmlString
 */
const createElementFromHTML = (htmlString) => {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  return div.firstChild;
};
