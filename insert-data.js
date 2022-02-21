const axios = require('axios').default;
(async () => {
    const productKeywords = ['น้ำมันพืช', 'ข้าว', 'เนื้อสัตว์'];
    for (const k of productKeywords) {
        console.log("searching ...", k)
        const response = await axios.get(
            `https://dataapi.moc.go.th/products?keyword=${encodeURI(k)}`,
            {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36'
            }
        )
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log(response.data)
        for (const item of response.data) {
            const doc = {
                th_title: item.hs_description_th,
                th_desc: `${item.hs_description_th} ${item.com_description_th}`,
                desc: `${item.hs_description_th} ${item.com_description_th}`,
            }
            
            const result = await axios.put(`http://localhost:9200/my-thai-index/_doc/${item.com_code}`, JSON.stringify(doc), config)
            console.log("- insert", item.com_code, result.data)
        }
    }


})()
