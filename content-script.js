chrome.storage.local.get(["favorites"], function(items) {
  if(typeof items.favorites === 'undefined') {
    items = {
      favorites: []
    };
  }
  
  /**
   * Parent
   */
  var parent = document.getElementsByClassName('js-repos-container')[0]
  var content = document.createElement("div"); 
  content.classList = 'js-repos-container mb-5';

  /**
   * Content headline
   */
  var contentHeadline = document.createElement('h2');
  contentHeadline.classList = 'f4 hide-sm hide-md mb-1 f5 d-flex flex-justify-between flex-items-center';
  contentHeadline.innerText = 'Favorites';

  /**
   * List wrap
   */
  var listWrap = document.createElement('ul');
  listWrap.classList = 'list-style-none';

  items.favorites.forEach((repo) => {
    var listChild = document.createElement('li');

    var listChildDiv = document.createElement('div')
    listChildDiv.classList = 'width-full text-bold';

    var listChildLink = document.createElement('a');
    listChildLink.classList = 'd-inline-flex flex-items-baseline f5 mb-2 dashboard-underlined-link width-fit';
    listChildLink.href = repo.url;

    listChildLink.innerText = repo.name;

    listChildDiv.appendChild(listChildLink);
    listChild.appendChild(listChildDiv);
    listWrap.appendChild(listChild);
  });

  /**
   * Display message for empty list
   */
  if(items.favorites.length <= 0) {
    var listChild = document.createElement('li');
    listChild.innerText = 'You haven\'t added any repositories yet. Go to a repository and click on "Add to favorites".'

    listWrap.appendChild(listChild);
  }

  /**
   * Apply to list
   */
  content.appendChild(contentHeadline);
  content.appendChild(listWrap);

  /**
   * Apply to parent
   */
  parent.prepend(content);
});