var express = require('express');
const {generatePdfFromHtml} = require("../generatePdf");
var router = express.Router();
const fs = require('fs');
const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ESPRESSO' });
});

router.post('/pdf', async function(req, res) {
  const fileResponse = await generatePdfFromHtml(req.body.html)
  res.send({file: fileResponse.toString("base64")})
});

router.get('/pdf', async function(req, res) {

  res.send({file: "No caro mio, io mi aspetto una POST"})

});

module.exports = router;
