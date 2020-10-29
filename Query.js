const https = require('https')
const BNET_ID = process.env.CLIENT_ID
const BNET_SECRET = process.env.CLIENT_SECRET
const TOKEN_BATTLE = process.env.TOKEN_BATTLE

module.exports = class Query {
    constructor() {
    }
    getApi = (urlApi) => {
        return new Promise((resolve, reject) => {
            https.get(urlApi, (res) => {
                let data = ""
                res.on("data", d => {
                    data += d
                    // process.stdout.write(d)
                })
                res.on('error', (e) => {
                    console.error(e);
                })
                res.on("end", () => {
                    resolve(data)
                })
            })
        });
    }

}
