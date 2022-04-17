const request = require("./node_modules/request");
const cheerio = require("./node_modules/cheerio");

/**
 * 取得當期三星彩數字
 */
const Crawler3D = () => {
    request({
        url: "https://www.taiwanlottery.com.tw/Lotto/3D/history.aspx",
        method: "GET"
    }, (error, res, body) => {
        // 如果有錯誤訊息，或沒有 body(內容)，就 return
        if (error || !body) {
            return;
        }

        const $ = cheerio.load(body); // 載入 body
        const num = $("table.table_org tr:eq(2) .td_w");
        

        console.log(num.text());
        //console.log(body);
    });
};

Crawler3D();