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

        // Train the Markov Chain
        markov.train(4);

        // Generate an output
        tweet = "ExpressBot: " + markov.generateRandom(200);

        console.log(tweet)
        return tweet
    },
    
    
      MarkovAdd : function (item) {
        fs.appendFile('./express.txt', `${item}\n`, function (err) {
                if (err) {
                  console.log('failed')
                } else {
                  console.log(item)
                }
              })
    
        return 'Breaking news‼ ' + item
      }
}