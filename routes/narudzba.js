var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var n = req.body
  console.log(n.jelo)
  console.log(n)
  res.render('narudzba', { title: 'Restorani', jelo: req.body.jelo });

});




module.exports = router;
