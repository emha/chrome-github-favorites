chrome.storage.local.get(["favorites", "settings"], (items) => {
  if (typeof items.favorites === "undefined") {
    items = {
      favorites: [],
      settings: {
        dashboard: true,
      },
    };
  }

  if (typeof items.settings === "undefined") {
    chrome.storage.local.set({
      settings: {
        dashboard: true,
      },
    });

    items.settings = {
      dashboard: true,
    };
  }

  /**
   * Parent
   */
  var parent = document.getElementsByClassName("loading-context")[0];
  var dashboard = document.getElementById("dashboard");
  var content = createElementFromHTML(
    '<div class="color-bg-default d-flex flex-column mb-5 border color-border-muted rounded-1 color-shadow-medium width-full height-fit p-3"></div>'
  );

  /**
   * Content headline
   */
  var contentHeadline = createElementFromHTML(
    '<h2 class="hide-sm hide-md mb-2 f7 d-flex flex-justify-between flex-items-center">Favorites</h2>'
  );

  /**
   * List wrap
   */
  var listWrap = createElementFromHTML('<ul class="list-style-none"></ul>');

  items.favorites.forEach((repo) => {
    var listChild = document.createElement("li");

    var listChildDiv = createElementFromHTML(
      '<div class="width-full text-bold"></div>'
    );
    var listChildLink = createElementFromHTML(
      `<a href="${repo.url}" class="d-inline-flex flex-items-baseline f5 mb-2 dashboard-underlined-link width-fit"></a>`
    );

    listChildLink.appendChild(
      createElementFromHTML(
        '<svg height="14" class="octicon octicon-star v-align-text-bottom mr-1 flex-shrink-0" viewBox="0 0 14 14" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>'
      )
    );

    listChildLink.appendChild(
      createElementFromHTML(
        `<span style="max-width: 260px" class="repo-name css-truncate css-truncate-target">${repo.name}</span>`
      )
    );

    listChildDiv.appendChild(listChildLink);
    listChild.appendChild(listChildDiv);
    listWrap.appendChild(listChild);
  });

  /**
   * Display message for empty list
   */
  if (items.favorites.length <= 0) {
    listWrap.appendChild(
      createElementFromHTML(
        '<li class="text-center">You haven\'t added any repositories yet. Go to a repository and click on <br> <button style="cursor: default;" class="mt-2 btn btn-md btn-primary">Add to favorites</button></li>'
      )
    );
  }

  /**
   * Apply to list
   */
  content.appendChild(contentHeadline);
  content.appendChild(listWrap);

  /**
   * Show on dashboard
   */
  if (items?.settings && items?.settings?.dashboard) {
    var dashboardNode = content.cloneNode(true);
    var dashboardNameNode =
      dashboardNode.getElementsByClassName("repo-name")[0];

    if (dashboardNameNode) {
      dashboardNameNode.style.maxWidth = "none";
    }

    dashboard.prepend(dashboardNode);
  }

  /**
   * Apply to parent
   */
  parent.prepend(content);
});
