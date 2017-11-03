import Shuvi from 'shuvi-lib';
const { remote } = require('electron');
const currentWindow = remote.getCurrentWindow();

const VIDEO_ID = 'ttW_-8pVg_o';
let type = 'default-comment';

const shuvi = new Shuvi({
  video_id : VIDEO_ID,                   // 動画ID
  id       : 'player',                   // 要素のID
  width    : (3/5) * window.innerWidth,  // 画面の幅
  height   : window.innerHeight,         // 画面の高さ
  autoplay : false,                      // [option]自動再生（デフォルトはtrue）
  loop     : false                       // [option]ループ（デフォルトはfalse)
});

/* video load ----------------------------------------------------------- */
shuvi.on('load', () => {
  //shuvi.player.playVideo();
  document.getElementById('youtube-wrapper').style.display = 'flex';
});

/* resize ----------------------------------------------------------- */
function setComponentSize(type){
  if(type === 'default-comment'){
    document.getElementById('comment-window').style.height = window.innerHeight + 'px';
    document.getElementById('overlay').style.width = (3/5) * window.innerWidth + 'px';
    document.getElementById('overlay').style.height = window.innerHeight + 'px';
    document.getElementById('player-wrapper').style.height = window.innerHeight + 'px';
    shuvi.resize((3/5) * window.innerWidth, window.innerHeight);
  } else if(type === 'open-comment'){
    document.getElementById('comment-window').style.height = window.innerHeight + 'px';
    document.getElementById('player-wrapper').style.height = window.innerHeight + 'px';
  } else if(type === 'hidden-comment'){
    document.getElementById('overlay').style.width = window.innerWidth + 'px';
    document.getElementById('overlay').style.height = window.innerHeight + 'px';
    document.getElementById('player-wrapper').style.height = window.innerHeight + 'px';
    shuvi.resize(window.innerWidth, window.innerHeight);
  }
}

window.onload = () => {
  setComponentSize(type);
  window.onresize = () => { setComponentSize(type); };
};

document.getElementById('restart').addEventListener('click', restart, false);
document.getElementById('stop').addEventListener('click', stop, false);
document.getElementById('start').addEventListener('click', start, false);
document.getElementById('play').addEventListener('click', videoChange, false);

function videoChange() { shuvi.change(document.getElementById('search').value); }

function restart() {
  shuvi.player.stopVideo();
  shuvi.player.playVideo();
}

function start() { shuvi.player.playVideo(); }

function stop() { shuvi.pause(); }

/* Comment Hidden  ----------------------------------------------------------- */
document.getElementById('hidden-comment').addEventListener('click', hiddenComment, false);
function hiddenComment() {
  currentWindow.setSize(
    currentWindow.getSize()[0] - document.getElementById('comment-window').offsetWidth,
    currentWindow.getSize()[1]
  );
  document.getElementById('comment-window').style.display = 'none';
  type = 'hidden-comment';
  setComponentSize(type);
}

/* Comment Open  ----------------------------------------------------------- */
document.getElementById('open-comment').addEventListener('click', openComment, false);
function openComment() {
  currentWindow.setSize(
    Math.floor(document.getElementById('player-wrapper').offsetWidth * (5/3)),
    currentWindow.getSize()[1]
  );
  document.getElementById('comment-window').style.display = 'block';
  type = 'open-comment';
  setComponentSize(type);
  type = 'default-comment';
}
