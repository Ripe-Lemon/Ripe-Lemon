function saveOptions() {
  browser.storage.local.set({
    banList: document.querySelector("#getBanID").value,
  });
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

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector('.saveBanList').addEventListener('click', function() {
    saveOptions();
  });
