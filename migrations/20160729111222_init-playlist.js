
exports.up = function(knex, Promise) {
    return knex.schema.createTable('playlists', function (table) {
        table.increments();
        table.string('name');
        table.timestamps();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('playlist')
};
