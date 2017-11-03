import { YoutubeComment }  from './component/youtube/YoutubeComment';
//import { NiconicoComment } from "./component/niconico/NicnicoComment";
import Shuvi from 'shuvi-lib';

const VIDEO_ID = 'kfTq_A9nBM0';

const shuvi = new Shuvi({
  video_id : VIDEO_ID,        // 動画ID
  id       : 'player',        // 要素のID
  width    : 500,             // 画面の幅
  height   : 300,             // 画面の高さ
  autoplay : false,           // [option]自動再生（デフォルトはtrue）
  loop     : false            // [option]ループ（デフォルトはfalse)
});

/* load ----------------------------------------------------------- */
shuvi.on('load', () => {
  //shuvi.player.playVideo();
});

const youtubeComment = new YoutubeComment(
  process.env.YOUTUBE_API_KRY,
  (comments) => {
    comments.forEach(comment => {
      const p = document.createElement('p');
      p.textContent = comment;
      document.getElementById('youtube-comments').appendChild(p);
    });
  }
)

youtubeComment.connectChat(VIDEO_ID, (chatId) => {
  youtubeComment.connectComment(chatId)
})

//YoutubeComment.stopComment();
//NiconicoComment.pullComment();

document.getElementById('restart').addEventListener('click', restart, false);
document.getElementById('stop').addEventListener('click', stop, false);
document.getElementById('start').addEventListener('click', start, false);
document.getElementById('play').addEventListener('click', play, false);


function play() {
  const video_id = document.getElementById('search').value
  youtubeComment.stopComment();
  shuvi.change(video_id);
  youtubeComment.connectChat(video_id, (chatId) => {
    youtubeComment.connectComment(chatId)
  })
}

function restart() {
  shuvi.player.stopVideo();
  shuvi.player.playVideo();
}

function start() { shuvi.player.playVideo(); }

function stop() { shuvi.pause(); }

//FIXME
window.shuvi1 = shuvi;