import { YoutubeComment }  from './component/youtube/YoutubeComment';
//import { NiconicoComment } from "./component/niconico/NicnicoComment";

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    // height: window.innerWidth,
    // width: window.innerHeight,
    videoId: 'YgImHTviMeM',
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

onYouTubeIframeAPIReady();

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
//NiconicoComment.pullComment();