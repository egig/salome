
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tracks', function (table) {
        table.increments();
        table.string('title');
        table.string('thumbnail_url');
        table.string('video_id');
        table.timestamps();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tracks')
};
