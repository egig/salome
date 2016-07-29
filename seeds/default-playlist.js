
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('playlists').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('playlists').insert({id: 1, name: 'Default'})
      ]);
    });
};
