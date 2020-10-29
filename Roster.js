const https = require('https')
const Query = require('./Query')
const TOKEN_BATTLE = process.env.TOKEN_BATTLE

module.exports = class Roster {
    constructor() {
        this.query = new Query
        this.url = "https://eu.api.blizzard.com/data/wow/guild/hyjal/stay-focus/roster?namespace=profile-eu&locale=en_US&access_token=" + TOKEN_BATTLE
        this.getRoster = this.query.getApi(this.url)

    }
}
