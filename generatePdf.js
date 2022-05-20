const puppeteer = require("puppeteer")
const path = require("path")

const MY_PDF_PORTION = {
    width: 1766,
    height: 1000,
};


module.exports.generatePdfFromHtml  = async (htmlString)=> {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        headless:true,
        args: ['--disable-dev-shm-usage','--no-sandbox'],
    });

    const styleCustom = `<style>p{font-size: 13px} span{font-size: 13px}</style>`

    //

    var document = `
    <html>
    <head>
      <style>
        @import url(https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css);
      </style>
       <style>
        @import url(https://fonts.googleapis.com/css?family=Montserrat);
        body {
          font-family: 'Montserrat', sans-serif;
        }
      </style>
      ${styleCustom}
    </head>
    <body>
      ${htmlString}
    </body>
    </html>
  `

    const page = await browser.newPage();
    /*await page.setContent(finaleString, { waitUntil: 'networkidle0' });
    await page.addStyleTag({content:bootstrap})
    await page.addStyleTag({path: path.join(__dirname, "./public/stylesheets/pdf.css")})
    await page.addStyleTag({content:"p{font-size:14px; font-family:montserrat;}"})
*/
    await page.goto('data:text/html,' + document, {waitUntil: 'networkidle0'});
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground:true
    })


    await browser.close();

    return pdfBuffer;

}
