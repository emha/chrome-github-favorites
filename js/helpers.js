/**
 * Create element from HTML
 * 
 * @param {*} htmlString 
 */
const createElementFromHTML = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild; 
}