const request = require("request");
const cheerio = require("cheerio");

/**遊戲功能對應表 */
const mapFunction = {
    "威力彩": getSuperLotto,
    "大樂透": getLotto,
    "今彩539": getDailycash,
    "雙贏彩": getLotto1224,
    "3星彩": get3D,
    "4星彩": get4D,
    "38樂合彩": get38m6,
    "49樂合彩": get49m6,
    "39樂合彩": get39m5
}

const mapID = {
	"威力彩": "SuperLotto",
	"大樂透": "Lotto",
	"今彩539": "Lotto539",
	"雙贏彩": "Lotto1224",
	"3星彩": "3D",
	"4星彩": "4D",
	"38樂合彩": "Lotto38m6",
	"49樂合彩": "Lotto49m6",
	"39樂合彩": "Lotto39m5"
};


/**取得頁面html */
const doRequest = (url)=>{
    return new Promise((resolve, reject)=>{
        request({
            url: url,
            method: "GET"
        }, (error, res, body) => {
            // 如果有錯誤訊息，或沒有 body(內容)，就 return
            if (error || !body) {
                reject(error);
            }
            else{
                resolve(body);
            }    
        });
    });
}

/**取得所有樂透彩資訊 */
const crawlerAll = async () => {
    //台灣彩券-最新開獎結果
    url = "https://www.taiwanlottery.com.tw/result_all.htm";
    
    let getBody = async ()=>{
        return await doRequest(url);
    };

    let body = await getBody();
    let $ = cheerio.load(body);

    let oResult = {};

    //走訪每一個區塊項目
    const block = $(".intx01");
    for(let i = 0; i < block.length; i++){

        //處理各個遊戲的獎號處理
        var o = fnHandleCommon(block.eq(i));

        //存在遊戲名稱才做處理
        o && (oResult[o.ID] = o);

        //移除遊戲名稱（回傳的物件已用名稱做為key值，不需要重覆的資訊）
        delete o.ID;
    }

    return oResult;
}

module.exports = {
    crawlerAll
};

/**處理共用功能，並且指派執行差異功能 */
function fnHandleCommon($){
    //取得遊戲名稱
    const name = $.find("table.tableWin tbody tr:first-child td:eq(1)").text().trim();

    //不存在遊戲資訊，離開函式
    if(!name) return false;

    //回傳遊戲資訊
    return {
        name: name,
		ID: mapID[name],
        date: fnHandleDate($),
        result: mapFunction[name]($)
    }

}

/**取得威力彩資訊 */
function getSuperLotto($){
    var tr4 = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    //取得第二區號碼
    var zone2 = tr4.find(".font_red14").text().trim();
    var zone1s = tr4.find(".font_red14").nextAll("span");
    var aryZone1 = [];
    for(let i = 0; i<zone1s.length; i++){
        aryZone1.push(zone1s.eq(i).text().trim());
    }

    return aryZone1.join(",") + ":" + zone2;
}

/**取得大樂透資訊 */
function getLotto($){
    var tr4 = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    //取得第二區號碼
    var zone2 = tr4.find(".font_red14 > .font_red14").text().trim();
    var zone1s = tr4.find(".font_red14").nextAll("span");
    var aryZone1 = [];
    for(let i = 0; i<zone1s.length; i++){
        aryZone1.push(zone1s.eq(i).text().trim());
    }

    return aryZone1.join(",") + ":" + zone2;
}

/**取得今彩539資訊 */
function getDailycash($){
    var tr4 = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    var zone1s = tr4.find("br").nextAll("span");
    var aryZone1 = [];
    for(let i = 0; i<zone1s.length; i++){
        aryZone1.push(zone1s.eq(i).text().trim());
    }

    return aryZone1.join(",");
}

/**取得雙贏彩資訊 */
function getLotto1224($){
    var tr4 = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    var zone1s = tr4.find("br").nextAll("span");
    var aryZone1 = [];
    for(let i = 0; i<zone1s.length; i++){
        aryZone1.push(zone1s.eq(i).text().trim());
    }

    return aryZone1.join(",");
}

/**取得三星彩資訊 */
function get3D($){  
    var result = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    return result.text().replace(/[\s]/g, "");
}

/**取得四星彩資訊 */
function get4D($){  
    var result = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    return result.text().replace(/[\s]/g, "");
}

/**取得38樂合 */
function get38m6($){
    var tr4 = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    var zone1s = tr4.find("br").nextAll("span");
    var aryZone1 = [];
    for(let i = 0; i<zone1s.length; i++){
        aryZone1.push(zone1s.eq(i).text().trim());
    }

    return aryZone1.join(",");
}

/**取得49樂合 */
function get49m6($){
    var tr4 = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    var zone1s = tr4.find("br").nextAll("span");
    var aryZone1 = [];
    for(let i = 0; i<zone1s.length; i++){
        aryZone1.push(zone1s.eq(i).text().trim());
    }

    return aryZone1.join(",");
}

/**取得39樂合 */
function get39m5($){
    var tr4 = $.find("table.tableWin tbody tr:eq(4) td:eq(1)");
    var zone1s = tr4.find("br").nextAll("span");
    var aryZone1 = [];
    for(let i = 0; i<zone1s.length; i++){
        aryZone1.push(zone1s.eq(i).text().trim());
    }

    return aryZone1.join(",");
}

/**處理開獎日期 */
function fnHandleDate($){
    //日期資訊存在於第3個tr，以及第2個td
    var oDate = $.find("table.tableWin tbody tr:eq(2) td:eq(1)");
    //strDate的內容為：民國111 年 4 月 29 日
    var strDate = oDate.text().trim();
    //使用正規表示式取得年月日
    var oMatch = strDate.match(/[^\d]*(\d+)[^\d]*(\d+)[^\d]*(\d+)/);

    //找到的資料一定是長度4，非長度4表示有誤，離開函式
    if(oMatch.length != 4) return null;

    //網頁上的開獎日期為「民國年」，需加上1911，才是西元年
    return `${parseInt(oMatch[1]) + 1911}/${oMatch[2]}/${oMatch[3]}`;
}
