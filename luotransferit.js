const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('transferit.db');

db.serialize( () => {

	let sql = "CREATE TABLE transfer (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "username text NOT NULL, " +
			  "money integer NOT NULL, " +
			  "credit integer NOT NULL)";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `transfer` (`id`, `username`, `money`, `credit`) "+
	" VALUES (1, 'pekka', '500', '5000')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `transfer` (`id`, `username`, `money`, `credit`) "+
	" VALUES (2, 'liisa', '200', '2000')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `transfer` (`id`, `username`, `money`, `credit`) "+
	" VALUES (3, 'joonas', '0', '0')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, username, money FROM transfer", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.username + ", " + row.money);
	});

	db.close();
});
