const https = require('https');
// Variables env
const envConf = require('dotenv').config();
// Discord
const Discord = require('discord.js');
const bot = new Discord.Client();
// BNET_ID.net
const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;
const TOKEN_BATTLE = process.env.TOKEN_BATTLE;

const Affix = require('./Affix');
const affix = new Affix();

const Raider = require('./Raider');

const Roster = require('./Roster');
const roster = new Roster();

// ---------------------------------------------------------------------------------------------------------------------
// ----------------------- use  console.log(`${this.date} ${this.time}`) -----------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// console.log(raider.url)

bot.on('message', function (message) {
  const channelName = message.channel.name;
  if (channelName === 'devbot' || channelName === 'officier') {
    if (message.content === '!senso') {
      message.channel.send('Senso est le meilleur RL');
    }
    if (message.content === '!raiko') {
      message.channel.send('Raiko a une transmo de merde');
    }
    if (message.content === '!nono') {
      message.channel.send('Nono bientôt DH');
    }
    if (message.content === '!cyril') {
      message.channel.send('Faux de givre');
    }
    if (message.content === '!zapeti') {
      message.channel.send('Zapeti le bro :heart:');
    }
    if (message.content.startsWith('!raider')) {
      const pseudo = message.content.split(' ')[1];
      const raider = new Raider(pseudo);
      raider.getRaider.then((data) => {
        let dataJson = JSON.parse(data.toString());
        if (dataJson.statusCode === undefined) {
          dataJson.faction_url =
            dataJson.faction == 'horde'
              ? 'https://cdnassets.raider.io/images/profile/masthead_backdrops/v2/hordebanner1.jpg'
              : 'https://cdnassets.raider.io/images/profile/masthead_backdrops/v2/alliancebanner1.jpg';
          const infoRaiderProfil = {
            color: 0x0099ff,
            type: 'image',
            background:
              'https://cdnassets.raider.io/images/profile/masthead_backdrops/v2/hordebanner1.jpg',
            title: dataJson.name,
            url: dataJson.profile_url,
            author: {
              name: 'Raider.io',
              icon_url:
                'https://cdnassets.raider.io/images/fb_app_image.jpg?2019-11-18',
              url: 'https://raider.io/',
            },
            description:
              '<' +
              dataJson.guild.name +
              '>' +
              '\n' +
              dataJson.class +
              ': ' +
              dataJson.active_spec_name +
              '\n' +
              dataJson.realm,
            thumbnail: {
              url: dataJson.thumbnail_url,
            },
            fields: [
              { name: 'Total: ', value: dataJson.mythic_plus_scores.all },
              {
                name: 'Dps: ',
                value: dataJson.mythic_plus_scores.dps,
                inline: true,
              },
              {
                name: 'Tank: ',
                value: dataJson.mythic_plus_scores.tank,
                inline: true,
              },
              {
                name: 'Heal: ',
                value: dataJson.mythic_plus_scores.healer,
                inline: true,
              },
              {
                name: 'Meilleurs donjons : ',
                value:
                  dataJson.mythic_plus_best_runs[0].dungeon +
                  ': ' +
                  dataJson.mythic_plus_best_runs[0].mythic_level +
                  ' ' +
                  showStar(
                    dataJson.mythic_plus_best_runs[0].num_keystone_upgrades
                  ) +
                  '\n' +
                  dataJson.mythic_plus_best_runs[1].dungeon +
                  ': ' +
                  dataJson.mythic_plus_best_runs[1].mythic_level +
                  ' ' +
                  showStar(
                    dataJson.mythic_plus_best_runs[1].num_keystone_upgrades
                  ) +
                  '\n' +
                  dataJson.mythic_plus_best_runs[2].dungeon +
                  ': ' +
                  dataJson.mythic_plus_best_runs[2].mythic_level +
                  ' ' +
                  showStar(
                    dataJson.mythic_plus_best_runs[2].num_keystone_upgrades
                  ),
                inline: true,
              },
            ],
            image: {
              url: dataJson.faction_url,
            },
            timestamp: new Date(),
            footer: {
              text: 'raider.io',
              icon_url: 'https://cdnassets.raider.io/images/mstile-70x70.png',
            },
          };
          message.channel.send({ embed: infoRaiderProfil });
        }
      });
    }
    // test
    function showStar(valueMythic) {
      let emoteUpdateMythicLevel = ':frog: ';
      let emoteDownGrade = ':crab:';
      let result = '';
      if (valueMythic == 0) return ' ' + emoteDownGrade;
      for (i = 0; i < valueMythic; i++) {
        result += emoteUpdateMythicLevel;
      }
      return result;
    }
    if (message.content === '!guild') {
      message.channel.send('Membres de Stay Focus: ');
      roster.getRoster.then((data) => {
        let dataJson = JSON.parse(data.toString());
        let rosterGuild = [];
        dataJson.members.forEach((element) => {
          rosterGuild.push(element.character.name);
          console.log(element.character.name);
        });
        message.channel.send(rosterGuild);
      });
    }
  }
});
bot.login(process.env.TOKEN);
