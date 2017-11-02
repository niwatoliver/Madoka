//cost 12
export const YoutubeComment = {
  pullComment:
    function () {
      const GApi = require('googleapis');
      const API_KEY = '';
      const youtube = GApi.youtube({version: 'v3'});
      let chatId = '';
      let nextPageToken = '';

      youtube.videos.list({part: 'snippet,liveStreamingDetails', id: 'YgImHTviMeM', auth: API_KEY}, (err, data) => {
        if (err) {
          console.error('Error: ' + err);
        }
        if (data && data.items[0] && data.items[0].liveStreamingDetails && data.items[0].liveStreamingDetails.activeLiveChatId) {
          chatId = data.items[0].liveStreamingDetails.activeLiveChatId;
          pullMessage(chatId);
        }
      });

      function pullMessage() {
        youtube.liveChatMessages.list({
          part: 'snippet',
          liveChatId: chatId,
          pageToken: nextPageToken,
          auth: API_KEY
        }, (err, data) => {
          if (err) {
            console.error('Error: ' + err);
          }
          if (data) {
            nextPageToken = data.nextPageToken;
            data.items.forEach(item => {
              const p = document.createElement('p');
              p.textContent = item.snippet.displayMessage;
              document.getElementById('youtube-comments').appendChild(p);
            });
          }
        });
      }

      const intervalID = setInterval(() => {
        pullMessage(chatId);
      }, 5000);
    }
};
