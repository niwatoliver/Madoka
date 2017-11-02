import GApi from 'googleapis';

let intervalId;

//cost 12
export const YoutubeComment = {
  pullComment:
    function (id, apiKey, callback) {
      const youtube = GApi.youtube({version: 'v3'});
      let chatId, nextPageToken;

      youtube.videos.list({part: 'snippet, liveStreamingDetails', id: id, auth: apiKey}, (err, data) => {
        if (err) { console.error('Error: ' + err); }
        if (data && data.items[0] && data.items[0].liveStreamingDetails && data.items[0].liveStreamingDetails.activeLiveChatId) {
          chatId = data.items[0].liveStreamingDetails.activeLiveChatId;
          pullMessage();
        }
      });

      function pullMessage() {
        youtube.liveChatMessages.list({
          part: 'snippet',
          liveChatId: chatId,
          pageToken: nextPageToken,
          auth: apiKey
        }, (err, data) => {
          if (err) { console.error('Error: ' + err); }
          if (data) {
            nextPageToken = data.nextPageToken;
            callback(data.items.map(item => item.snippet.displayMessage));
            if(intervalId){
              intervalId = setInterval(() => { pullMessage(); }, 5000);
            }
          }
        });
      }
    },
  stopComment: function () {
    if(intervalId){ clearInterval(intervalId); }
    console.log('stop!!');
  }
};
