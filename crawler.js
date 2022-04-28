const request = require("request");
const cheerio = require("cheerio");

//取得頁面html
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

//取得所有樂透彩資訊
const crawlerAll = async (url) => {
    url = url || "https://www.taiwanlottery.com.tw/result_all.htm";
    
    let getBody = async ()=>{
        return await doRequest(url);
    };

    let body = await getBody();
    let $ = cheerio.load(body);

    return {
        "3D": get3D($)
    };
}

module.exports = {
    crawlerAll
};

//取得三星彩資訊
const get3D = ($)=>{  
    return "000";
}