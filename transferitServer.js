const express = require('express');
const app = express();

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))

var helmet = require('helmet')
app.use(helmet())

app.use(express.json());

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('transferit.db');

app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Toimii' })
});

//hekee kaikki
app.get('/transfer/all', (req, res, next) => {
	db.all('select * from transfer', function (error, result) {
		if (error) throw error;
		return res.status(200).json(result);
	});
})

//hekee yhden id:n perusteella
app.get('/transfer/:id', (req, res, next) => {
	let id = req.params.id;
    db.get('select * from transfer where id = ?', [id], (error, result) => {
		if (error) throw error;
		if (typeof(result) == 'undefined') {
			return res.status(200).json({});
		}
		return res.status(200).json(result);
	});
})

// lisää transferin databaseen
app.post('/transfer/add', (req, res, next) => {
    let transfer = req.body;
    
    db.run('INSERT INTO transfer (username, money, credit) VALUES (?, ?, ?)',
           [transfer.username, transfer.money, transfer.credit], (error, result) => {
        if (error) throw error;
        return res.status(200).json(result);
    });
})

app.get('/transfer/delete/:id', (req, res, next) => {
    let id = req.params.id;
    db.run('DELETE FROM transfer WHERE id = ?', [id], function (error, result) {
        if (error) throw error;
        return res.status(200).json(result);
    });
})
