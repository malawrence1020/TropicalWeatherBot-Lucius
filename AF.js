var fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  Quotidien : function (channel) {

    num1 = Math.random();
    var french1 = fs.readFileSync('./french.json')
    var french = JSON.parse(french1);
    nouns = french["nouns"];
    verbs = french["verbs"];
    adjectives = french["adjectives"];

    fixed = Math.random()
    mynouns = [];
    myverbs = [];
    myadjectives = [];
    person = french["persons"][Math.floor(Math.random()*french["persons"].length)]
    tense = french["tenses"][Math.floor(Math.pow(fixed,2)*(french["tenses"].length-0.5))]

    misc = "";
    if (Math.random() < 0.3) {misc = french["misc"][Math.floor(Math.random()*french["misc"].length)]}

    for (let n = 0; n < 5; n++) {
      num = Math.floor(Math.random()*french["nouns"].length);
      mynouns.push(french["nouns"][num])
      nouns.splice(num,1);
    }
    for (let v = 0; v < 4; v++) {
      num = Math.floor(Math.random()*french["verbs"].length);
      myverbs.push(french["verbs"][num])
      verbs.splice(num,1);
    }
    for (let a = 0; a < 3; a++) {
      num = Math.floor(Math.random()*french["adjectives"].length);
      myadjectives.push(french["adjectives"][num])
      adjectives.splice(num,1);
    }

    const FrenchEmbed = new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle(`Write \u22655 sentences with the following words, using ${person} and ${tense}${misc}`)
    .addFields(
        {name: `Nouns`, value: `${mynouns.join('\n')}`, inline: true},
        {name: `Verbs`, value: `${myverbs.join('\n')}`, inline: true},
        {name: 'Adjectives', value: `${myadjectives.join('\n')}`, inline: true},
    )
    channel.send(FrenchEmbed)
    console.log(`Français Quotidien ${fixed}`)
  },
}