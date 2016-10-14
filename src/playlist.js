import { Model } from 'express-extended'

class PlaylistModel extends Model {
  insertTrack(id, video_id, title, thumbnail) {
    let _this = this;
    return this.knex('tracks').where('video_id', video_id).first().then(function(t){
      if(t) {
        // insert to plalist
        return _this.knex('playlists_tracks').insert({playlists_id: id, tracks_id: t.id});
      } else {
        return _this.knex('tracks').insert({video_id: video_id, title: title, thumbnail_url: thumbnail}).then(function(a){
          return _this.knex('playlists_tracks').insert({playlists_id: id, tracks_id: a[0] });
        });
      }
    });
  }

  insert(name) {
    return this.knex('playlists').insert({ name: name});
  }

  deleteTrack(id, track_id) {
    return this.knex('playlists_tracks').where({playlists_id: id, tracks_id: track_id}).delete();
  }
}

export default PlaylistModel;
