module.exports = {
    Veather : function (loc, tim) {
      if (tim == 0) {var t1 = new Date()}
      else {var t1 = new Date(tim)}
      console.log(t1)
      var time = (t1 - 1642651200000)/1000;
      t2 = [time]
      t3 = ["now"]
      if (t1.getHours() < 6) {tday = t1.getDate() - 1}
      else {tday = t1.getDate()}
      
      for (let i = 0; i < 24; i++) {
        if (i < 18) {
        td = i + 6
        t2.push((new Date(t1.getFullYear(),t1.getMonth(),tday, td, 0, 0) - 1642651200000)/1000);
        t3.push(td)
        }
        else {
        td = (i + 6) % 24
        t2.push((new Date(t1.getFullYear(),t1.getMonth(),tday + 1, td, 0, 0) - 1642651200000)/1000);
        t3.push(td)
        }
      }

      temps = []
      for (let j = 0; j < 25; j++) {

      //Locations
      if (loc == "anlight") {
        place = "Anlight"
        m = 312
        n = 223
      }
      if (loc == "deliac") {
        place = "Deliac"
        m = 430
        n = 456
      }
      if (loc == "larion") {
        place = "Larion"
        m = 139
        n = 70
      }
      if (loc == "torvalain") {
        place = "Torvalain City"
        m = 212
        n = 314
      }
      if (loc == "veront") {
        place = "Port Veront"
        m = 464
        n = 171
      }

      //Baseline annual curve
      temp = -9 * Math.cos(2 * Math.PI * t2[j]/31557600) + 12

      //Medium/short-term variations
      temp += 5 * Math.sin(2 * Math.PI * t2[j]/(86400 * 60)) * Math.cos(2 * Math.PI * t2[j]/(86400 * 37)) * (1 - 0.2 * Math.cos(2 * Math.PI * (600-m)/1300) + 0.2 * Math.cos(2 * Math.PI * 130/1300))
      temp += -2.5 * Math.sin(2 * Math.PI * t2[j]/(86400 * 9.5))

      //Hourly adjustment
      temp += -2.5 * Math.cos(2 * Math.PI * t2[j]/86400) * (1 - 0.5 * Math.sin(2 * Math.PI * t2[j]/(86400 * 31))) * (1 - 0.2 * Math.cos(2 * Math.PI * t2[j]/31557600)) * (1 - 0.4 * Math.cos(2 * Math.PI * (600-m)/1300) + 0.4 * Math.cos(2 * Math.PI * 130/1300))
      
      //Spatial Adjustment
      temp += -6 * (0.3 + Math.cos(2 * Math.PI * n/1700)) * (Math.cos(2 * Math.PI * m/2500)) + 6 * (0.3 + Math.cos(2 * Math.PI * 170/1700)) * (Math.cos(2 * Math.PI * 470/2500));

      //Rounding
      temp = Math.round(temp*10)/10

      temps.push(temp)
      }

      //console.log(temps)

      Maxtemp = Math.max(...temps)
      Maxtime = t3[temps.lastIndexOf(Maxtemp)]
      Mintemp = Math.min(...temps)
      Mintime = t3[temps.lastIndexOf(Mintemp)]

      if (temps[0] < -1) {nowresponse = "Wrap up extra warm, it's freezing!"}
      else if (temps[0] < 7) {nowresponse = "Put on an extra layer - it's cold out there!"}
      else if (temps[0] < 16) {nowresponse = "Nice and mild today, go out and enjoy!"}
      else if (temps[0] < 24) {nowresponse = "Looks like shorts and t-shirt weather!"}
      else {nowresponse = "Phew, it's hot out there - don't forget to stay hydrated!"}

      if (Maxtemp < 2) {Maxresponse = "It's going to be freezing all day!"}
      else if (Maxtemp < 11) {Maxresponse = "I'm afraid it isn't going to get warm today!"}
      else if (Maxtemp < 20) {Maxresponse = "Lovely and pleasant temperatures, not too warm!"}
      else if (Maxtemp < 27) {Maxresponse = "It's a lovely day, go and enjoy it!"}
      else {Maxresponse = "Wow it is going to be a hot one - don't forget that sun cream!"}

      if (Mintemp < -4) {Minresponse = "It's going to get very cold tonight - put an extra blanket on!"}
      else if (Mintemp < 3) {Minresponse = "Stay warm inside tonight!"}
      else if (Mintemp < 12) {Minresponse = "It's going to be a cool night!"}
      else if (Mintemp < 22) {Minresponse = "It is going to be warm tonight - throw off that blanket!"}
      else {Minresponse = "You're going to have trouble sleeping tonight - these temperatures aren't quitting!"}


      reply = `The current temperature in ${place} is ${temps[0]}°C. ${nowresponse} At ${Maxtime}:00 the temperature will rise to a high of ${Maxtemp}°C. ${Maxresponse} At ${Mintime}:00 the temperature will fall to a low of ${Mintemp}°C. ${Minresponse}`;

      console.log(reply)
      return reply
    },

    Xeather : function (channel, tim) {
      if (tim == 0) {var t1 = new Date()}
      else {var t1 = new Date(tim)}
      console.log(t1)
      var time = (t1 - 1642651200000)/1000;

      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')

      const width = 600
      const height = 600
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./images/1.png').then(image => {
        context.drawImage(image, 0, 0, 600, 600)
        for (let m = 0; m < 600; m++) {
          for (let n = 0; n < 600; n++) {
            temp = -9 * Math.cos(2 * Math.PI * time/31557600) + 12
            temp += 5 * Math.sin(2 * Math.PI * time/(86400 * 60)) * Math.cos(2 * Math.PI * time/(86400 * 37)) * (1 - 0.2 * Math.cos(2 * Math.PI * (600-m)/1300) + 0.2 * Math.cos(2 * Math.PI * 130/1300))
            temp += -2.5 * Math.sin(2 * Math.PI * time/(86400 * 9.5))
            temp += -2.5 * Math.cos(2 * Math.PI * time/86400) * (1 - 0.5 * Math.sin(2 * Math.PI * time/(86400 * 31))) * (1 - 0.2 * Math.cos(2 * Math.PI * time/31557600)) * (1 - 0.4 * Math.cos(2 * Math.PI * (600-m)/1300) + 0.4 * Math.cos(2 * Math.PI * 130/1300))
            temp += -6 * (0.3 + Math.cos(2 * Math.PI * n/1700)) * (Math.cos(2 * Math.PI * m/2500)) + 6 * (0.3 + Math.cos(2 * Math.PI * 170/1700)) * (Math.cos(2 * Math.PI * 470/2500));
            if (n == 170 && m == 470) {console.log(temp)}

            if (temp > 50) {
              r = 0;
              g = 0;
              b = 0;
            }

            else if (temp > 30) {
              r = Math.floor(255/15 * (50 - temp));
              g = 0;
              b = 0;
            }

            else if (temp > 10) {
              r = Math.floor(255/20 * (temp - 10));
              g = Math.floor(255/20 * (30 - temp));
              b = 0;
            }

            else if (temp > -5) {
              r = 0;
              g = Math.floor(255/15 * (temp + 5));
              b = Math.floor(255/15 * (10 - temp));
            }

            else if (temp > -25) {
              r = 0;
              g = 0;
              b = Math.floor(255/20 * (temp + 25));
            }

            else {
              r = 0;
              g = 0;
              b = 0;
            }

            context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
            context.fillRect(1*m, 1*n, 1, 1);

            if (m == 312 && n == 223) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",280,240);
            }
            if (m == 139 && n == 70) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",110,97);
            }
            if (m == 464 && n == 171) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",434,196);
            }
            if (m == 212 && n == 314) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",183,339);
            }
            if (m == 430 && n == 456) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",403,443);
            }
          }
        }
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(`Mercusa Temperature Map, ${t1.toLocaleString()} [V3.0]`,50,590);
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./images/maptest.png', buffer)
      })

      
      channel.send({files: ["./images/maptest.png"]});
    },

    ZeatherCore : function (m, n, time, time2) {
      pre = 0.7 * Math.cos(2 * Math.PI * time/31557600) + 0.3
      pre += -0.3 * Math.sin(2 * Math.PI * time2/(86400 * 60)) * Math.cos(2 * Math.PI * time2/(86400 * 37))
      pre += 0.4 * Math.sin(2 * Math.PI * time2/(86400 * 9.5))
      pre += 0.5 * Math.cos(2 * Math.PI * (time/(86400 * 4) + m/6400))
      pre += 0.2 * Math.cos(2 * Math.PI * (time/43200 + (m+100)/300)) - m/3000
      pre += 0.2 * Math.cos(2 * Math.PI * (time/86400 + (n+50)/300)) - n/3000
      pre += 0.09 * Math.cos(2 * Math.PI * (time/86400 + m*n/40000))
      pre += 0.06 * Math.sin(2 * Math.PI * (time/(86400 * 2) + (m-250)*(n-200)/25000))
      pre += 0.02 * Math.sin(2 * Math.PI * (time/43200 + (m-450)*(n-550)/20000))
      pre += 0.5 * Math.sin(2 * Math.PI * (time/(86400 * 3) + (m-100)/1000 + (n-50)/1000))
      temp = -9 * Math.cos(2 * Math.PI * time2/31557600) + 12
      temp += 5 * Math.sin(2 * Math.PI * time2/(86400 * 60)) * Math.cos(2 * Math.PI * time2/(86400 * 37)) * (1 - 0.2 * Math.cos(2 * Math.PI * (600-m)/1300) + 0.2 * Math.cos(2 * Math.PI * 130/1300))
      temp += -2.5 * Math.sin(2 * Math.PI * time2/(86400 * 9.5))
      temp += -2.5 * Math.cos(2 * Math.PI * time2/86400) * (1 - 0.5 * Math.sin(2 * Math.PI * time2/(86400 * 31))) * (1 - 0.2 * Math.cos(2 * Math.PI * time2/31557600)) * (1 - 0.4 * Math.cos(2 * Math.PI * (600-m)/1300) + 0.4 * Math.cos(2 * Math.PI * 130/1300))
      temp += -6 * (0.3 + Math.cos(2 * Math.PI * n/1700)) * (Math.cos(2 * Math.PI * m/2500)) + 6 * (0.3 + Math.cos(2 * Math.PI * 170/1700)) * (Math.cos(2 * Math.PI * 470/2500));
      
      if (n == 470 && m == 470) {console.log(pre)}

      if (pre < 0) {
        r = 0;
        g = 0;
        b = 0;
        a = 0;
      }

      else if (pre < 1) {
        a = 0.4 * pre + 0.4;
        r = 255;
        g = 255;
        b = 255;
      }

      else {
        a = 0.8;
        if (temp < 0) {
          if (pre < 2) {
            r = 255;
            g = Math.floor(155 - (pre - 1) * 155);
            b = 255;
          }

          else if (pre < 3) {
            r = 255;
            g = 0;
            b = Math.floor(200 - (pre - 2) * 100);
          }

          else {
            r = 255;
            g = 0;
            b = 100;
          }
        }

        else if (temp > 1) {
          if (pre < 1.75) {
            r = Math.floor(160 - (pre - 1) * (160/0.75));
            g = Math.floor(230 - (pre - 1) * (50/0.75));
            b = 255;
          }

          else if (pre < 2.25) {
            r = 0;
            g = Math.floor(180 + (pre - 1.75) * (70/0.5));
            b = Math.floor(180 - (pre - 1.75) * (180/0.5));
          }

          else if (pre < 3) {
            r = Math.floor(100 + (pre - 2.25) * (155/0.75));
            g = 255;
            b = 0;
          }

          else {
            r = 255;
            g = 150;
            b = 0;
          }
        }

        else {
          if (pre < 1.75) {
            r = Math.floor((160 - (pre - 1) * (160/0.75))*temp + 255*(1-temp));
            g = Math.floor((230 - (pre - 1) * (50/0.75))*temp + (155 - (pre - 1) * 155)*(1-temp));
            b = 255;
          }

          else if (pre < 2) {
            r = Math.floor(255*(1-temp));
            g = Math.floor((180 + (pre - 1.75) * (70/0.5))*temp + (155 - (pre - 1) * 155)*(1-temp));
            b = Math.floor((180 - (pre - 1.75) * (180/0.5))*temp + 255*(1-temp));
          }

          else if (pre < 2.25) {
            r = Math.floor(255*(1-temp));
            g = Math.floor((180 + (pre - 1.75) * (70/0.5))*temp);
            b = Math.floor((180 - (pre - 1.75) * (180/0.5))*temp + (200 - (pre - 2) * 100)*(1-temp));
          }

          else if (pre < 3) {
            r = Math.floor((100 + (pre - 2.25) * (155/0.75))*temp + 255*(1-temp));
            g = Math.floor(255*temp);
            b = Math.floor((200 - (pre - 2) * 100)*(1-temp));
          }

          else {
            r = 255;
            g = Math.floor(150*temp);
            b = Math.floor(100*(1-temp));
          }
        }
      }
      return [a,r,g,b,temp]
    },

    Zeather : function (channel, tim) {
      if (tim == 0) {var t1 = new Date()}
      else {var t1 = new Date(tim)}
      console.log(t1)
      var time = (t1 - 1639526400000)/1000;
      var time2 = (t1 - 1642651200000)/1000;

      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')

      const width = 600
      const height = 600
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./images/1.png').then(image => {
        context.drawImage(image, 0, 0, 600, 600)
        for (let m = 0; m < 600; m++) {
          for (let n = 0; n < 600; n++) {
            [a,r,g,b,temp] = this.ZeatherCore(m,n,time,time2)
            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            context.fillRect(1*m, 1*n, 1, 1);
          }
        }
        context.font = "20px Arial";
        context.fillStyle = "black";
        context.fillText(`Mercusa Precipitation Map, ${t1.toLocaleString()} [V2.0]`,50,590);
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./images/maptest2.png', buffer)
      })

      channel.send({files: ["./images/maptest2.png"]});
    },
    
    FeatherBackground : function (context,loadImage) {
      loadImage('./images/1.png').then(image => {
      context.drawImage(image, 0, 0, 600, 600)})
    },

    createGif : function () {
      const GIFEncoder = require('gif-encoder-2')
      const { createCanvas, Image } = require('canvas')
      const { createWriteStream, readdir } = require('fs')
      const { promisify } = require('util')
      const path = require('path')
       
      const readdirAsync = promisify(readdir)
      const imagesFolder = path.join('./images/gif/')

      return new Promise(async resolve1 => {
        // read image directory
        const files = await readdirAsync(imagesFolder)
        //console.log(files)
     
        // find the width and height of the image
        const [width, height] = await new Promise(resolve2 => {
          const image = new Image()
          image.onload = () => resolve2([image.width, image.height])
          image.src = path.join(imagesFolder, files[0])
        })
     
        const dstPath = path.join('./images/',`intermediate.gif`)
        const writeStream = createWriteStream(dstPath)
        // when stream closes GIF is created so resolve promise
        writeStream.on('close', () => {
          resolve1()
        })
     
        const encoder = new GIFEncoder(width, height)
        // pipe encoder's read stream to our write stream
        encoder.createReadStream().pipe(writeStream)
        encoder.start()
        encoder.setDelay(250)
     
        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')
     
        // draw an image for each file and add frame to encoder
        for (const file of files) {
          await new Promise(resolve3 => {
            const image = new Image()
            image.onload = () => {
              ctx.drawImage(image, 0, 0)
              encoder.addFrame(ctx)
              resolve3()
            }
            image.src = path.join(imagesFolder, file)
          })
        }
        encoder.finish()
      })
    },

    Feather : async function (channel, tim) {
      if (tim == 0) {var t1 = new Date()}
      else {var t1 = new Date(tim)}
      console.log(t1)
      time = (t1 - 1639526400000)/1000;
      time2 = (t1 - 1642651200000)/1000;
      alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

      const fs = require('fs')
      const { createCanvas, loadImage, Image } = require('canvas')
      //const GIFEncoder = require('gif-encoder-2')

      const width = 600
      const height = 600
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      //var encoder = new GIFEncoder(width,height,'neuquant');
      //encoder.setDelay(500);
      //encoder.start(); // starts the encoder

      for (let t = 0; t < 25; t++) {        
        loadImage('./images/1.png').then(image => {
          context.drawImage(image, 0, 0, 600, 600)    
            for (let m = 0; m < 600; m++) {
              for (let n = 0; n < 600; n++) {
                [a,r,g,b,temp] = this.ZeatherCore(m,n,time,time2)
                context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
                context.fillRect(1*m, 1*n, 1, 1);
                if (m == 312 && n == 223) {
                  context.font = "20px Arial";
                  context.fillStyle = "white";
                  context.fillText(Math.round(temp)+"°",280,240);
                }
                if (m == 139 && n == 70) {
                  context.font = "20px Arial";
                  context.fillStyle = "white";
                  context.fillText(Math.round(temp)+"°",110,97);
                }
                if (m == 464 && n == 171) {
                  context.font = "20px Arial";
                  context.fillStyle = "white";
                  context.fillText(Math.round(temp)+"°",434,196);
                }
                if (m == 212 && n == 314) {
                  context.font = "20px Arial";
                  context.fillStyle = "white";
                  context.fillText(Math.round(temp)+"°",183,339);
                }
                if (m == 430 && n == 456) {
                  context.font = "20px Arial";
                  context.fillStyle = "white";
                  context.fillText(Math.round(temp)+"°",403,443);
                }
              }
            }
            context.font = "20px Arial";
            context.fillStyle = "black";
            context.fillText(`Mercusa Precipitation Animation, ${t1.toLocaleString()} [V2.0]`,30,590);
            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync(`./images/gif/${alphabet[t]}.png`, buffer)

        time += 3600;
        time2 += 3600;
        t1 = Number(t1) + 3600000;
        t1 = new Date(t1);
        })
      }
      //encoder.finish();
      //const buffer = encoder.out.getData();
      //const buffer = this.Featherencode(width,height,time,time2,t1)

      //fs.writeFileSync('./images/maptest3.gif', buffer, error => {console.log('error')})
      await this.createGif()
      channel.send({files: ["./images/intermediate.gif"]});
    },

    ASC2 : function (channel, data) {
      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')
      vec = data;
      (score = []).length = vec.length; score.fill(0);
      fs.writeFileSync('./vec.txt', vec);
      fs.writeFileSync('./score.txt', score);

      const width = 627
      const height = 547
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./images/song.png').then(image => {
        context.drawImage(image, 0, 0, 627, 547)

        
        context.font = "bold 24px Courier New";
        context.fillStyle = "black";
        for (let i = 1; i < vec.length; i++) {
          if (i%2 == 1) {
            context.fillText(vec[i].toUpperCase(),45,80+20*i);
          }
          else {
            context.fillText(vec[i].toUpperCase(),356,60+20*i);
          }
        }

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./images/song1.png', buffer)


        loadImage('./images/song1.png').then(image => {
          context.drawImage(image, 0, 0, 627, 547)
  
          
          context.font = "bold 24px Courier New";
          context.fillStyle = "yellow";
          for (let i = 1; i < score.length; i++) {
            if (i%2 == 1) {
              context.fillText(score[i],215,80+20*i);
            }
            else {
              context.fillText(score[i],525,60+20*i);
            }
          }
  
          const buffer = canvas.toBuffer('image/png')
          fs.writeFileSync('./images/song2.png', buffer)
        })
      })

      channel.send({files: ["./images/song2.png"]});
    },

    ASC3 : function (channel, country, points) {
      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')
      var vec = fs.readFileSync('./vec.txt').toString('utf-8').split(',');
      var score = fs.readFileSync('./score.txt').toString('utf-8').split(',');
      ind = vec.indexOf(country);
      if (ind == -1){
        channel.send(`${country} is not in this contest!`)
      }
      else {
        score[ind] = Number(score[ind]) + Number(points);
      }
      fs.writeFileSync('./score.txt', score);

      const width = 627
      const height = 547
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./Images/song1.png').then(image => {
        context.drawImage(image, 0, 0, 627, 547)

        
        context.font = "bold 24px Courier New";
        context.fillStyle = "yellow";
        for (let i = 1; i < score.length; i++) {
          if (i%2 == 1) {
            context.fillText(score[i],215,80+20*i);
          }
          else {
            context.fillText(score[i],525,60+20*i);
          }
        }

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./images/song2.png', buffer)
      })

      channel.send({files: ["./images/song2.png"]});
    }
}