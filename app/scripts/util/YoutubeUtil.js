import GApi from 'googleapis';
const youtube = GApi.youtube({version: 'v3'});

//cost 12
//TODO polling管理
//TODO エラーハンドリング
export default class YoutubeComment {

  constructor(apiKey) {
    this._apiKey = apiKey;
    this._timer = null;
    this._pollingIntervalMillis = 0;
    this._nextPageToken = '';
    this._chatId = '';
  }

  connectChat(video_id, commentF, titleF) {
    this._nextPageToken = '';
    this._chatId = '';
    youtube.videos.list({part: 'snippet, liveStreamingDetails', id: video_id, auth: this._apiKey}, (err, data) => {
      if (err) { console.error('Error: ' + err); }
      if(data && data.items[0]){ titleF( data.items[0].snippet.title ); }
      if (data && data.items[0] && data.items[0].liveStreamingDetails && data.items[0].liveStreamingDetails.activeLiveChatId) {
        commentF(data.items[0].liveStreamingDetails.activeLiveChatId);
      } //else { console.log(data); }
    });
    return this;
  }

  connectComment(chatId, fn) {
    this._chatId = chatId;
    if(this._pollingIntervalMillis === 0) {
      youtube.liveChatMessages.list({
        part: 'snippet',
        liveChatId: this._chatId,
        pageToken: this._nextPageToken,
        auth: this._apiKey
      }, (err, data) => {
        if (err) { console.error('Error: ' + err); }
        if (data) {
          this._nextPageToken = data.nextPageToken;
          fn(data.items.map(item => item.snippet.displayMessage));
          this._pollingIntervalMillis = data.pollingIntervalMillis;
          this._timer = setTimeout( () => { this.connectComment(this._chatId, fn); }, this._pollingIntervalMillis);
        }
      });
    } else {
      this._timer = setTimeout( () => { this.connectComment(this._chatId, fn); }, this._pollingIntervalMillis);
      this._pollingIntervalMillis = 0;
    }
    return this;
  }

  stopComment() {
    clearTimeout(this._timer);
    return this;
  }
}
