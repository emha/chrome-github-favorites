chrome.storage.local.get(["favorites"], function(items) {
  if(typeof items.favorites === 'undefined') {
    items = {
      favorites: []
    };
  }
  
  /**
   * Parent
   */
  var parent = document.getElementsByClassName('js-repos-container')[0];
  var content = createElementFromHTML('<div class="js-repos-container mb-5 Box p-2"></div>');

  /**
   * Content headline
   */
  var contentHeadline = createElementFromHTML('<h2 class="f4 hide-sm hide-md mb-2 f5 d-flex flex-justify-between flex-items-center">Favorites</h2>')

  /**
   * List wrap
   */
  var listWrap = createElementFromHTML('<ul class="list-style-none"></ul>');

  items.favorites.forEach((repo) => {
    var listChild = document.createElement('li');

    var listChildDiv = createElementFromHTML('<div class="width-full text-bold"></div>');
    var listChildLink = createElementFromHTML(`<a href="${repo.url}" class="d-inline-flex flex-items-baseline f5 mb-2 dashboard-underlined-link width-fit"></a>`);

    listChildLink.appendChild(
      createElementFromHTML('<svg height="14" class="octicon octicon-star v-align-text-bottom mr-1 flex-shrink-0" viewBox="0 0 14 14" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>')
    );

    listChildLink.appendChild(
      createElementFromHTML(`<span style="max-width: 260px" class="css-truncate css-truncate-target">${repo.name}</span>`)
    );

    listChildDiv.appendChild(listChildLink);
    listChild.appendChild(listChildDiv);
    listWrap.appendChild(listChild);
  });

  /**
   * Display message for empty list
   */
  if(items.favorites.length <= 0) {
    listWrap.appendChild(
      createElementFromHTML('<li class="text-center">You haven\'t added any repositories yet. Go to a repository and click on <br> <button style="cursor: default;" class="mt-2 btn btn-sm btn-primary">Add to favorites</button></li>')
    );
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