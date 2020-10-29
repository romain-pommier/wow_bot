const Query = require('./Query')

module.exports = class Raider {
    constructor(pseudo) {
        this.query = new Query
        this.pseudo = pseudo
        this.url = "https://raider.io/api/v1/characters/profile?region=eu&realm=hyjal&fields=guild,raid_progression,raid_achievement_meta,raid_achievement_curve,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_best_runs,mythic_plus_highest_level_runs,mythic_plus_weekly_highest_level_runs,mythic_plus_previous_weekly_highest_level_runs,previous_mythic_plus_ranks,gear,mythic_plus_scores&name=" + this.pseudo
        this.getRaider = this.query.getApi(this.url)

    }
}