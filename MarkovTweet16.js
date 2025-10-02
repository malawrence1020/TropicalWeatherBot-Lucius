var fs = require('fs');
const Markov = require('js-markov');

module.exports = {
    MarkovExp : function () {
        var text = fs.readFileSync('./express.txt').toString('utf-8')
        var textByLine = text.split('\n')
        // Create a new Markov Chain
        // By default, its type is text
        var markov = new Markov();

        // Quality Daily Express 'Headlines'
        markov.addStates(textByLine);

        // Train the Markov Chain: ~100 headlines required for markov.train(5)?
        l = Math.round(4 + textByLine.length*Math.random()/100)
        markov.train(l);

        // Generate an output
        do {
          tweet = "ExpressBot: " + markov.generateRandom(200)
          console.log(tweet)
        }
        while (tweet.length > 140);

        return tweet
    },
    
    
      MarkovAdd : function (item) {
        fs.appendFile('./express.txt', `\n${item}`, function (err) {
                if (err) {
                  console.log('failed')
                } else {
                  console.log(item)
                }
              })
    
        return 'Breaking news‼ ' + item
      }
}