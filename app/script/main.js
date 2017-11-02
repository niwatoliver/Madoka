import { YoutubeComment }  from './component/youtube/YoutubeComment';
import Shuvi from 'shuvi-lib';

const VIDEO_ID = 'RR7SoSNZ3MM';

const shuvi = new Shuvi({
  video_id : VIDEO_ID,        // 動画ID
  id       : 'player',        // 要素のID
  width    : 500,             // 画面の幅
  height   : 300,             // 画面の高さ
  autoplay : true,            // [option]自動再生（デフォルトはtrue）
  loop     : false            // [option]ループ（デフォルトはfalse）
});

/* load ----------------------------------------------------------- */
shuvi.on('load', () => {
  console.log('Hello, shuvi-lib.');
});

YoutubeComment.pullComment(
  'YgImHTviMeM',
  'api-key',
  (comments) => {
    comments.forEach(comment => {
      const p = document.createElement('p');
      p.textContent = comment;
      document.getElementById('youtube-comments').appendChild(p);
    });
  }
);
YoutubeComment.stopComment();
