var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  user: 'dughngah', //env var: PGUSER
  database: 'dughngah', //env var: PGDATABASE
  password: 'IlqslF71QY7FMYl9y3AiDIhmqmRwnEFL', //env var: PGPASSWORD
  host: 'hattie.db.elephantsql.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 100, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.connect(function (err,client,done) {
    if (err){
      res.end('{"error" : "Error","status" : 500}');
    }
    client.query('SELECT * FROM restorani;',[],function (err,result) {
      done();

      if (err){
        console.info(err);
        res.sendStatus(500);
      } else{
        res.render('restorani', { title: 'Restorani', restorani: result.rows });
      }
    })
  })
});

router.get('/:ime', function(req, res, next) {
  pool.connect(function (err,client,done) {
    if (err){
      res.end('{"error" : "Error","status" : 500}');
    }
    var ime = req.params.ime;

    console.log(ime)
    client.query( 'SELECT r.id, r.naziv,j.id, j.naziv\n' +
                  'from restorani r\n' +
                  'inner join jelo j on r.id = j.restoran_id where r.naziv=$1' ,[ime],function (err,result) {
      done();

      if (err){
        console.info(err);
        res.sendStatus(500);
      } else{
        res.render('restoran', { title: ime, jela: result.rows });
      }
    })
  })
});

/*router.post('/', function(req, res, next) {
  let a = req.body.ime
  let b = req.body.prezime
  res.render('index', { title: 'Express', ime: a, prezime: b });
});*/

module.exports = router;
