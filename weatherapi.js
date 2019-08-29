// -------------- Challenge 4: System to system connection (eg: to weather API) ------------------- // 
/**
 * step #1 : npm install request
 * 
 */

controller.hears(['weather'], 'direct_message,direct_mention,mention', 
function (bot,message) {
    bot.startConversation(message, function (err, convo) {

        convo.addQuestion('Where are you at?', function (response, convo) {
            convo.next();
            convo.say('You response is ' + response.text);
            request('http://api.openweathermap.org/data/2.5/weather?q=' + response.text + '&appid=beee38160ef0482e44ed50708ef698e5', function (error, response, body) {
                var jsonBody = JSON.parse(body)
                var deg = jsonBody["main"]["temp"] - 273.15
                convo.say("The weather is " + jsonBody.weather[0].main + " and the temperature is " + Math.round(deg,2) + "\xB0C")                
                convo.next();
            });
        },{},'default');

    });
});
