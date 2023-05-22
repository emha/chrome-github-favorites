let defaultButtonClass = "btn btn-mdd";
let defaultButtonClasslist = `${defaultButtonClass} btn-danger`;
let activeButtonClasslist = `${defaultButtonClass} btn-primary`;

let defaultButtonText = "Add to favorites";
let removeButtonText = "Remove from favorites";

/**
 * Load storage
 */
chrome.storage.local.get(["favorites"], (items) => {
  var parent = document.getElementById("repository-details-container");

  var url = window.location.href;
  var name = url.split("github.com")[1];
  name = name.replace(/^\/+/g, "");
  name = name.split("/");
  name = name[0] + "/" + name[1];

  if (typeof items.favorites === "undefined") {
    items = {
      favorites: [],
      settings: {
        dashboard: false,
      },
    };
  }

  /**
   * Add/delete repo from array
   */
  let repoFound = -1;
  items.favorites.forEach((repo, index) => {
    if (repo.name === name) {
      repoFound = index;
    }
  });

  var button = createElementFromHTML(
    `<button class="${defaultButtonClasslist}">${defaultButtonText}</button>`
  );

  /**
   * Change button style
   */
  if (repoFound < 0) {
    button.classList = activeButtonClasslist;
    button.innerText = defaultButtonText;
  } else {
    button.innerText = removeButtonText;
  }

  /**
   * Add/remove repo on click
   */
  button.addEventListener("click", () => {
    if (repoFound >= 0) {
      items.favorites.splice(repoFound, 1);

      button.classList = activeButtonClasslist;
      button.innerText = defaultButtonText;
      repoFound = -1;
    } else {
      items.favorites.push({
        name: name,
        url: url,
      });

      button.classList = defaultButtonClasslist;
      button.innerText = removeButtonText;
      repoFound = items.favorites.length - 1;
    }

    chrome.storage.local.set({
      favorites: items.favorites,
    });
  });

  /**
   * Add button to parent node
   */
  parent.parentNode.insertBefore(button, parent);

  /**
   * Add align-items: center to parent node
   */
  button.parentNode.style.alignItems = "center";
});
