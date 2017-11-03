import GApi from 'googleapis';
const youtube = GApi.youtube({version: 'v3'});

//cost 12
export class YoutubeComment {

  constructor(apiKey, callback) {
    this._apiKey = apiKey;
    this._callback = callback;
    this._timer = null;
  }

  connectChat(video_id, fn) {
    let chatId, nextPageToken;
    youtube.videos.list({part: 'snippet, liveStreamingDetails', id: video_id, auth: this._apiKey}, (err, data) => {
      if (err) { console.error('Error: ' + err); }
      if (data && data.items[0] && data.items[0].liveStreamingDetails && data.items[0].liveStreamingDetails.activeLiveChatId) {
        fn(data.items[0].liveStreamingDetails.activeLiveChatId);
      } else { console.log(data); }
    });
  }

  connectComment(chatId) {
    youtube.liveChatMessages.list({
      part: 'snippet',
      liveChatId: chatId,
      pageToken: this._nextPageToken,
      auth: this._apiKey
    }, (err, data) => {
      if (err) { console.error('Error: ' + err); }
      if (data) {
        console.log(data);
        this._nextPageToken = data.nextPageToken;
        this._callback(data.items.map(item => item.snippet.displayMessage));
          this._timer = setTimeout( () => {
            console.log("aaa");
          this.connectComment(chatId);
        }, data.pollingIntervalMillis)
      }
    });
  }

  stopComment() {
    clearTimeout(this._timer);
    console.log('stop!!');
    return this;
  }
};
