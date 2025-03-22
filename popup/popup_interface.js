document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector('.saveBanList').addEventListener('click', function() {
  saveOptions();
});
document.querySelector('.getBanList').addEventListener('click', function() {
  getBanListRaw();
});

function saveOptions() {
  if (document.querySelector("#getBanID").value === "") {
    browser.storage.local.set({
      banList: {},
    });
  }
  browser.storage.local.set({
    banList: JSON.parse(document.querySelector("#getBanID").value),
  });
}

function getBanListRaw() {
  let url = document.querySelector("#getBanIDFromRaw").value
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.querySelector("#getBanID").value = data;
    })
    .then(saveOptions)
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#getBanID").value = JSON.stringify(result.banList) || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function setUserNickname(result) {
    document.querySelector("#currentUserNickname").value = result.currentUserNickName || "";
  }

  var getting = browser.storage.local.get("banList");
  getting.then(setCurrentChoice, onError);

  let NickName = browser.storage.local.get("currentUserNickName");
  NickName.then(setUserNickname, onError);
}