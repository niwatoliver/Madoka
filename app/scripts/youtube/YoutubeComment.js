import GApi from 'googleapis';
const youtube = GApi.youtube({version: 'v3'});

//cost 12
//TODO polling管理
export default class YoutubeComment {

  constructor(apiKey) {
    this._apiKey = apiKey;
    this._timer = null;
  }

  connectChat(video_id, fn) {
    youtube.videos.list({part: 'snippet, liveStreamingDetails', id: video_id, auth: this._apiKey}, (err, data) => {
      if (err) { console.error('Error: ' + err); }
      if (data && data.items[0] && data.items[0].liveStreamingDetails && data.items[0].liveStreamingDetails.activeLiveChatId) {
        fn(data.items[0].liveStreamingDetails.activeLiveChatId);
      } else { console.log(data); }
    });
    return this;
  }

  connectComment(chatId, fn) {
    youtube.liveChatMessages.list({
      part: 'snippet',
      liveChatId: chatId,
      pageToken: this._nextPageToken,
      auth: this._apiKey
    }, (err, data) => {
      if (err) { console.error('Error: ' + err); }
      if (data) {
        console.log('polling!!');
        this._nextPageToken = data.nextPageToken;
        fn(data.items.map(item => item.snippet.displayMessage));
        this._timer = setTimeout( () => {
          this.connectComment(chatId, fn);
        }, data.pollingIntervalMillis);
      }
    });
    return this;
  }

  stopComment() {
    clearTimeout(this._timer);
    return this;
  }
}
