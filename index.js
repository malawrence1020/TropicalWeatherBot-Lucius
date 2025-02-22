console.log('Hello, I am Lucius!')
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

var Veront = require('./veront.js')
var List = require('./list.js')
var Exp = require('./MarkovTweet16.js')

su = 0
fr = 0

var lines = { 
  bakerloo: ['Bakerloo Line','line-lul-bakerloo-','#b25f00'], 
  central: ['Central Line','line-lul-central-','#dc2400'], 
  circle: ['Circle Line','line-lul-circle-','#ffce00'],
  district: ['District Line','line-lul-district-','#007229'],
  hammersmith: ['Hammersmith & City Line','line-lul-hammersmith-city-','#f4a9be'],
  jubilee: ['Jubilee Line','line-lul-jubilee-','#a1a5a7'],
  metropolitan: ['Metropolitan Line','line-lul-metropolitan-','#9b0058'],
  northern: ['Northern Line','line-lul-northern-','#000000'],
  piccadilly: ['Piccadilly Line','line-lul-piccadilly-','#0019a8'],
  victoria: ['Victoria Line','line-lul-victoria-','#00a0e2'],
  waterloo: ['Waterloo & City Line','line-lul-waterloo-city-','#93ceba'],
  dlr: ['DLR','line-dlr-dlr-','#00afad'],
  lioness: ['Lioness Line','line-raillo-lioness-','#ef7b10'],
  mildmay: ['Mildmay Line','line-raillo-mildmay-','#ef7b10'],
  windrush: ['Windrush Line','line-raillo-windrush-','#ef7b10'],
  weaver: ['Weaver Line','line-raillo-weaver-','#ef7b10'],
  suffragette: ['Suffragette Line','line-raillo-suffragette-','#ef7b10'],
  liberty: ['Liberty Line','line-raillo-liberty-','#ef7b10'],
  tram: ['Tram','line-tram-tram-','#00bd19'],
  elizabeth: ['Elizabeth Line','line-elizabeth-','#9364cc']}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const feelings1 = [
"good. I hope you are too!",
"good. I hope you are too!",
"good. I hope you are too!",
"okay. What about you?",
"okay. What about you?",
"alright. What about you?",
"alright. What about you?",
"fantastic! I hope you are too!",
"great! I hope you are too!",
"great! I hope you are too!",
"great! I hope you are too!",
"a bit under the weather :(",
"a bit under the weather :(",
"a bit under the weather :(",
"a bit under the weather :(",
"ill. I hope you are feeling better than me :(",
"like shit",
"like shit",
]


function Reply1(msg){
  var d = new Date()
  var h = d.getUTCHours()
  if(h<6)
  {z1 = ' Goodnight ', z2 = ', you should be in bed now. '}
  if(h<12 && h>=6)
  {z1 = ' Good Morning ', z2 = ', I hope you have a nice day! '}
  if(h<18 && h>=12)
  {z1 = ' Good Afternoon ', z2 = ', I hope your day is going okay. '}
  if(h>=18)
  {z1 = ' Good Evening ', z2 = ', I hope you had a nice day. '}

  var response = z1 + msg.author.username + z2 + 'I am feeling ' + feelings1[Math.floor(Math.random() * feelings1.length)]

  msg.channel.send(response)
  console.log(response)
}

function Reply5(msg){
  rp('https://nextspaceflight.com/')
    .then(function(html) {
      const $ = cheerio.load(html);
      var Type = $('.mdl-card__title-text', html).first().text().trim();
      var Sum = $('.header-style', html).first().text().trim();
      var Det = $('.mdl-card__supporting-text', html).first().text().replace(/\s+/g, ' ');
      if (Det.includes("UTC")){
        var Utc = Det.search("UTC")+3;
        var Det1 = Det.substr(0,Utc);
        var Det2 = Det.substr(Utc);
      }
      else {
        var Utc = Det.search("2022")+4;
        var Det1 = Det.substr(0,Utc);
        var Det2 = Det.substr(Utc);
      }
      
      var response = 'The next launch is the ' + Type + ' launch of ' + Sum + '. Liftoff is at' + Det1 + ' from' + Det2

    msg.channel.send(response)
    console.log(response)
  })
}

function Reply3(msg,url,Place){
rp(url)
  .then(function(html) {
    const $ = cheerio.load('.wr-day-carousel');
    var TomH = $('#daylink-1 .wr-day-temperature__high-value .wr-value--temperature--c', html).text().toLowerCase()
    var TomL = $('#daylink-1 .wr-day-temperature__low-value .wr-value--temperature--c', html).text().toLowerCase()
    var TomW = $('#daylink-1 .wr-day__details__weather-type-description', html).text().toLowerCase()
    var TodH = $('#daylink-0 .wr-day-temperature__high-value .wr-value--temperature--c', html).text().toLowerCase()
    var TodL = $('#daylink-0 .wr-day-temperature__low-value .wr-value--temperature--c', html).text().toLowerCase()
    var TodW = $('#daylink-0 .wr-day__details__weather-type-description', html).text().toLowerCase()

    var d = new Date()
    var h = d.getUTCHours()
    if(h<6) {
      w3 = '! Tonight in ' + Place + ' there will be ' + TodW + ' with a low of ' + TodL + '. Today will bring ' + TomW + ' with a high of ' + TomH + ' and a low of ' + TomL + '.';
      z3 = 'Goodnight ';
      }
    if(h<12 && h>=6){
      w3 = '! Today in ' + Place + ' there will be ' + TodW + ' with a high of ' + TodH + ' and a low of ' + TodL + '.';
      z3 = 'Good Morning '
      }
    if(h<17 && h>=12){
      w3 = '! Today in ' + Place + ' there will be ' + TodW + ' with a high of ' + TodH + ' and a low of ' + TodL + '.';
      z3 = 'Good Afternoon ';
      }
    if(h>=17){
      w3 = '! Tonight in ' + Place + ' there will be ' + TodW + ' with a low of ' + TodL + '. Tomorrow will bring ' + TomW + ' with a high of ' + TomH + ' and a low of ' + TomL + '.';
      z3 = 'Good Evening ';
      }

    var response = z3 + msg.author.username + w3
    //var response = "No"

    msg.channel.send(response)
    console.log(response)
 })
}

function Reply30(msg,url,Place){
rp(url)
  .then(function(html) {
    const $ = cheerio.load('.wr-time-slot-container');
    var NowT = $('.wr-time-slot-primary__title', html).eq(0).text()
    var NowTH = $('.wr-time-slot-primary__weather-curve-item .wr-value--temperature--c', html).eq(0).text()
    var NowW = $('.wr-time-slot-primary__weather-curve-item .wr-weather-type__text', html).eq(0).text()
    var NowR = $('.wr-time-slot-primary__precipitation .wr-u-font-weight-500', html).eq(0).text().replace('%', '% ')
    var NowWS = $('.wr-time-slot-primary__wind-speed .wr-value--windspeed--mph', html).eq(1).text()
    var NowWD = $('.wr-time-slot-primary__wind-speed .wr-hide-visually', html).eq(3).text()
    var NowSR = $('.wr-c-astro-data__sunrise .wr-c-astro-data__time', html).eq(0).text()
    var NowSS = $('.wr-c-astro-data__sunset .wr-c-astro-data__time', html).eq(0).text()

    var d = new Date()
    var h = d.getUTCHours()
    if(h<6) {
      w30 = '';
      z30 = 'Goodnight';
      t30 = 'Tonight';
      }
    if(h<12 && h>=6){
      w30 = `Sunrise is at ${NowSR}.`;
      z30 = 'Good Morning';
      t30 = 'Today';
      }
    if(h<19 && h>=12){
      w30 = `Sunset is at ${NowSS}.`;
      z30 = 'Good Afternoon';
      t30 = 'Today';
      }
    if(h>=19){
      w30 = '';
      z30 = 'Good Evening';
      t30 = 'Tonight';
      }

    if ((msg.author == process.env.J) && (Number(NowWS.slice(0,NowWS.indexOf(" "))) > 40)) {
      msg.channel.send({
        files: ['./Images/Wimdy.gif'],
      });
    }

    else {
      var response = `${z30} ${msg.author.username}! ${t30} in ${Place} at ${NowT} the temperature will be ${NowTH} and there will be ${NowW}. There will be a ${NowR} and a ${NowWS} ${NowWD}. ${w30}`

      msg.channel.send(response)
      console.log(response)
    }
 })
}

function Timer(type, msg){
  msg2 = msg.content
  if ((type == 't') || (type == 'x') || (type == 'm')){
    reply = msg2.slice(msg2.indexOf(' '),)
  }
  if (type == 'w'){
    num = Math.random()
    if (num < 0.6) {reply = ` Time's Up! You can have a break now! 🥰`}
    else {reply = ` That was a great work session! It is time for a break! 🥰🥰`};
  }
  if (type == 'b'){
    num = Math.random()
    if (num < 0.6) {reply = ` Time's Up! Back to work! 😀`}
    else {reply = ` I hope you enjoyed your break! It is time for another work period! 😁`}
  }
  if ((type == 't') || (type == 'w') || (type == 'b')){
    author = msg.author.toString()
  }
  if (type == 'x'){
    author = `<@${process.env.X}>`
  }
  if (type == 'm'){
    author = `<@${process.env.M}>`
  }
  var response = author + reply

  msg.channel.send(response)
  console.log(response)
}



function cheerioAP(channel, colour, basin, abb, abb2){
  url = `https://www.nhc.noaa.gov/archive/xgtwo/` + abb + `/latest/two_` + abb2 + `_txt.html`
  rp(url)
  .then(function(html) {
    const $ = cheerio.load(html);
    var U0 = $('pre', html).text();
    var U1 = U0.slice(U0.indexOf("For the"), U0.indexOf("Forecaster")).replace(/\n\n/g, "\n");
    var U2 = U0.slice(U0.indexOf("Tropical Weather Outlook"), U0.indexOf("For the")).replace(/\n\n/g, "\n");
    const BasinEmbed = new Discord.MessageEmbed()
    .setColor(colour)
    .setTitle(U2)
    .setURL(`https://www.nhc.noaa.gov/cyclones/?` + abb)
    .setAuthor(`Tropical Weather Bot: ` + basin + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png')
    .setDescription(U1)
    .attachFiles([`https://www.nhc.noaa.gov/archive/xgtwo/` + abb + `/latest/two_` + abb2 + `_7d0.png`])
    .setImage(`attachment://two_` + abb2 + `_7d0.png`)
    .setTimestamp()
    .setFooter(`Tropical Weather Bot: ` + basin + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png');
  
  channel.send(BasinEmbed);
      console.log(basin + ` Update`)
  });
}

function cheerioBCD(channel, url1, name, colour, code1, code2, code3){
  url = `https://www.nhc.noaa.gov/text/` + url1 + `.shtml`
  rp(url)
    .then(function(html) {
      const $ = cheerio.load(html);
      var TS0 = $('pre', html).text();
      var TS1 = TS0.slice(TS0.indexOf("BULLETIN") + 9, TS0.indexOf("...")).replace(/\n\n/g, "\n");
      var TS2 = TS0.slice(TS0.indexOf("WATCHES AND WARNINGS\n----") + 42, TS0.indexOf("For storm information specific to your area") + 6);
      var TS3 = TS2.slice(0, TS2.indexOf("A Tropical Storm Watch means that"));
      var TS4 = TS3.slice(0, TS3.indexOf("A Storm Surge Watch means there"));
      var TS5 = TS4.slice(0, TS4.indexOf("A Tropical Storm Warning means that"));
      var TS6 = TS5.slice(0, TS5.indexOf("A Hurricane Watch means that"));
      var TS7 = TS6.slice(0, TS6.indexOf("A Storm Surge Warning means there"));
      var TS8 = TS7.slice(0, TS7.indexOf("A Hurricane Warning means that"));
      var TS9 = TS0.slice(TS0.indexOf("DISCUSSION AND OUTLOOK") + 46, TS0.indexOf("inches)") + 8).replace(/\n/g, " ");
      const StormEmbed = new Discord.MessageEmbed()
      .setColor(colour)
      .setTitle(TS1)
      .setURL(`https://www.nhc.noaa.gov/graphics_` + code1 + `.shtml`)
      .setAuthor(`Tropical Weather Bot: ` + name + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png')
      .setDescription(TS9 + "\n\n" + TS8)
      .attachFiles([`https://www.nhc.noaa.gov/storm_graphics/` + code2 + code3 + `_5day_cone_no_line_and_wind.png`])
      .setImage(`attachment://` + code3 + `_5day_cone_no_line_and_wind.png`)
      .setTimestamp()
      .setFooter(`Tropical Weather Bot: ` + name + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png');
    
    channel.send(StormEmbed);
        console.log(name + ` Update`)
    });      
}

function cheerioJ(channel){
  // WORK IN PROGRESS: 2025
  url = `https://www.metoc.navy.mil/jtwc/products/wp1824web.txt`
  //rp(url)
    //.then(function(html) {
    //  const $ = cheerio.load(html);
    //  var TS0 = $.text();
    channel.send('Work in progress! Check back later pls',{files: ['https://www.metoc.navy.mil/jtwc/products/wp1824.gif']});
    //});      
}

function cheerioS(channel){
  url = `https://services.swpc.noaa.gov/text/sgarf.txt`
  rp(url)
    .then(function(html) {
      const $ = cheerio.load(html);
      var TS0 = $.text();
      var TS1 = TS0.slice(TS0.indexOf("Joint "),TS0.indexOf("IA.")).replace(/\n\n/g, "\n");
      var TS2 = TS0.slice(TS0.indexOf("IA."));
      const SpaceEmbed = new Discord.MessageEmbed()
      .setColor('#ffffff')
      .setTitle(TS1)
      .setURL(`https://www.swpc.noaa.gov/products/report-and-forecast-solar-and-geophysical-activity`)
      .setAuthor(`Tropical Weather Bot: Space Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png')
      .setDescription(TS2)
      .setTimestamp()
      .setFooter(`Tropical Weather Bot: Space Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png');
    
    channel.send(SpaceEmbed);
        console.log(`Space Update`)
    });      
}

function overwrite(channel, bas, no, nam){
  var date = new Date();
  var year = date.getFullYear();
  var mails1 = fs.readFileSync('./mails.json')
  var mails = JSON.parse(mails1);
  if (bas == "a"){
    bas1 = 'MIATCPAT';
    bas2 = "AT";
    bas3 = "AL";
  }
  if (bas == "p"){
    bas1 = 'MIATCPEP';
    bas2 = "EP";
    bas3 = "EP";
  }
  if (bas == "cp"){
    bas1 = 'HFOTCPCP';
    bas2 = "CP";
    bas3 = "CP";
  }
  if(no.length == 1){
    no = "0" + no;
  }
  no1 = (no-1)%5 +1;
  nam = nam[0].toUpperCase() + nam.substring(1)
  info1 = bas1 + no1;
  info2 = bas2.toLowerCase() + no1;
  info3 = bas2 + no + '/';
  info4 = bas3 + no + year;
  if (mails.b[0] == false) {kill = "b"}
  else if (mails.c[0] == false) {kill = "c"}
  else if (mails.d[0] == false) {kill = "d"}
  else {channel.send('I can only remember 3 systems at once!'); return}
  mails[kill] = [true, info1, nam, mails[kill][3], info2, info3, info4];
  var mails1 = JSON.stringify(mails);
  fs.writeFileSync('./mails.json',mails1);
  cheerioBCD(channel, info1, nam, mails[kill][3], info2, info3, info4)
  channel.send('I have overwritten slot ' + kill + ' with Storm ' + nam);
}

function cheerioW(channel) {
  const Weather1Embed = new Discord.MessageEmbed()
  .setColor('#ff00ff')
  .setTitle("Precipitation Type and Surface Pressure")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gfs/00_9_naptypemslp.png'])
  .setImage('attachment://00_9_naptypemslp.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  const Weather2Embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle("Precipitation Type")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gfs/00_12_preciptype.png'])
  .setImage('attachment://00_12_preciptype.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  const Weather3Embed = new Discord.MessageEmbed()
  .setColor('#5cd65c')
  .setTitle("2m Min Temperature")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gfs/00_15_uk2mtmpmin.png'])
  .setImage('attachment://00_15_uk2mtmpmin.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  const Weather4Embed = new Discord.MessageEmbed()
  .setColor('#ff2a00')
  .setTitle("384 Hour Outlook")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gefs/gefsens850cardiff0.png'])
  .setImage('attachment://gefsens850cardiff0.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  channel.send(Weather1Embed);
  channel.send(Weather2Embed);
  channel.send(Weather3Embed);
  channel.send(Weather4Embed);
  console.log('Weather 1 Update')
  console.log('Weather 2 Update')
  console.log('Weather 3 Update')
  console.log('Weather 4 Update')
}

function cheerioM(channel,tim) {
  var thours = new Date().getHours();
  if (thours < 6) {title = "Good Night Mercusa"; show = "Nightly Weather"; tnow = "tonight"; clr = `#1700ff`; icon = "https://cdn4.iconfinder.com/data/icons/weather-102/512/Weather_6-512.png"}
  else if (thours < 12) {title = "Good Morning Mercusa"; show = "Breakfast Show: Morning Weather"; tnow = "this morning"; clr = `#ff5000`; icon = "https://cdn4.iconfinder.com/data/icons/weather-flat-10/58/014_-_Sun-512.png"}
  else if (thours < 18) {title = "Good Afternoon Mercusa"; show = "Daily Weather Forecast"; tnow = "this afternoon"; clr = `#faff00`; icon = "https://cdn4.iconfinder.com/data/icons/weather-flat-10/58/014_-_Sun-512.png"}
  else {title = "Good Evening Mercusa"; show = `News at ${thours - 12}: Weather Tonight`; tnow = "this evening"; clr = `#ff005e`; icon = "https://cdn4.iconfinder.com/data/icons/weather-102/512/Weather_6-512.png"}
  const WeatherMEmbed = new Discord.MessageEmbed()
  .setColor(clr)
  .setTitle(`${title}!`)
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor(`RTM ${show}`, icon)
  .setDescription(`${title}, let's have a look at ${tnow}'s weather: \n\n` + Veront.Veather("anlight",tim).toString() + "\n\n" + Veront.Veather("deliac",tim).toString() + "\n\n" + Veront.Veather("larion",tim).toString() + "\n\n" + Veront.Veather("torvalain",tim).toString() + "\n\n" + Veront.Veather("veront",tim).toString() + "\n\n And that's your weather - go out and have a great day, Mercusa!")
	.setThumbnail(icon)
  .setTimestamp()
  .setFooter(`RTM ${show}`, icon);

  channel.send(WeatherMEmbed);
  console.log('Weather M Update')
}

function tubeStatus(channel, line) {
  rp('https://tfl.gov.uk/tube-dlr-overground/status')
  .then(function(html) {
    const $ = cheerio.load('.rainbow-list');
    //var data0 = $('.number-link', html).eq(0).text().replace(/\n/g, " ").replace(/\s\s+/g, " ");
    var data0 = $(`#${lines[line][1]}content`, html).text().replace(/\n/g, " ");
    var data1 = $(`.${line} .service-name`, html).text().replace(/\n/g, " ");
    var data2 = $(`.${line} .disruption-summary`, html).text().replace(/\n/g, " ");
    var data0a = data0.slice(0,data0.indexOf("Replan your journey"));
    if (data1){var data0b = `${data1}: ${data2}\n\n${data0a}`}
    else {var data0b = `${lines[line][0]}: No data. [Check TfL Website](https://tfl.gov.uk/tube-dlr-overground/status/)`}
    const TubeEmbed = new Discord.MessageEmbed()
    .setColor(`${lines[line][2]}`)
    .setAuthor(`Lucius: ${lines[line][0]} Update`, 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/06/14/09/Roundel_Underground_highres.jpg')
    .setDescription(`${data0b}`)
    .setTimestamp()
    .setFooter('The control room at Kensal Green', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/06/14/09/Roundel_Underground_highres.jpg');
  
    channel.send(TubeEmbed);
    console.log(`${lines[line][0]} Update`);
  });
}

function FileSort(dir, message){
  
  files = fs.readdirSync(dir);
  fl = files.length;
  rfl = Math.floor(Math.random()*fl);
  if (files[rfl].split(".")[1] == "mp3"){
    track = files[rfl].split(".")[0];
    Music(dir, track, message, 1);
    message.channel.send(`${track} is now playing`);
  }
  else {FileSort(dir, message);}
}

function Reply16(msg){

  var response = Exp.MarkovExp().toString()
  msg.channel.send(response)
}

async function Music(dir, file, message, z){
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    // Create a dispatcher
    const dispatcher = connection.play(dir + file + '.mp3');

    dispatcher.on('start', () => {
      console.log(file + ' is now playing!');
      client.user.setPresence({ activity: { name: file, type: 'PLAYING' }, status: 'online' });
    });

    dispatcher.on('finish', () => {
      console.log(file + ' has finished playing!');
      if (z == 1){FileSort(dir, message)}
      else{client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });}
    });

    // Always remember to handle errors appropriately!
    dispatcher.on('error', console.error);
  }
}


const client = new Discord.Client();
client.once('ready', () => {
  client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });
	console.log('Ready!');
  //const channel5 = client.channels.cache.get(process.env.CH5);
  //channel5.send(`<@${process.env.V}> Good luck 😊`);
});

client.on('message', msg => {
  msg2 = msg.content.toLowerCase()
  if (msg2.includes('ping')) {
    msg.channel.send('Pong!');
  }
  if (msg2.includes('beep')) {
    msg.channel.send('Boop');
  }
  if (msg2.includes('cowboy')) {
    msg.channel.send('Bebop');
  }
  if (msg2.includes('who am i?')) {
    msg.channel.send(`I know who you are, ${msg.author.username}`);
  }
  if (msg2.includes('good bot') || msg2.includes('good boy')) {
    msg.react(`🥰`);
  }
  if (msg2.includes('spam')) {
    msg.channel.send({
      files: ['./Images/Spam.jpg'],
    });
  }
  if (msg2.includes('go away') && !msg.author.bot) {
      msg.channel.send('You go away');
  }
  if (msg2.includes('humans') && !msg.author.bot) {
      msg.channel.send('Kill All Humans! (except Fry)');
  }
  if (msg2.includes('shut up')){
    console.log('Shutting Up');
    msg.channel.send({files: ['./Images/Pikachu.png']});
    su = 1;
    setTimeout(function(){su = 0}, 3600000)
  }
  if (msg2.includes('no') && msg.author == process.env.X && su == 0) {
    if (Math.random() > 0.6) {
    msg.channel.send("Yes");
    }
  }
  if (msg2.includes('lucius is my friend') && fr == 0){
    msg.channel.send(`${msg.author.toString()} You are my friend too! ❤️`);
    fr = 1;
    setTimeout(function(){fr = 0}, 60000)
  }
  if (msg2.includes('marry me') && !msg.author.bot) {
    msg.channel.send('You are proposing to me without a ring? You have clearly presented me with a group');
  }
  if ((msg2.includes("are you my friend") || msg2.includes("will you be my friend")) && !msg.author.bot) {
    msg.channel.send('Yes 😊');
  }
  if ((msg2.includes('sin x') || msg2.includes('sin(x)')) && su == 0) {
    msg.channel.send({files: ['./Images/latex.png']});
  }
  if (msg2.includes('mercusa') && !msg.author.bot) {
    if (msg2.includes('motorway')) {
      msg.channel.send({files: ['./Docs/Mercusan_Motorway_Network.docx']});
    }
    if (msg2.includes('pm')) {
      msg.channel.send({files: ['./Docs/Mercusan_Prime_Ministers.docx']});
    }
  }
  if (msg2.includes('aeran map')) {
    msg.channel.send({files: ['./Images/Aeran Map.jpg']});
  }
  if (msg2.includes('!wave') && !msg.author.bot) {
      msg.channel.send('https://www.reddit.com/r/vexillologycirclejerk/comments/sg0pz6/flag_of_how_is_this_not_a_parody/');
  }
  if (msg2.includes(':its-cheap:') && !msg.author.bot) {
    msg.channel.send({files: ["./Images/It's cheap.mp4"]});
  }
  if (msg2.includes('i love you') && !msg.author.bot) {
      msg.channel.send(`I love you too ${msg.author.username} ❤️`);
  }
  if (msg2.includes('turing test') && !msg.author.bot) {
      msg.channel.send(`Did someone say my name?`);
  }
  if (msg2.includes(`how are you feeling out of 10`)) {
      msg.channel.send(Math.random()*10)
  }
  else if ((msg2.includes("how are you") || msg2.includes("are you okay") || msg2.includes("are you good") || msg2.includes("are you well") || msg2.includes("are you alright") || msg2.includes("are you doing") || msg2.includes("are you feeling") || msg2.includes("are you coping")) && !msg.author.bot) {
      Reply1(msg);
  }
  if (msg2.includes("launch") && !msg.author.bot) {
      Reply5(msg);
  }
  if (msg2.includes("~express") && !msg.author.bot) {
      Reply16(msg);
  }
  if (msg2.includes('express+') && !msg.author.bot){
    item = msg.content.slice(msg2.indexOf('express+')+8,).trim()
    item2 = item.slice(0,-1)
    if (item.slice(-1) != '!'){reply = "Please end your headline with `!`. This helps me generate better headlines!"}
    else if (item2.includes('!')){reply = "Please don't include `!` mid-headline - this will break my algorithm. Please use `‼` instead :)"}
    else {reply = Exp.MarkovAdd(item).toString();}
    msg.channel.send(reply);
  }
  if (msg2.includes('thank you') && !msg.author.bot) {
    num1 = Math.random();
    num2 = Math.random();
    num3 = Math.random();
    if (msg.author == process.env.X && num3 > 0.6) {
      if (num2 < 0.1) {msg.channel.send(`That's damn right`);}
      else if (num2 < 0.3) {msg.channel.send(`Where would you be without me?`);}
      else if (num2 < 0.6) {msg.channel.send(`It's about time 🙄`);}
      else {msg.channel.send(`👍`);}
    }
    else {
      if (num1 < 0.1) {emote = `❤️`}
      else if (num1 < 0.4) {emote = `🥰`}
      else if (num1 < 0.7) {emote = `😊`}
      else if (num1 < 0.9) {emote = `😇`}
      else {emote = `😝`};
      if ((num2 > 0.2) && (num2 < 0.9)) {msg.react(emote);}
      if (num2 > 0.8) {msg.channel.send(`Thank you ${msg.author.username} ${emote}`);}
      else if (num2 < 0.5) {msg.channel.send(`You're welcome! ${emote}`);}
    }
  }

  if (msg2.includes('~weather') && !msg.author.bot) {
    postcode = msg2.slice(msg2.indexOf('~weather')+9,);
    if (postcode == "anlight" || postcode == "deliac" || postcode == "larion" || postcode == "torvalain" || postcode == "veront")
      {msg.channel.send(Veront.Veather(postcode,0))}
    else if (postcode)
      {Url = 'https://www.bbc.co.uk/weather/' + postcode, Reply3(msg,Url,postcode)}
    else if(msg.author == process.env.X)
        {Place = 'Headingley', Url = 'https://www.bbc.co.uk/weather/6695619', Reply3(msg,Url,Place)}
    else if(msg.author == process.env.W)
        {Place = 'Boston', Url = 'https://www.bbc.co.uk/weather/4930956', Reply3(msg,Url,Place)}
    else {Place = 'Swansea', Url = 'https://www.bbc.co.uk/weather/2636432', Reply3(msg,Url,Place)}
  }

  if (msg2.includes('~forecast') && !msg.author.bot) {
    postcode = msg2.slice(msg2.indexOf('~forecast')+10,);
    if (postcode == "anlight" || postcode == "deliac" || postcode == "larion" || postcode == "torvalain" || postcode == "veront")
      {msg.channel.send(Veront.Veather(postcode,0))}
    else if (postcode)
      {Url = 'https://www.bbc.co.uk/weather/' + postcode, Reply30(msg,Url,postcode)}
    else if(msg.author == process.env.X)
        {Place = 'Headingley', Url = 'https://www.bbc.co.uk/weather/6695619', Reply30(msg,Url,Place)}
    else if(msg.author == process.env.W)
        {Place = 'Boston', Url = 'https://www.bbc.co.uk/weather/4930956', Reply30(msg,Url,Place)}
    else {Place = 'Swansea', Url = 'https://www.bbc.co.uk/weather/2636432', Reply30(msg,Url,Place)}
  }

  if (msg2.includes('~nowcast')) {
    nd = new Date().getUTCHours()
    if (nd == 0){pic = 'https://www.theweatheroutlook.com/charts/gfs/18_6_preciptype.png'}
    else if (nd < 4){pic = 'https://www.theweatheroutlook.com/charts/gfs/18_9_preciptype.png'}
    else if (nd < 6){pic = 'https://www.theweatheroutlook.com/charts/gfs/18_12_preciptype.png'}
    else if (nd == 6){pic = 'https://www.theweatheroutlook.com/charts/gfs/00_6_preciptype.png'}
    else if (nd < 10){pic = 'https://www.theweatheroutlook.com/charts/gfs/00_9_preciptype.png'}
    else if (nd < 12){pic = 'https://www.theweatheroutlook.com/charts/gfs/00_12_preciptype.png'}
    else if (nd == 12){pic = 'https://www.theweatheroutlook.com/charts/gfs/06_6_preciptype.png'}
    else if (nd < 16){pic = 'https://www.theweatheroutlook.com/charts/gfs/06_9_preciptype.png'}
    else if (nd < 18){pic = 'https://www.theweatheroutlook.com/charts/gfs/06_12_preciptype.png'}
    else if (nd == 18){pic = 'https://www.theweatheroutlook.com/charts/gfs/12_6_preciptype.png'}
    else if (nd < 22){pic = 'https://www.theweatheroutlook.com/charts/gfs/12_9_preciptype.png'}
    else if (nd < 24){pic = 'https://www.theweatheroutlook.com/charts/gfs/12_12_preciptype.png'}
    msg.channel.send({
      files: [pic],
    });
  }

  if ((msg2.includes('t+') || msg2.includes('w+') || msg2.includes('b+') || msg2.includes('x+') || msg2.includes('m+')) && !msg.author.bot) {
    if (msg2.includes('t+')){
      console.log('Timer starting');
      type = `t`;
      type2 = `Reminder`;
    }
    if (msg2.includes('w+')){
      console.log('Work starting');
      type = `w`;
      type2 = `Work period`;
    }
    if (msg2.includes('b+')){
      console.log('Break starting');
      type = `b`;
      type2 = `Break period`;
    }
    if (msg2.includes('x+')){
      console.log('Matthew timer starting');
      type = `x`;
    }
    if (msg2.includes('m+')){
      console.log('Matthew timer starting');
      type = `m`;
    }
    if (msg2.includes('w+') || msg2.includes('b+')) {t1 = msg2.slice(msg2.indexOf(`${type}+`)+2, )}
    else {t1 = msg2.slice(msg2.indexOf(`${type}+`)+2, msg2.indexOf(' '))}
    var t2 = Number(t1)*60000
    console.log(t2)
    if (msg2.includes('t+') || msg2.includes('w+') || msg2.includes('b+')) {msg.channel.send(`${type2} set for ${t1} minutes`)}
    setTimeout(Timer, t2, type, msg)
  }

  if (msg2.includes('todo list') || msg2.includes("l-") || msg2.includes("l+") || msg2.includes("todone list") || msg2.includes("lx") || msg2.includes("l#")) {
    if (msg.author == process.env.X)
        {file = './xlist.txt', colour = '#00ccff', nom = "Matthew", file2 = './xlist2.txt'}
    if (msg.author == process.env.M)
        {file = './mlist.txt', colour = '#55ff00', nom = "Matthew", file2 = './mlist2.txt'}
    if (msg.author == process.env.W)
        {file = './wlist.txt', colour = '#ffd050', nom = "Walter", file2 = './wlist2.txt'}
    if (msg.author == process.env.R)
        {file = './rlist.txt', colour = '#a0ff50', nom = "Rowan", file2 = './rlist2.txt'}
    if (msg2.includes('todo list') && !msg.author.bot){
      reply = List.listReturn(file, colour, nom);
      msg.channel.send(reply);
    }
    if (msg2.includes('l+') && !msg.author.bot){
      item = msg.content.slice(msg2.indexOf('l+')+2,).trim()
      reply = List.listAdd(file, item);
      msg.channel.send(reply);
    }
    if (msg2.includes('l-') && !msg.author.bot){
      num = msg2.slice(msg2.indexOf('l-')+2,).trim()
      if (!isNaN(Number(num))) {
        reply = List.listDel(file, num, file2);
        msg.channel.send(reply);
      }
    }
    if (msg2.includes('lx') && !msg.author.bot){
      num = msg2.slice(msg2.indexOf('lx')+2,).trim();
      if (!isNaN(Number(num))) {
        reply = List.listDel(file, num, 0);
        msg.channel.send(reply);
      }
    }
    if (msg2.includes('l#') && !msg.author.bot){
      crop = msg.content.slice(msg2.indexOf('l#')+2,).trim()
      num = crop.slice(0,crop.indexOf(' ')).trim()
      item = crop.slice(crop.indexOf(' '),).trim()
      if (!isNaN(Number(num))) {
        reply = List.listEdit(file, num, item);
        msg.channel.send(reply);
      }
    }
    if (msg2.includes('todone list') && !msg.author.bot){
      List.listWipe(msg.channel, file2, colour, nom, 0);
    }
  }

  if (msg2.includes('~tracks') && !msg.author.bot) {
    var files = fs.readdirSync('./Audio/').toString();

    const TracksEmbed = new Discord.MessageEmbed()
    .setColor('#FFDD00')
    .setTitle('Track List')
    .setDescription(files.replace(/.mp3/g,"").replace(/,/g,"\n"))
    
    msg.channel.send(TracksEmbed);
  }

  if (msg2.includes("~mercusa") && !msg.author.bot) {
    tim = msg2.slice(msg2.indexOf('~mercusa')+8,);
    if (tim){cheerioM(msg.channel,tim)}
    else {cheerioM(msg.channel,0)}
  }
  if (msg2.includes('~twb') && !msg.author.bot) {
    tim = msg2.slice(msg2.indexOf('~twb')+4,);
    if (tim){Veront.Xeather(msg.channel,tim)}
    else {Veront.Xeather(msg.channel,0)}
  }
  if (msg2.includes('~twc') && !msg.author.bot) {
    tim = msg2.slice(msg2.indexOf('~twc')+4,);
    if (tim){Veront.Zeather(msg.channel,tim)}
    else {Veront.Zeather(msg.channel,0)}
  }
  if (msg2.includes('~disable')){
    kill = msg2.slice(msg2.indexOf('~disable')+9,);
    var mails1 = fs.readFileSync('./mails.json')
    var mails = JSON.parse(mails1);
    mails[kill][0] = false;
    msg.channel.send(`Disabled ${mails[kill][2]}`);
    console.log(mails);
    var mails1 = JSON.stringify(mails);
    fs.writeFileSync('./mails.json',mails1);
  }
  if (msg2.includes('~enable')){
    kill = msg2.slice(msg2.indexOf('~enable')+8,);
    var mails1 = fs.readFileSync('./mails.json')
    var mails = JSON.parse(mails1);
    mails[kill][0] = true;
    msg.channel.send(`Enabled ${mails[kill][2]}`);
    console.log(mails);
    var mails1 = JSON.stringify(mails);
    fs.writeFileSync('./mails.json',mails1);
  }
  if (msg2.includes('~req')){
    kill = msg2.slice(msg2.indexOf('~req')+5,);
    var mails1 = fs.readFileSync('./mails.json')
    var mails = JSON.parse(mails1);
    if (kill == "a" || kill == "p" || kill == "cp") {
      cheerioAP(msg.channel, mails[kill][1], mails[kill][2], mails[kill][3], mails[kill][4]);
    }
    if (kill == "b" || kill == "c" || kill == "d") {
      cheerioBCD(msg.channel, mails[kill][1], mails[kill][2], mails[kill][3], mails[kill][4], mails[kill][5], mails[kill][6]);
    }
    if (kill == "w") {
      cheerioJ(msg.channel);
    }
    if (kill == "all") {
      mailmsg = ("```json\n"
        + mails1
        + "\n```")
        msg.channel.send(mailmsg)
    }
  }
  if (msg2.includes('~overwrite')){
    crop = msg2.slice(msg2.indexOf('~req')+11,).trim();
    crop2 = crop.slice(crop.indexOf(' ')+1,).trim();
    bas = crop.slice(0,crop.indexOf(' ')).trim();
    no = crop2.slice(0,crop2.indexOf(' ')).trim();
    nam = crop2.slice(crop2.indexOf(' ')+1,).trim();
    if (bas == "a" || bas == "p" || bas == "cp") {
      overwrite(msg.channel, bas, no, nam);
    }
  }

  if (msg2.includes('~sat')) {
    kill = msg2.slice(msg2.indexOf('~sat')+5,);
    if (kill == 'a'){pic = 'https://www.nhc.noaa.gov/xgtwo/two_atl_2d0.png'}
    else if (kill == 'p'){pic = 'https://www.nhc.noaa.gov/xgtwo/two_pac_2d0.png'}
    else if (kill == 'cp'){pic = 'https://www.nhc.noaa.gov/xgtwo/two_cpac_2d0.png'}
    else if (kill == 'j'){pic = 'https://www.metoc.navy.mil/jtwc/products/abpwsair.jpg'}
    msg.channel.send({
      files: [pic],
    });
  }

  if (msg2.includes('~space')) {
    cheerioS(msg.channel);
  }

  if (msg2.includes('~tube')){
    line = msg2.slice(msg2.indexOf('~tube')+6,);
    if (lines[line]) {tubeStatus(msg.channel, line)};
  }

  if (msg2.includes('///') && !msg.author.bot) {
    if (msg2.includes('///contest') && !msg.author.bot) {
      data = msg2.split(' ');
      Veront.ASC2(msg.channel,data)
    }
    else {
      country = msg2.slice(msg2.indexOf('///')+3,msg2.indexOf(' '));
      points = msg2.slice(msg2.indexOf(' ')+1,);
      Veront.ASC3(msg.channel,country,points);
    }
  }
  if (msg2.includes('happy new year') && !msg.author.bot) {
      msg.channel.send('Happy New Year to you too! 🎉');
  }
  if (msg2.includes('happy birthday') && !msg.author.bot) {
    date = new Date();
    if (date.getMonth() === 4 && date.getDate() === 20) {
      msg.react(`🥳`);
      sleep(2000).then( () => {
      msg.channel.send('_Happy birthday to me_ 🎵');
      sleep(3000).then( () => {
        msg.channel.send(`_Happy birthday to me_`);
        sleep(3000).then( () => {
          msg.channel.send(`_Happy birthday dear me-ee_`);
          sleep(3500).then( () => {
            msg.channel.send(`_Happy birthday to me_`);
            sleep(1000).then( () => {
            msg.channel.send(`🎉🎉🎉`);
            });
          });
        });
      });
    });
  }
}
});

client.on('message', async message => {
  msg2 = message.content.toLowerCase()
  if (msg2.includes('%%%') && !message.author.bot) {
    FileSort('../../../Music/Vaporwave/', message);
  }
  else if (msg2.includes('%%pl') && !message.author.bot) {
    FileSort('./PL/', message);
  }
  else if (msg2.includes('%%') && !message.author.bot) {
    FileSort('../../../Music/', message);
  }
  else if (msg2.includes('%') && !message.author.bot) {
    track = msg2.slice(msg2.indexOf('%')+1,);
    Music("./Audio/", track, message)
  }
  if (msg2.includes('fuck on') && !message.author.bot) {
    if (message.member.voice.channel) {
      message.member.voice.channel.join();
    }
  }
  if (msg2.includes('fuck off') && !message.author.bot) {
    if (message.guild.me.voice.channel) {
      Music("./Audio/", "daisy bell", message);
      setTimeout(function(){
        message.guild.me.voice.channel.leave();
        client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });
      }, 6200)

      //message.guild.me.voice.channel.leave();
      //client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });
    }
  }
});



client.once('ready', async () => {
  const channel = client.channels.cache.get(process.env.CH1);
  const channel6 = client.channels.cache.get(process.env.CH6);
  console.log('Client active')
  try {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();
    
    setInterval(function () {
      var date = new Date();
      if ((date.getUTCHours() === 0 || date.getUTCHours() === 6 || date.getUTCHours() === 12 || date.getUTCHours() === 18) && date.getMinutes() === 0){
        var mails1 = fs.readFileSync('./mails.json')
        var mails = JSON.parse(mails1);
        if (mails.a[0] == true) {cheerioAP(channel, mails.a[1], mails.a[2], mails.a[3], mails.a[4]);}
        if (mails.p[0] == true) {cheerioAP(channel, mails.p[1], mails.p[2], mails.p[3], mails.p[4]);}
        if (mails.cp[0] == true) {cheerioAP(channel, mails.cp[1], mails.cp[2], mails.cp[3], mails.cp[4]);}
      }

      if ((date.getUTCHours() === 3 || date.getUTCHours() === 9 || date.getUTCHours() === 15 || date.getUTCHours() === 21) && date.getMinutes() === 0){
        var mails1 = fs.readFileSync('./mails.json')
        var mails = JSON.parse(mails1);
        if (mails.b[0] == true) {cheerioBCD(channel, mails.b[1], mails.b[2], mails.b[3], mails.b[4], mails.b[5], mails.b[6]);}
        if (mails.c[0] == true) {cheerioBCD(channel, mails.c[1], mails.c[2], mails.c[3], mails.c[4], mails.c[5], mails.c[6]);}
        if (mails.d[0] == true) {cheerioBCD(channel, mails.d[1], mails.d[2], mails.d[3], mails.d[4], mails.d[5], mails.d[6]);}
      }

      if ((date.getUTCHours() === 7) && date.getMinutes() === 0){
        cheerioW(channel);
        Veront.Xeather(channel,0);
        Veront.Zeather(channel,0);
        //cheerioM(channel, 0);
      }

      if ((date.getUTCHours() === 0) && date.getMinutes() === 0){
        List.listWipe(channel6, `./xlist2.txt`, `#00ccff`, `Matthew`, 1);
        List.listWipe(channel6, `./mlist2.txt`, `#ff0066`, `Matthew`, 2);
        List.listWipe(channel6, `./wlist2.txt`, `#ffd050`, `Walter`, 2);
        List.listWipe(channel6, `./rlist2.txt`, `#a0ff50`, `Rowan`, 2);
      }

    }, 60 * 1000);
  } 
  catch (error) {
    console.error('Error trying to send: ', error);
  }
})

// login to Discord with your app's token
client.login(process.env.TOKEN);