var Botkit = require('botkit')
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}
var controller = Botkit.slackbot({
    debug: false
});
controller.spawn({
    token: process.env.token
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});

controller.hears(['hi', 'hello', 'howdy'], 'direct_message,direct_mention,mention',
function(bot, message) {
bot.reply(message, 'Hello there! :wave:');
});

controller.hears(['trip'], 'direct_message,direct_mention,mention',
function(bot,message){
    bot.startConversation(message,function(err,convo){

        var place = ''
        var days = 0
        var persons = 0
        convo.addQuestion('Where do you want to go?', function(response,convo) {
            place = response.text
            bot.reply(message,place + ' is a nice place')
            convo.next();
        },{},'default');

        convo.addQuestion('How long it will be', function(response, convo) {
            days = response.text
            convo.next();
        },{},'default');

        convo.addQuestion('How many persons is there?', function(response, convo) {
            var randomPPP = 100+Math.floor((Math.random() * 500))
            persons = response.text
            var finalPrice = randomPPP+persons+days
            convo.say('You want to go to ' + place + ' for ' + persons + ' persons for ' + days + ' days. Price per person is ' + randomPPP+ ' and The final price is  ' + finalPrice);
            convo.next();
        },{},'default');
    })
})
