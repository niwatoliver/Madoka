//TODO コメントと動画の比率を自由に変えられるように
import Shuvi from 'shuvi-lib';
import YoutubeUtil from './util/YoutubeUtil';
import './component/PlayerHeader';
import './component/Volume';

window.youtubeUtil = new YoutubeUtil(process.env.YOUTUBE_API_KRY);
const { remote, webFrame } = require('electron');
const currentWindow = remote.getCurrentWindow();
const dialog = remote.dialog;
let type = 'default-comment';
let shuvi = null;


//TODO
//webFrame.setZoomLevelLimits(1, 1);
const triggerSpans = document.getElementsByClassName('comment-trigger')[0].children;

/* Window on load -------------------------------------------------- */
window.addEventListener('load',() => {
  if(currentWindow.getSize()[0] < 700){
    //TODO リファクタ
    document.getElementById('comment-window').style.display = 'none';
    triggerSpans[0].style.width = '25px';
    triggerSpans[2].style.width = '25px';
    triggerSpans[0].style.transform = 'translate(0px) rotate(0deg)';
    triggerSpans[2].style.transform = 'translate(0px) rotate(0deg)';
    type = 'hidden-comment';
    currentWindow.setMinimumSize(420, 235);
    setComponentSize(type);
  }
  setComponentSize(type);
  document.getElementById('youtube-wrapper').style.display = 'flex';
});

/* Window on resize ------------------------------------------------- */
window.addEventListener('resize',() => { setComponentSize(type); });
window.video_volume = 0.6;


/* Resize ----------------------------------------------------------- */
function setComponentSize(type){
  if(type === 'default-comment'){
    document.getElementsByClassName('comment-wrap')[0].style.height = window.innerHeight - 56 + 'px';
    document.getElementById('overlay').style.width = (3/5) * window.innerWidth + 'px';
    document.getElementById('overlay').style.height = window.innerHeight + 'px';
    document.getElementById('player-wrapper').style.height = window.innerHeight + 'px';
    if(shuvi){ shuvi.resize((3/5) * window.innerWidth, window.innerHeight); }
  } else if(type === 'open-comment'){
    document.getElementsByClassName('comment-wrap')[0].style.height = window.innerHeight - 56 + 'px';
    document.getElementById('player-wrapper').style.height = window.innerHeight + 'px';
  } else if(type === 'hidden-comment'){
    document.getElementById('overlay').style.width = window.innerWidth + 'px';
    document.getElementById('overlay').style.height = window.innerHeight + 'px';
    document.getElementById('player-wrapper').style.height = window.innerHeight + 'px';
    if(shuvi){ shuvi.resize(window.innerWidth, window.innerHeight); }
  }
}

/* Comment toggle --------------------------------------------------- */
document.getElementById('comment-toggle-wrap').addEventListener('click', toggleComment, false);
function toggleComment() {
  if(type === 'default-comment'){
    hiddenComment();
    //TODO リファクタ
    triggerSpans[0].style.width = '25px';
    triggerSpans[2].style.width = '25px';
    triggerSpans[0].style.transform = 'translate(0px) rotate(0deg)';
    triggerSpans[2].style.transform = 'translate(0px) rotate(0deg)';
  }else {
    openComment();
    triggerSpans[0].style.width = null;
    triggerSpans[2].style.width = null;
    triggerSpans[0].style.transform = null;
    triggerSpans[2].style.transform = null;
  }
}

/* Comment Hidden  ------------------------------------------------- */
function hiddenComment() {
  currentWindow.setMinimumSize(420, 235);
  currentWindow.setSize(
    currentWindow.getSize()[0] - document.getElementById('comment-window').offsetWidth,
    currentWindow.getSize()[1]
  );
  document.getElementById('comment-window').style.display = 'none';
  type = 'hidden-comment';
  setComponentSize(type);
}

/* Comment Open  -------------------------------------------------- */
function openComment() {
  currentWindow.setMinimumSize(700, 235);
  currentWindow.setSize(
    Math.round(document.getElementById('player-wrapper').offsetWidth * (5/3)),
    currentWindow.getSize()[1]
  );
  document.getElementById('comment-window').style.display = 'block';
  type = 'open-comment';
  setComponentSize(type);
  type = 'default-comment';
}

/* Click event  ----------------------------------------------------------- */
document.getElementById('reload').addEventListener('click', restart, false);
document.getElementById('stop').addEventListener('click', stop, false);
document.getElementById('start').addEventListener('click', start, false);
document.getElementById('play').addEventListener('click', videoChange, false);
document.getElementById('latest').addEventListener('click', latest, false);

/* Change video  ---------------------------------------------------------- */
function videoChange() {
  if(document.getElementById('search-box').value.length !== 0){
    if (navigator.onLine) {
      if(!shuvi){
        shuvi = new Shuvi({
          video_id : '',                         // 動画ID
          id       : 'player',                   // 要素のID
          width    : (3/5) * window.innerWidth,  // 画面の幅
          height   : window.innerHeight,         // 画面の高さ
          autoplay : false,                      // [option]自動再生（デフォルトはtrue）
          loop     : false                       // [option]ループ（デフォルトはfalse)
        });
        /* Video load ------------------------------------------------------ */
        shuvi.on('load', () => {
          shuvi.setVolume(window.video_volume);
          shuvi.player.playVideo();
          document.getElementById('youtube-wrapper').style.display = 'flex';
          setComponentSize(type);
          window.addEventListener('resize',() => { setComponentSize(type); });
          const cw = document.getElementsByClassName('comment-wrap')[0];
          cw.scrollTop = cw.scrollHeight;
          document.getElementById('start').style.display = 'none';
          document.getElementById('stop').style.display = 'block';
        });
      }
      shuvi.change(document.getElementById('search-box').value);
      window.shuvi = shuvi;
    } else if (!navigator.onLine) {
      dialog.showErrorBox("ネットワーク接続エラー", "ネットワークに接続してください");
    } else {
      dialog.showErrorBox("エラー", "予期せぬエラーが発生しました");
    }
  }
}

function restart() {
  if(shuvi) {
    shuvi.player.stopVideo();
    shuvi.player.playVideo();
  }
}

function latest() { if(shuvi){ shuvi.seek(1); } }

function start() {
  if(shuvi) {
    shuvi.player.playVideo();
    document.getElementById('start').style.display = 'none';
    document.getElementById('stop').style.display = 'block';
  }
}

function stop() {
  if(shuvi) {
    shuvi.pause();
    document.getElementById('start').style.display = 'block';
    document.getElementById('stop').style.display = 'none';
  }
}
