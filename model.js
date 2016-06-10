module.exports = {

  create_connection: function() {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : ''
    });

    connection.connect();

    connection.query('SELECT * from dt_user', function(err, rows, fields) {
      if (!err)
        console.log('The solution is: ', rows);
      else {
        console.log('Error while performing Query.');
        console.log(err);
      }
    });

    connection.end();
  }
}
