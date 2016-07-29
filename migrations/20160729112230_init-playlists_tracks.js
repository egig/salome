
exports.up = function(knex, Promise) {
    return knex.schema.createTable('playlists_tracks', function (table) {
        table.increments();
        table.integer('playlists_id');
        table.integer('tracks_id');
        table.integer('sequence');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('playlists_tracks')
};
