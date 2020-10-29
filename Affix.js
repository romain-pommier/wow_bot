const https = require('https')
const Query = require('./Query')
const TOKEN_BATTLE = process.env.TOKEN_BATTLE

module.exports = class Affix {
    constructor() {
        this.query = new Query
        this.url = "https://eu.api.blizzard.com/data/wow/keystone-affix/index?namespace=static-eu&locale=en_US&access_token=" + TOKEN_BATTLE
        this.getAffix = this.query.getApi(this.url)

    }
}