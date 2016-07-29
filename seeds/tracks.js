
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tracks').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('tracks').insert({id: 1,title: 'TheOvertunes - Jatuh Dari Surga (Lyric Video)', thumbnail_url: 'https://i.ytimg.com/vi/31Veu2Bg3D0/mqdefault.jpg', video_id:'31Veu2Bg3D0'}),
        knex('tracks').insert({id: 2,title: 'TULUS - Pamit (Official Lyric Video)', thumbnail_url: 'https://i.ytimg.com/vi/3xNp8sjMOiU/mqdefault.jpg', video_id:'3xNp8sjMOiU'}),
        knex('tracks').insert({id: 3,title: 'Harris J - Salam Alaikum | Official Music Video', thumbnail_url: 'https://i.ytimg.com/vi/Q3zeQWZ62AU/mqdefault.jpg', video_id:'Q3zeQWZ62AU'})
      ]);
    });
};
