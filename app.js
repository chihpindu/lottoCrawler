const crawler = require('./crawler');

//程式碼進入點
(async()=>{
    let $ = await crawler.crawlerAll();
    console.dir($);
})();