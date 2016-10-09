;(function() {
  console.log('CONTENT SCRIPT WORKS!');
  var $ = require('./libs/jquery');
  // here we use SHARED message handlers, so all the contexts support the same
  // commands. but this is NOT typical messaging system usage, since you usually
  // want each context to handle different commands. for this you don't need
  // handlers factory as used below. simply create individual `handlers` object
  // for each context and pass it to msg.init() call. in case you don't need the
  // context to support any commands, but want the context to cooperate with the
  // rest of the extension via messaging system (you want to know when new
  // instance of given context is created / destroyed, or you want to be able to
  // issue command requests from this context), you may simply omit the
  // `handlers` parameter for good when invoking msg.init()
  var handlers = require('./modules/handlers').create('ct');
  //require('./modules/msg').init('ct', handlers);
  console.log('jQuery version:', $().jquery);
})();


const listOfRegex = [
	/you won['’]?t believe/i,
	/what happens next/i,
	/A Woman Had A/i,
	/^\d+ (\w+ )?(animals|pictures|lessons|movies|secrets|shows|stories|things|times|trailers|tumblr|tweets)/i,
	/^\d+ of the \w+est/i,
	/^can you/i,
	/^here['’]s (how|what)/i,
	/^this could/i,
	/all (he|she|they) did was/i,
	/all the best/i,
	/best comeback/i,
	/can['’]t handle/i,
	/can teach us about/i,
	/didn['’]t know what/i,
	/get rid of/i,
	/how one (man|woman)/i,
	/how \w+ are you/i,
	/may affect/i,
	/never realized/i,
	/(pictures|photos) of/i,
	/secret of/i,
	/signs you['’]?re/i,
	/somebody needs to/i,
	/things that will/i,
	/trump/i,
	/until you see/i,
	/you (need to|should) (know|watch)/i,
	/we bet you can/i,
	/we can (tell|guess) (what )?your/i,
	/we need to talk about/i,
	/what could possibly/i,
	/what happens/i,
	/what (he|she|they) found/i,
	/what I learned about/i,
	/what this/i,
	/what to expect/i,
	/when (he|she|they)/i,
	/when this (man|woman|baby|child|puppy|dog|kitten)/i,
	/when you read these/i,
	/who['’]d thougt/i,
	/why we really shouldn['’]?t/i,
	/with this one/i,
	/will never tell/i,
	/won['’]?t believe/i,
	/\s(celebrit|epic|fantastic|genius|heartbreaking|incredibl|powerful|shocking|teen|terribl|unusual|weirdly)/i 
];

function initObserver() {
	const observer = new MutationObserver( function(mutations) {

		mutations.forEach( function (mut) {
			mut.addedNodes.forEach( function (node) {
				if (node.nodeType === Node.ELEMENT_NODE){
					recurseClickbaitLinks(node);
				}

			});
		});
	});
	observer.observe( document.body, { childList: true, subtree: true } );
}

function checkIfClickbait(title)
{
	len = title.length
	//check if title is long/short enough to be clickbait
	if (len >= 100 || len < 16) return false;

	return listOfRegex.some(function(clickbait, thisObj)
	{
		//Error Handling
		if (typeof clickbait != "function") throw new TypeError();

		if (clickbait.test(title))
		{
			console.log(thisObj, title);
			return true;
		}
	});
}


function changeClickbait(item)
{
	if(checkIfClickbait(item.textContent) == 1){
		item.style.textDecoration = 'line-through';

		// attempted to change the link to which clickbait leads to.
		item.setAttribute('href', 'about:blank'); //currently not working for facebook.
		item.removeAttribute('onclick')
		item.removeAttribute('onmouseover')
	}
}

function recurseClickbaitLinks(element) {

	// Check all links for Clickbait titles
	items = element.getElementsByTagName('a');
	//use spread operator and pass each of the items through clickbait checker
	[...items].forEach(changeClickbait);
}


//Call methods to update page
recurseClickbaitLinks(document.body);
initObserver();
