window.addEventListener('load',() => {

  const {remote} = require('electron');

  document.getElementById('exit').addEventListener('click', exit, false);

  function exit() {
    remote.app.quit();
  }
});
