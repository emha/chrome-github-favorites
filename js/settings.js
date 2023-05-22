window.onload = () => {
  chrome.storage.local.get(["settings"], (items) => {
    document.getElementById("dashboard").checked =
      items?.settings?.dashboard === true;

    document.getElementById("dashboard").addEventListener("change", (event) => {
      chrome.storage.local.set({
        settings: {
          dashboard: event.currentTarget.checked,
        },
      });

      chrome.tabs.reload();
    });
  });
};
