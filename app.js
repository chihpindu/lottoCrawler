const crawler = require('./crawler');

//程式碼進入點
(async()=>{
    let result = await crawler.crawlerAll();
    console.dir(result);
})();