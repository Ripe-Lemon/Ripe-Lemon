document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector('.saveBanList').addEventListener('click', function() {
  saveOptions();
});
document.querySelector('.getBanList').addEventListener('click', function() {
  getBanListRaw();
});

function saveOptions() {
  browser.storage.local.set({
    banList: document.querySelector("#getBanID").value,
  });
}

function getBanListRaw() {
  let url = document.querySelector("#getBanIDFromRaw").value
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.querySelector("#getBanID").value = data
    })
    .then(saveOptions)
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#getBanID").value = result.banList || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("banList");
  getting.then(setCurrentChoice, onError);
}