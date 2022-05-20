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

  /*.then(file => {
    fs.writeFile("./public/file-test.pdf", file,function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    })
    return file;
  })*/

  res.send({file: fileResponse.toString("base64")})

  //const url = path.join(__dirname, "../public/file-test.pdf")
  //res.sendFile(path.resolve(url))

});

module.exports = router;
