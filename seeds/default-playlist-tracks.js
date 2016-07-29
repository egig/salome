
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playlists_tracks').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('playlists_tracks').insert({playlists_id:1, tracks_id:1, sequence:1 }),
        knex('playlists_tracks').insert({playlists_id:1, tracks_id:2, sequence:2 }),
        knex('playlists_tracks').insert({playlists_id:1, tracks_id:3, sequence:3 })
      ]);
    });
};
