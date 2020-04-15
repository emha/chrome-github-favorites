let defaultButtonClasslist = 'btn btn-sm btn-danger';
let activeButtonClasslist = 'btn btn-sm btn-primary';

let defaultButtonText = 'Favorites';

/**
 * Load storage
 */
chrome.storage.local.get(["favorites"], function(items) {
  var parent = document.getElementsByClassName('pagehead-actions')[0];

  var url = window.location.href;
  var name = url.split('github.com')[1];
  name = name.replace(/^\/+/g, '');
  name = name.split('/');
  name = name[0] + '/' + name[1];
  

  /**
   * Add/delete repo from array
   */
  let repoFound = -1;
  items.favorites.forEach((repo, index) => {
    if(repo.name === name) {
      repoFound = index;
    }
  });

  var button = document.createElement('button');
  button.classList = defaultButtonClasslist;
  button.innerText = defaultButtonText;

  /**
   * Change button style
   */
  if(repoFound < 0) {
    button.classList = activeButtonClasslist;
    button.innerText = defaultButtonText;
  }

  /**
   * Add/remove repo on click
   */
  button.addEventListener('click', () => {
    if(repoFound >= 0) {
      items.favorites.splice(repoFound, 1);

      button.classList = activeButtonClasslist;
      repoFound = -1;
    } else {
      items.favorites.push({
        name: name,
        url: url
      });

      button.classList = defaultButtonClasslist;
      repoFound = (items.favorites.length - 1);
    }

    chrome.storage.local.set({"favorites": items.favorites});
  });

  parent.appendChild(button);
});